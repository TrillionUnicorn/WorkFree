<script lang="ts">
	import { page } from '$app/stores';
	import Button from './Button.svelte';

	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/product', label: 'Product' },
		{ href: '/pitch', label: 'Pitch Deck' },
		{ href: '/contact', label: 'Contact' }
	];

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-white/10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center space-x-2 group">
				<div class="text-3xl group-hover:scale-110 transition-transform duration-300">🎯</div>
				<span class="text-xl font-bold text-gradient">WorkFree</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navLinks as link}
					<a
						href={link.href}
						class="text-slate-300 hover:text-white transition-colors duration-300 font-medium relative group"
					>
						{link.label}
						<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></span>
					</a>
				{/each}
			</div>

			<!-- CTA Button -->
			<div class="hidden md:block">
				<Button variant="primary" size="sm">
					Join Waitlist
				</Button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden text-white p-2"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				{#if mobileMenuOpen}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
			<div class="px-4 py-4 space-y-3">
				{#each navLinks as link}
					<a
						href={link.href}
						class="block px-4 py-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
						onclick={closeMobileMenu}
					>
						{link.label}
					</a>
				{/each}
				<div class="pt-2">
					<Button variant="primary" size="md" class="w-full">
						Join Waitlist
					</Button>
				</div>
			</div>
		</div>
	{/if}
</nav>

<!-- Spacer to prevent content from going under fixed nav -->
<div class="h-16"></div>

