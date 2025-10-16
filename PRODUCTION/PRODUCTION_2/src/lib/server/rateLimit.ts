/**
 * Rate limiting middleware
 */

interface RateLimitStore {
	[key: string]: {
		count: number;
		resetTime: number;
	};
}

const store: RateLimitStore = {};

export function rateLimit(
	identifier: string,
	maxRequests: number = 100,
	windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
	const now = Date.now();
	const key = identifier;

	// Clean up expired entries
	if (store[key] && store[key].resetTime < now) {
		delete store[key];
	}

	// Initialize or get current state
	if (!store[key]) {
		store[key] = {
			count: 0,
			resetTime: now + windowMs
		};
	}

	const current = store[key];
	current.count++;

	const allowed = current.count <= maxRequests;
	const remaining = Math.max(0, maxRequests - current.count);

	return {
		allowed,
		remaining,
		resetTime: current.resetTime
	};
}

export function getRateLimitHeaders(
	allowed: boolean,
	remaining: number,
	resetTime: number
): Record<string, string> {
	return {
		'X-RateLimit-Limit': '100',
		'X-RateLimit-Remaining': remaining.toString(),
		'X-RateLimit-Reset': new Date(resetTime).toISOString(),
		...(allowed ? {} : { 'Retry-After': Math.ceil((resetTime - Date.now()) / 1000).toString() })
	};
}

// Cleanup old entries every 5 minutes
setInterval(() => {
	const now = Date.now();
	Object.keys(store).forEach((key) => {
		if (store[key].resetTime < now) {
			delete store[key];
		}
	});
}, 5 * 60 * 1000);

