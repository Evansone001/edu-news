/**
 * useReaderPresence
 * 
 * Lifecycle:
 *   mount   → POST join  (registers this tab, gets current count)
 *   active  → POST heartbeat every HEARTBEAT_MS (keeps TTL alive)
 *   active  → GET  count  every POLL_MS         (refreshes display)
 *   unmount → POST leave via sendBeacon          (immediate deregister)
 *   crash   → TTL on server evicts session after 60s (no cleanup path needed)
 *
 * Edge cases handled:
 *   - Tab hidden: Page Visibility API pauses heartbeat to avoid ghost sessions
 *     accumulating from minimised tabs. Resumes + re-joins on visibility restore.
 *   - Network error on join: retries after RETRY_DELAY_MS, count stays null (hidden).
 *   - sendBeacon unavailable (old browser): falls back to sync XHR on unload.
 *   - SSR / no window: hook is a no-op until mount (useEffect guard).
 *   - Multiple tabs same browser: each gets its own sessionId → each counted.
 *     This is correct behaviour (the user has N active reading contexts).
 */

import { useCallback, useEffect, useRef, useState } from "react";

const HEARTBEAT_MS  = 25_000;  // must be < SERVER TTL (60s)
const POLL_MS       = 30_000;  // how often to refresh the display count
const RETRY_DELAY_MS = 5_000;  // delay before retrying a failed join

// ── Session ID ──────────────────────────────────────────────────────────────
// Per-tab: sessionStorage survives page reload but not tab close.
// This means a hard reload re-registers rather than reusing the same id,
// which is fine — the old id TTL-evicts within 60s.

function getOrCreateSessionId(): string {
  const KEY = "presence_session_id";
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

// ── Beacon leave ────────────────────────────────────────────────────────────
// sendBeacon is fire-and-forget. The browser queues it even mid-navigation
// and sends it asynchronously — this is the only reliable way to fire a
// request when the page is being torn down.

function sendLeave(sessionId: string) {
  const body = JSON.stringify({ action: "leave", sessionId });
  const url  = "/api/presence";

  if (navigator.sendBeacon) {
    // sendBeacon requires a Blob with Content-Type for JSON
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
  } else {
    // Fallback: synchronous XHR — blocks page unload briefly but ensures delivery
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, false); // false = synchronous
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(body);
  }
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useReaderPresence(): number | null {
  const [count, setCount] = useState<number | null>(null);
  const sessionIdRef      = useRef<string | null>(null);
  const heartbeatRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef        = useRef(false);

  // POST helper — returns parsed JSON or throws
  const post = useCallback(async (action: string) => {
    const res = await fetch("/api/presence", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ action, sessionId: sessionIdRef.current }),
    });
    if (!res.ok) throw new Error(`presence ${action} → ${res.status}`);
    return res.json() as Promise<{ count?: number; ok?: boolean }>;
  }, []);

  // GET count — silently ignored if unmounted
  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/presence");
      if (!res.ok) return;
      const { count: c } = await res.json();
      if (mountedRef.current && typeof c === "number") setCount(c);
    } catch {
      // Network blip — keep showing last known count
    }
  }, []);

  // Heartbeat POST — re-registers if somehow evicted
  const heartbeat = useCallback(async () => {
    try {
      await post("heartbeat");
    } catch {
      // If heartbeat fails, the TTL will evict us within 60s.
      // We don't retry here — the next heartbeat tick will try again.
    }
  }, [post]);

  // Join and start intervals
  const join = useCallback(async () => {
    try {
      const data = await post("join");
      if (mountedRef.current && typeof data.count === "number") {
        setCount(data.count);
      }

      // Start heartbeat
      heartbeatRef.current = setInterval(heartbeat, HEARTBEAT_MS);

      // Start count poll (offset from heartbeat so they don't fire simultaneously)
      setTimeout(() => {
        if (!mountedRef.current) return;
        pollRef.current = setInterval(fetchCount, POLL_MS);
      }, 5_000);
    } catch {
      // Join failed (network down, Redis unavailable).
      // Retry once after delay — don't retry in a tight loop.
      setTimeout(() => {
        if (mountedRef.current) join();
      }, RETRY_DELAY_MS);
    }
  }, [post, heartbeat, fetchCount]);

  useEffect(() => {
    mountedRef.current   = true;
    sessionIdRef.current = getOrCreateSessionId();

    join();

    // ── Page Visibility API ───────────────────────────────────────────────
    // When the tab is hidden (minimised or covered), pause the heartbeat.
    // Without this, hidden tabs maintain ghost sessions indefinitely.
    // On visibility restore, immediately re-join to refresh presence.

    const onVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden — pause heartbeat, session will TTL-evict after 60s
        if (heartbeatRef.current) {
          clearInterval(heartbeatRef.current);
          heartbeatRef.current = null;
        }
      } else {
        // Tab visible again — re-join to re-register immediately
        if (!heartbeatRef.current) join();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    // ── Unload cleanup ────────────────────────────────────────────────────
    const onUnload = () => sendLeave(sessionIdRef.current!);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      mountedRef.current = false;

      if (heartbeatRef.current) clearInterval(heartbeatRef.current);
      if (pollRef.current)      clearInterval(pollRef.current);

      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("beforeunload", onUnload);

      // Cleanup on React unmount (SPA navigation)
      sendLeave(sessionIdRef.current!);
    };
  }, [join]);

  return count;
}
