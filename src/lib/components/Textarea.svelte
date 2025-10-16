<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		label?: string;
		error?: string;
		value?: string;
	}

	let {
		label,
		error,
		value = $bindable(''),
		class: className = '',
		...rest
	}: Props = $props();

	const baseClasses = 'w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none';
	const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
</script>

<div class="w-full">
	{#if label}
		<label class="block text-sm font-medium text-slate-300 mb-2" for={rest.id || rest.name}>
			{label}
		</label>
	{/if}
	<textarea
		bind:value
		class="{baseClasses} {errorClasses} {className}"
		id={rest.id || rest.name}
		{...rest}
	></textarea>
	{#if error}
		<p class="mt-1 text-sm text-red-400">{error}</p>
	{/if}
</div>

