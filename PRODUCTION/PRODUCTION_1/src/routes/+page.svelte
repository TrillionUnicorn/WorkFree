<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>WorkFree - VR/AR Training Platform</title>
	<meta name="description" content="Democratizing VR training with AI-powered learning experiences" />
</svelte:head>

<div class="min-h-screen">
	<!-- Navigation -->
	<nav class="bg-glass border-b border-white/10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<span class="text-2xl font-bold text-gradient">WorkFree</span>
				</div>
				<div class="flex items-center space-x-4">
					{#if data.user}
						<a
							href="/dashboard"
							class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
						>
							Dashboard
						</a>
						<form method="POST" action="/logout">
							<button
								type="submit"
								class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
							>
								Logout
							</button>
						</form>
					{:else}
						<a
							href="/login"
							class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
						>
							Login
						</a>
						<a
							href="/register"
							class="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
						>
							Get Started
						</a>
					{/if}
				</div>
			</div>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="relative overflow-hidden py-20 sm:py-32">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient mb-6">
					Democratizing VR Training
				</h1>
				<p class="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
					AI-powered immersive learning experiences that are 10x cheaper and 100x more effective
				</p>
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<a
						href="/register"
						class="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
					>
						Start Free Trial
					</a>
					<a
						href="/quests"
						class="w-full sm:w-auto bg-glass hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200"
					>
						Browse Quests
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-20 bg-slate-900/50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold text-white mb-4">Why WorkFree?</h2>
				<p class="text-xl text-slate-400">The future of training is here</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="bg-glass rounded-xl p-8">
					<div class="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-2">10x Cheaper</h3>
					<p class="text-slate-400">
						$49/month vs $30,000/year. Make VR training accessible to everyone.
					</p>
				</div>

				<div class="bg-glass rounded-xl p-8">
					<div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-2">AI-Powered</h3>
					<p class="text-slate-400">
						Personalized learning paths that adapt to your pace and style.
					</p>
				</div>

				<div class="bg-glass rounded-xl p-8">
					<div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
						<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
						</svg>
					</div>
					<h3 class="text-xl font-bold text-white mb-2">Web + VR</h3>
					<p class="text-slate-400">
						Works in your browser. No headset required, but VR-ready when you are.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Stats Section -->
	<section class="py-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
				<div>
					<div class="text-4xl font-bold text-gradient mb-2">95%</div>
					<div class="text-slate-400">Cost Reduction</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-gradient mb-2">75%</div>
					<div class="text-slate-400">Better Retention</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-gradient mb-2">10+</div>
					<div class="text-slate-400">Industries</div>
				</div>
				<div>
					<div class="text-4xl font-bold text-gradient mb-2">&lt;1hr</div>
					<div class="text-slate-400">Setup Time</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 bg-gradient-to-r from-primary-600/20 to-purple-600/20">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-4xl font-bold text-white mb-4">Ready to Transform Your Training?</h2>
			<p class="text-xl text-slate-300 mb-8">
				Join thousands of learners already using WorkFree
			</p>
			<a
				href="/register"
				class="inline-block bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
			>
				Start Free Trial
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-slate-900/50 border-t border-white/10 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div>
					<h3 class="text-lg font-bold text-white mb-4">WorkFree</h3>
					<p class="text-slate-400 text-sm">
						Democratizing VR training with AI-powered learning experiences.
					</p>
				</div>
				<div>
					<h4 class="text-sm font-semibold text-white mb-4">Product</h4>
					<ul class="space-y-2 text-sm text-slate-400">
						<li><a href="/quests" class="hover:text-white">Quests</a></li>
						<li><a href="/pricing" class="hover:text-white">Pricing</a></li>
						<li><a href="/features" class="hover:text-white">Features</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-sm font-semibold text-white mb-4">Company</h4>
					<ul class="space-y-2 text-sm text-slate-400">
						<li><a href="/about" class="hover:text-white">About</a></li>
						<li><a href="/blog" class="hover:text-white">Blog</a></li>
						<li><a href="/careers" class="hover:text-white">Careers</a></li>
					</ul>
				</div>
				<div>
					<h4 class="text-sm font-semibold text-white mb-4">Legal</h4>
					<ul class="space-y-2 text-sm text-slate-400">
						<li><a href="/privacy" class="hover:text-white">Privacy</a></li>
						<li><a href="/terms" class="hover:text-white">Terms</a></li>
						<li><a href="/security" class="hover:text-white">Security</a></li>
					</ul>
				</div>
			</div>
			<div class="mt-8 pt-8 border-t border-white/10 text-center text-sm text-slate-400">
				© 2025 WorkFree. All rights reserved.
			</div>
		</div>
	</footer>
</div>

