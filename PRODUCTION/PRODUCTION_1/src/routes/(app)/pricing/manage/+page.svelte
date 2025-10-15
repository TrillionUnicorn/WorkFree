<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	
	let { data }: { data: PageData } = $props();
	
	function getStatusColor(status: string) {
		switch (status) {
			case 'active': return 'bg-green-500/20 text-green-400';
			case 'past_due': return 'bg-yellow-500/20 text-yellow-400';
			case 'canceled': return 'bg-red-500/20 text-red-400';
			default: return 'bg-slate-500/20 text-slate-400';
		}
	}
</script>

<div class="max-w-4xl mx-auto space-y-8">
	<!-- Header -->
	<div>
		<a href="/pricing" class="text-primary-400 hover:text-primary-300 mb-4 inline-block">
			← Back to Pricing
		</a>
		<h1 class="text-4xl font-bold text-gradient mb-2">Manage Subscription</h1>
		<p class="text-slate-400">Update your billing information and subscription</p>
	</div>

	<!-- Current Subscription -->
	<div class="bg-glass rounded-xl p-8">
		<h2 class="text-2xl font-bold text-white mb-6">Current Subscription</h2>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
			<div>
				<p class="text-sm text-slate-400 mb-1">Plan</p>
				<p class="text-xl font-bold text-white capitalize">{data.user.subscriptionTier}</p>
			</div>
			<div>
				<p class="text-sm text-slate-400 mb-1">Status</p>
				<span class="inline-block px-3 py-1 rounded-full text-sm font-medium {getStatusColor(data.user.subscriptionStatus)} capitalize">
					{data.user.subscriptionStatus}
				</span>
			</div>
		</div>

		<!-- Stripe Customer Portal -->
		<form method="POST" action="?/portal" use:enhance>
			<button
				type="submit"
				class="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
			>
				Manage Billing in Stripe
			</button>
		</form>
		
		<p class="text-sm text-slate-400 mt-4">
			You'll be redirected to Stripe's secure portal where you can:
		</p>
		<ul class="list-disc list-inside text-sm text-slate-400 mt-2 space-y-1">
			<li>Update payment method</li>
			<li>View billing history</li>
			<li>Download invoices</li>
			<li>Cancel subscription</li>
		</ul>
	</div>

	<!-- Quick Actions -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<a
			href="/pricing"
			class="bg-glass rounded-xl p-6 hover:bg-white/10 transition-colors group"
		>
			<div class="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
				<svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-white mb-2">Change Plan</h3>
			<p class="text-slate-400 text-sm">Upgrade or downgrade your subscription</p>
		</a>

		<a
			href="/dashboard"
			class="bg-glass rounded-xl p-6 hover:bg-white/10 transition-colors group"
		>
			<div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
				<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-white mb-2">Back to Dashboard</h3>
			<p class="text-slate-400 text-sm">Continue your learning journey</p>
		</a>
	</div>
</div>

