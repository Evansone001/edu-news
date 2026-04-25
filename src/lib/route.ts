/**
 * /api/presence
 *
 * Data model in Redis:
 *   presence:sessions        → Redis Set of active sessionIds
 *   presence:session:{id}    → String key with TTL=60s
 *
 * The Set is the source of truth for the live count (SCARD).
 * The per-session key is the TTL sentinel — when a reader disappears
 * without calling leave (crash, kill, no network), the key expires
 * and a cleanup cron (or the next join) prunes the Set.
 *
 * Actions:
 *   POST { action: "join",      sessionId }  → SADD + SETEX 60s
 *   POST { action: "heartbeat", sessionId }  → EXPIRE 60s
 *   POST { action: "leave",     sessionId }  → SREM + DEL
 *   GET                                      → SCARD (current count)
 */

import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

const SESSIONS_KEY = "presence:sessions";
const SESSION_TTL  = 60; // seconds — must be > heartbeat interval (25s)

// ── Helpers ────────────────────────────────────────────────────────────────

function sessionKey(id: string) {
  return `presence:session:${id}`;
}

/**
 * Prune sessions whose TTL key has already expired from the Set.
 * Called opportunistically on join to avoid unbounded Set growth
 * when readers disappear without calling leave.
 *
 * Algorithm:
 *   1. SMEMBERS to get all ids          O(N)
 *   2. Pipeline EXISTS for each         O(N) pipelined
 *   3. SREM dead ids in one call        O(K) where K = stale count
 *
 * This is a best-effort cleanup, not a hard guarantee. The count
 * may lag by at most one join cycle (next visitor triggers the prune).
 */
async function pruneExpiredSessions() {
  const members = await redis.smembers(SESSIONS_KEY) as string[];
  if (members.length === 0) return;

  // Batch-check which session keys still exist
  const pipeline = redis.pipeline();
  for (const id of members) pipeline.exists(sessionKey(id));
  const results = await pipeline.exec() as number[];

  const dead = members.filter((_, i) => results[i] === 0);
  if (dead.length > 0) {
    await redis.srem(SESSIONS_KEY, ...dead);
  }
}

// ── GET — return current live count ────────────────────────────────────────

export async function GET() {
  try {
    const count = await redis.scard(SESSIONS_KEY);
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[presence GET]", err);
    // Fail open: return null so the UI can hide the indicator rather than
    // show a stale/wrong number.
    return NextResponse.json({ count: null }, { status: 500 });
  }
}

// ── POST — join | heartbeat | leave ────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: { action: string; sessionId: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { action, sessionId } = body;

  // Guard: sessionId must be a non-empty string ≤ 128 chars (UUID is 36)
  if (
    typeof sessionId !== "string" ||
    sessionId.length === 0 ||
    sessionId.length > 128
  ) {
    return NextResponse.json({ error: "Invalid sessionId" }, { status: 400 });
  }

  try {
    switch (action) {
      case "join": {
        // Prune stale sessions before adding — keeps Set lean
        await pruneExpiredSessions();

        const pipeline = redis.pipeline();
        pipeline.sadd(SESSIONS_KEY, sessionId);
        pipeline.setex(sessionKey(sessionId), SESSION_TTL, "1");
        await pipeline.exec();

        const count = await redis.scard(SESSIONS_KEY);
        return NextResponse.json({ count });
      }

      case "heartbeat": {
        // Only refresh TTL if the session is still registered.
        // If the key is missing (evicted), re-register it rather than
        // silently dropping the heartbeat — the reader is still here.
        const pipeline = redis.pipeline();
        pipeline.sadd(SESSIONS_KEY, sessionId);        // no-op if already present
        pipeline.setex(sessionKey(sessionId), SESSION_TTL, "1");
        await pipeline.exec();

        return NextResponse.json({ ok: true });
      }

      case "leave": {
        const pipeline = redis.pipeline();
        pipeline.srem(SESSIONS_KEY, sessionId);
        pipeline.del(sessionKey(sessionId));
        await pipeline.exec();

        const count = await redis.scard(SESSIONS_KEY);
        return NextResponse.json({ count });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[presence POST]", action, err);
    return NextResponse.json({ error: "Redis error" }, { status: 500 });
  }
}
