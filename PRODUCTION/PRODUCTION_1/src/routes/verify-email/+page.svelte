<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="bg-glass rounded-2xl p-8 shadow-2xl text-center">
			{#if data.success}
				<div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h1 class="text-3xl font-bold text-white mb-4">Email Verified!</h1>
				<p class="text-slate-300 mb-8">
					{data.message}
				</p>
				<a
					href="/login"
					class="inline-block bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
				>
					Continue to Login
				</a>
			{:else}
				<div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
					<svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
				<h1 class="text-3xl font-bold text-white mb-4">Verification Failed</h1>
				<p class="text-slate-300 mb-8">
					{data.message}
				</p>
				<a
					href="/register"
					class="inline-block bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
				>
					Back to Register
				</a>
			{/if}
		</div>
	</div>
</div>

