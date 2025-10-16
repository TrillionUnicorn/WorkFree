<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	
	let { data }: { data: PageData } = $props();
	
	const tiers = ['free', 'starter', 'professional', 'enterprise'] as const;
	
	function getTierColor(tier: string) {
		switch (tier) {
			case 'free': return 'from-slate-600 to-slate-700';
			case 'starter': return 'from-blue-600 to-blue-700';
			case 'professional': return 'from-purple-600 to-purple-700';
			case 'enterprise': return 'from-yellow-600 to-orange-700';
			default: return 'from-slate-600 to-slate-700';
		}
	}
</script>

<div class="max-w-7xl mx-auto space-y-12">
	<!-- Header -->
	<div class="text-center">
		<h1 class="text-5xl font-bold text-gradient mb-4">Choose Your Plan</h1>
		<p class="text-xl text-slate-400">
			Unlock the full potential of VR training
		</p>
	</div>

	<!-- Pricing Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
		{#each tiers as tier}
			{@const plan = data.plans[tier]}
			{@const isCurrent = data.currentTier === tier}
			{@const isUpgrade = tiers.indexOf(tier) > tiers.indexOf(data.currentTier)}
			
			<div class="bg-glass rounded-2xl p-8 {isCurrent ? 'ring-2 ring-primary-500' : ''} relative">
				{#if isCurrent}
					<div class="absolute top-4 right-4">
						<span class="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
							Current Plan
						</span>
					</div>
				{/if}

				<!-- Plan Header -->
				<div class="mb-6">
					<h3 class="text-2xl font-bold text-white mb-2">{plan.name}</h3>
					<div class="flex items-baseline mb-4">
						<span class="text-4xl font-bold text-white">${plan.price}</span>
						{#if plan.price > 0}
							<span class="text-slate-400 ml-2">/month</span>
						{/if}
					</div>
				</div>

				<!-- Features -->
				<ul class="space-y-3 mb-8">
					{#each plan.features as feature}
						<li class="flex items-start">
							<svg class="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
							</svg>
							<span class="text-slate-300 text-sm">{feature}</span>
						</li>
					{/each}
				</ul>

				<!-- CTA Button -->
				{#if tier === 'free'}
					<button
						disabled
						class="w-full py-3 px-6 bg-slate-700 text-slate-400 rounded-lg font-semibold cursor-not-allowed"
					>
						{isCurrent ? 'Current Plan' : 'Downgrade'}
					</button>
				{:else if isCurrent}
					<a
						href="/pricing/manage"
						class="block w-full py-3 px-6 bg-slate-700 hover:bg-slate-600 text-white text-center rounded-lg font-semibold transition-colors"
					>
						Manage Subscription
					</a>
				{:else if isUpgrade}
					<form method="POST" action="?/checkout" use:enhance>
						<input type="hidden" name="tier" value={tier} />
						<button
							type="submit"
							class="w-full py-3 px-6 bg-gradient-to-r {getTierColor(tier)} hover:opacity-90 text-white rounded-lg font-semibold transition-all duration-200"
						>
							Upgrade to {plan.name}
						</button>
					</form>
				{:else}
					<button
						disabled
						class="w-full py-3 px-6 bg-slate-700 text-slate-400 rounded-lg font-semibold cursor-not-allowed"
					>
						Downgrade
					</button>
				{/if}
			</div>
		{/each}
	</div>

	<!-- FAQ Section -->
	<div class="bg-glass rounded-2xl p-8">
		<h2 class="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<h3 class="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h3>
				<p class="text-slate-400">
					Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
				<p class="text-slate-400">
					We accept all major credit cards through Stripe's secure payment processing.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-white mb-2">Is there a free trial?</h3>
				<p class="text-slate-400">
					The Free plan is available forever. Upgrade anytime to unlock premium features.
				</p>
			</div>
			<div>
				<h3 class="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h3>
				<p class="text-slate-400">
					Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.
				</p>
			</div>
		</div>
	</div>

	<!-- Enterprise CTA -->
	<div class="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-2xl p-12 text-center">
		<h2 class="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
		<p class="text-xl text-slate-300 mb-8">
			Contact us for enterprise pricing and custom integrations
		</p>
		<a
			href="mailto:enterprise@workfree.com"
			class="inline-block bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
		>
			Contact Sales
		</a>
	</div>
</div>

