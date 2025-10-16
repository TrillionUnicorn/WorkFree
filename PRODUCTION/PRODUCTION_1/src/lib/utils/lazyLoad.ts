/**
 * Lazy loading utilities for performance optimization
 */

export function lazyLoadImage(node: HTMLImageElement) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target as HTMLImageElement;
				const src = img.dataset.src;
				if (src) {
					img.src = src;
					img.removeAttribute('data-src');
				}
				observer.unobserve(img);
			}
		});
	});

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}

export function preloadRoute(href: string) {
	const link = document.createElement('link');
	link.rel = 'prefetch';
	link.href = href;
	document.head.appendChild(link);
}

export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout>;
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return function executedFunction(...args: Parameters<T>) {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

