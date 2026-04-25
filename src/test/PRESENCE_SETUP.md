# Presence system setup

## 1. Install Upstash Redis client
npm install @upstash/redis

## 2. Create a free Redis database
https://console.upstash.com → New Database → choose region closest to your Vercel deployment

## 3. Environment variables
Add to .env.local (and to Vercel project settings):

UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
 
Redis.fromEnv() in the route reads these automatically.

## 4. Optional: TTL-expired session pruning cron
The pruneExpiredSessions() function runs on every join, which handles
organic cleanup. If you want an additional sweep (e.g. after a server
restart where no one joins for a while), add a Vercel Cron:

# vercel.json
{
  "crons": [
    {
      "path": "/api/presence/cleanup",
      "schedule": "*/5 * * * *"
    }
  ]
}

The cleanup route just calls GET /api/presence (which triggers no cleanup
on its own) OR you create a dedicated route that calls pruneExpiredSessions()
and returns the clean count.

## 5. File placement
app/
  api/
    presence/
      route.ts          ← the API route
hooks/
  useReaderPresence.ts  ← the hook
components/
  ReaderPresenceBadge.tsx

## 6. Replace the fake counter in NewSheriaHero.tsx
Remove:
  const [visitorCount, setVisitorCount] = useState(347);
  useEffect(() => { /* random walk */ }, []);

Replace the badge div with:
  import { ReaderPresenceBadge } from "@/components/ReaderPresenceBadge";
  <ReaderPresenceBadge />

## Key constraints
- HEARTBEAT_MS (25s) must be less than SESSION_TTL (60s)
  → if heartbeat fires at 25s and TTL is 60s, a tab gets
    evicted only if 2+ consecutive heartbeats fail.
- POLL_MS (30s) controls how stale the displayed count can be.
  → lower = more Redis reads = more cost on free tier.
  → 30s is a good default; reduce to 10s for high-traffic articles.
