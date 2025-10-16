<script lang="ts">
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		product: [
			{ label: 'Features', href: '/product#features' },
			{ label: 'Pricing', href: '/#pricing' },
			{ label: 'Demo', href: '/product' },
			{ label: 'Roadmap', href: '/pitch#roadmap' }
		],
		company: [
			{ label: 'About', href: '/#mission' },
			{ label: 'Pitch Deck', href: '/pitch' },
			{ label: 'Contact', href: '/contact' },
			{ label: 'Careers', href: '/contact' }
		],
		resources: [
			{ label: 'Documentation', href: '#' },
			{ label: 'Blog', href: '#' },
			{ label: 'Community', href: '#' },
			{ label: 'Support', href: '/contact' }
		],
		legal: [
			{ label: 'Privacy Policy', href: '#' },
			{ label: 'Terms of Service', href: '#' },
			{ label: 'Cookie Policy', href: '#' },
			{ label: 'GDPR', href: '#' }
		]
	};

	const socialLinks = [
		{ name: 'GitHub', icon: '🔗', href: 'https://github.com/HunterHo07' },
		{ name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/workfree' },
		{ name: 'Twitter', icon: '🐦', href: 'https://twitter.com/workfree' },
		{ name: 'Discord', icon: '💬', href: 'https://discord.gg/workfree' },
		{ name: 'YouTube', icon: '📺', href: 'https://youtube.com/workfree' }
	];
</script>

<footer class="bg-slate-950 border-t border-white/10 mt-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
			<!-- Brand Column -->
			<div class="col-span-2 md:col-span-4 lg:col-span-1">
				<a href="/" class="flex items-center space-x-2 mb-4 group">
					<div class="text-3xl group-hover:scale-110 transition-transform duration-300">🎯</div>
					<span class="text-xl font-bold text-gradient">WorkFree</span>
				</a>
				<p class="text-slate-400 text-sm mb-4">
					Immersive training simulations for the future of workplace learning.
				</p>
				<div class="flex space-x-3">
					{#each socialLinks as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="text-2xl hover:scale-110 transition-transform duration-300"
							aria-label={social.name}
						>
							{social.icon}
						</a>
					{/each}
				</div>
			</div>

			<!-- Product Links -->
			<div>
				<h3 class="text-white font-semibold mb-4">Product</h3>
				<ul class="space-y-2">
					{#each footerLinks.product as link}
						<li>
							<a href={link.href} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company Links -->
			<div>
				<h3 class="text-white font-semibold mb-4">Company</h3>
				<ul class="space-y-2">
					{#each footerLinks.company as link}
						<li>
							<a href={link.href} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Resources Links -->
			<div>
				<h3 class="text-white font-semibold mb-4">Resources</h3>
				<ul class="space-y-2">
					{#each footerLinks.resources as link}
						<li>
							<a href={link.href} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Legal Links -->
			<div>
				<h3 class="text-white font-semibold mb-4">Legal</h3>
				<ul class="space-y-2">
					{#each footerLinks.legal as link}
						<li>
							<a href={link.href} class="text-slate-400 hover:text-white transition-colors duration-300 text-sm">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-white/10 pt-8">
			<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<p class="text-slate-400 text-sm">
					© {currentYear} WorkFree. All rights reserved.
				</p>
				<div class="flex items-center space-x-4 text-sm text-slate-400">
					<span>Built with ❤️ by Hunter Ho</span>
					<span>•</span>
					<a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors duration-300">
						Portfolio
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>

