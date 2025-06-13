// utils/cache.ts
interface CacheEntry {
  videoUrl: string;
  createdAt: number;
}

const CACHE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in ms

const cache = new Map<string, CacheEntry>();

export function getCachedUrl(key: string): string | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.createdAt > CACHE_DURATION;
  return isExpired ? null : entry.videoUrl;
}

export function setCachedUrl(key: string, videoUrl: string) {
  cache.set(key, { videoUrl, createdAt: Date.now() });
}
