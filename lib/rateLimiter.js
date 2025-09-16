// Simple in-memory token bucket per IP/path.
// Not distributed; suitable for single-container deployment.
const buckets = new Map();

export function rateLimit({ key, limit = 10, windowMs = 60_000 }) {
  const now = Date.now();
  let entry = buckets.get(key);
  if (!entry) {
    entry = { count: 1, expires: now + windowMs };
    buckets.set(key, entry);
    return { allowed: true, remaining: limit - 1, reset: entry.expires };
  }
  if (now > entry.expires) {
    entry.count = 1;
    entry.expires = now + windowMs;
    return { allowed: true, remaining: limit - 1, reset: entry.expires };
  }
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, reset: entry.expires };
  }
  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, reset: entry.expires };
}

export function cleanupBuckets() {
  const now = Date.now();
  for (const [k, v] of buckets.entries()) {
    if (now > v.expires) buckets.delete(k);
  }
}

setInterval(cleanupBuckets, 60_000).unref();