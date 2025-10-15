/**
 * Performance monitoring utilities
 */

export class PerformanceMonitor {
	private static instance: PerformanceMonitor;
	private metrics: Map<string, number[]> = new Map();

	private constructor() {}

	static getInstance(): PerformanceMonitor {
		if (!PerformanceMonitor.instance) {
			PerformanceMonitor.instance = new PerformanceMonitor();
		}
		return PerformanceMonitor.instance;
	}

	startTimer(label: string): () => void {
		const start = performance.now();
		return () => {
			const duration = performance.now() - start;
			this.recordMetric(label, duration);
		};
	}

	recordMetric(label: string, value: number): void {
		if (!this.metrics.has(label)) {
			this.metrics.set(label, []);
		}
		this.metrics.get(label)!.push(value);

		// Keep only last 100 measurements
		const values = this.metrics.get(label)!;
		if (values.length > 100) {
			values.shift();
		}
	}

	getMetrics(label: string): {
		count: number;
		avg: number;
		min: number;
		max: number;
		p95: number;
	} | null {
		const values = this.metrics.get(label);
		if (!values || values.length === 0) return null;

		const sorted = [...values].sort((a, b) => a - b);
		const sum = sorted.reduce((a, b) => a + b, 0);

		return {
			count: sorted.length,
			avg: sum / sorted.length,
			min: sorted[0],
			max: sorted[sorted.length - 1],
			p95: sorted[Math.floor(sorted.length * 0.95)]
		};
	}

	getAllMetrics(): Record<string, ReturnType<typeof this.getMetrics>> {
		const result: Record<string, ReturnType<typeof this.getMetrics>> = {};
		for (const [label] of this.metrics) {
			result[label] = this.getMetrics(label);
		}
		return result;
	}

	clear(): void {
		this.metrics.clear();
	}
}

export const perfMonitor = PerformanceMonitor.getInstance();

// Web Vitals tracking
export function trackWebVitals() {
	if (typeof window === 'undefined') return;

	// Track Core Web Vitals
	if ('PerformanceObserver' in window) {
		// Largest Contentful Paint (LCP)
		const lcpObserver = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1];
			perfMonitor.recordMetric('LCP', lastEntry.startTime);
		});
		lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

		// First Input Delay (FID)
		const fidObserver = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry: any) => {
				perfMonitor.recordMetric('FID', entry.processingStart - entry.startTime);
			});
		});
		fidObserver.observe({ entryTypes: ['first-input'] });

		// Cumulative Layout Shift (CLS)
		let clsValue = 0;
		const clsObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (!(entry as any).hadRecentInput) {
					clsValue += (entry as any).value;
					perfMonitor.recordMetric('CLS', clsValue);
				}
			}
		});
		clsObserver.observe({ entryTypes: ['layout-shift'] });
	}

	// Track page load time
	window.addEventListener('load', () => {
		const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
		if (perfData) {
			perfMonitor.recordMetric('PageLoad', perfData.loadEventEnd - perfData.fetchStart);
			perfMonitor.recordMetric('DOMContentLoaded', perfData.domContentLoadedEventEnd - perfData.fetchStart);
			perfMonitor.recordMetric('TimeToInteractive', perfData.domInteractive - perfData.fetchStart);
		}
	});
}

// Log performance metrics to console in development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
	setInterval(() => {
		const metrics = perfMonitor.getAllMetrics();
		if (Object.keys(metrics).length > 0) {
			console.table(metrics);
		}
	}, 30000); // Every 30 seconds
}

