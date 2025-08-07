import { LRUCache } from 'lru-cache';

export type RateLimitOptions = {
  interval: number;
  uniqueTokenPerInterval?: number;
};

export function rateLimit(options: RateLimitOptions) {
  const cache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval,
  });

  return {
    check: async (token: string, limit: number) => {
      const tokenCount = cache.get(token) || [];
      const now = Date.now();
      const validTimestamps = tokenCount.filter(
        (timestamp) => now - timestamp < options.interval
      );

      if (validTimestamps.length >= limit) {
        return { success: false };
      }

      validTimestamps.push(now);
      cache.set(token, validTimestamps);
      return { success: true };
    },
  };
}