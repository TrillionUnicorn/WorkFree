<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
		hover?: boolean;
		glass?: boolean;
	}

	let {
		children,
		class: className = '',
		hover = false,
		glass = true,
		...rest
	}: Props = $props();

	const baseClasses = 'rounded-2xl p-6 transition-all duration-300';
	const glassClasses = glass ? 'bg-glass' : 'bg-slate-800/50 border border-slate-700';
	const hoverClasses = hover ? 'hover:scale-105 hover:shadow-glow cursor-pointer' : '';
</script>

<div class="{baseClasses} {glassClasses} {hoverClasses} {className}" {...rest}>
	{@render children()}
</div>

