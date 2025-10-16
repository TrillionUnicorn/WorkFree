<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	let formData = $state({
		name: '',
		email: '',
		company: '',
		subject: '',
		message: ''
	});

	let isSubmitting = $state(false);
	let submitMessage = $state('');
	let errors = $state<Record<string, string>>({});

	function validateForm() {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = 'Name is required';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Invalid email address';
		}

		if (!formData.message.trim()) {
			newErrors.message = 'Message is required';
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!validateForm()) {
			return;
		}

		isSubmitting = true;
		submitMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				submitMessage = '🎉 Thank you! We\'ll get back to you within 24 hours.';
				formData = {
					name: '',
					email: '',
					company: '',
					subject: '',
					message: ''
				};
			} else {
				submitMessage = '❌ Something went wrong. Please try again or email us directly.';
			}
		} catch (error) {
			submitMessage = '❌ Network error. Please try again or email us directly.';
		} finally {
			isSubmitting = false;
		}
	}

	const contactInfo = [
		{
			icon: '📧',
			title: 'Email',
			value: 'hello@workfree.com',
			link: 'mailto:hello@workfree.com'
		},
		{
			icon: '🌐',
			title: 'Website',
			value: 'workfree.com',
			link: 'https://workfree.com'
		},
		{
			icon: '💼',
			title: 'LinkedIn',
			value: 'WorkFree',
			link: 'https://linkedin.com/company/workfree'
		},
		{
			icon: '🐦',
			title: 'Twitter',
			value: '@WorkFree',
			link: 'https://twitter.com/workfree'
		}
	];

	const socialLinks = [
		{ name: 'GitHub', icon: '🔗', href: 'https://github.com/HunterHo07' },
		{ name: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/company/workfree' },
		{ name: 'Twitter', icon: '🐦', href: 'https://twitter.com/workfree' },
		{ name: 'Discord', icon: '💬', href: 'https://discord.gg/workfree' },
		{ name: 'YouTube', icon: '📺', href: 'https://youtube.com/workfree' }
	];

	const faqs = [
		{
			question: 'What is your typical response time?',
			answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please mention it in your message.'
		},
		{
			question: 'Do you offer demos?',
			answer: 'Yes! We offer personalized demos for all potential customers. Schedule a demo through our contact form or directly via email.'
		},
		{
			question: 'What industries do you serve?',
			answer: 'We serve 10+ industries including healthcare, manufacturing, aviation, construction, corporate training, and more.'
		},
		{
			question: 'Can I try WorkFree before purchasing?',
			answer: 'Absolutely! We offer a 14-day free trial with full access to our platform. No credit card required.'
		}
	];
</script>

<svelte:head>
	<title>Contact WorkFree - Get in Touch</title>
	<meta name="description" content="Have questions about WorkFree? Contact us for demos, support, or partnership opportunities. We respond within 24 hours." />
</svelte:head>

<div class="min-h-screen py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-5xl md:text-6xl font-bold mb-6">
				Get in <span class="text-gradient">Touch</span>
			</h1>
			<p class="text-xl text-slate-300 max-w-3xl mx-auto">
				Have questions? Want to schedule a demo? We're here to help. Reach out and we'll respond within 24 hours.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
			<!-- Contact Form -->
			<div class="lg:col-span-2">
				<Card>
					<h2 class="text-3xl font-bold mb-6">Send us a Message</h2>
					<form onsubmit={handleSubmit} class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Input
								label="Name *"
								type="text"
								placeholder="John Doe"
								bind:value={formData.name}
								error={errors.name}
								required
							/>
							<Input
								label="Email *"
								type="email"
								placeholder="john@company.com"
								bind:value={formData.email}
								error={errors.email}
								required
							/>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<Input
								label="Company"
								type="text"
								placeholder="Your Company"
								bind:value={formData.company}
							/>
							<Input
								label="Subject"
								type="text"
								placeholder="How can we help?"
								bind:value={formData.subject}
							/>
						</div>

						<Textarea
							label="Message *"
							placeholder="Tell us about your training needs..."
							bind:value={formData.message}
							error={errors.message}
							rows={6}
							required
						/>

						<Button type="submit" variant="primary" size="lg" loading={isSubmitting} class="w-full">
							{isSubmitting ? 'Sending...' : 'Send Message'}
						</Button>

						{#if submitMessage}
							<p class="text-center {submitMessage.includes('Thank you') ? 'text-green-400' : 'text-red-400'}">
								{submitMessage}
							</p>
						{/if}
					</form>
				</Card>
			</div>

			<!-- Contact Info -->
			<div class="space-y-6">
				<Card>
					<h3 class="text-2xl font-bold mb-6">Contact Information</h3>
					<div class="space-y-4">
						{#each contactInfo as info}
							<a href={info.link} target="_blank" rel="noopener noreferrer" class="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors duration-300">
								<div class="text-3xl">{info.icon}</div>
								<div>
									<div class="text-sm text-slate-400">{info.title}</div>
									<div class="font-semibold text-primary-400">{info.value}</div>
								</div>
							</a>
						{/each}
					</div>
				</Card>

				<Card>
					<h3 class="text-2xl font-bold mb-6">Follow Us</h3>
					<div class="flex flex-wrap gap-3">
						{#each socialLinks as social}
							<a
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300"
								aria-label={social.name}
							>
								<span class="text-2xl">{social.icon}</span>
								<span class="text-sm font-semibold">{social.name}</span>
							</a>
						{/each}
					</div>
				</Card>

				<Card class="bg-gradient-to-br from-primary-900/30 to-secondary-900/30 border border-primary-500/30">
					<h3 class="text-xl font-bold mb-3">⏱️ Response Time</h3>
					<p class="text-slate-300 text-sm mb-4">
						We typically respond within <span class="text-primary-400 font-semibold">24 hours</span> during business days.
					</p>
					<p class="text-slate-400 text-xs">
						Business Hours: Monday - Friday, 9 AM - 6 PM PST
					</p>
				</Card>
			</div>
		</div>

		<!-- FAQ Section -->
		<section>
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Frequently Asked <span class="text-gradient">Questions</span>
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each faqs as faq}
						<div class="bg-slate-800/50 rounded-lg p-6">
							<h3 class="text-lg font-bold mb-3 text-primary-400">{faq.question}</h3>
							<p class="text-slate-300">{faq.answer}</p>
						</div>
					{/each}
				</div>
			</Card>
		</section>

		<!-- Team Section -->
		<section class="mt-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Meet the <span class="text-gradient">Team</span>
				</h2>
				<div class="max-w-2xl mx-auto">
					<div class="bg-slate-800/50 rounded-lg p-8 text-center">
						<div class="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
							👨‍💻
						</div>
						<h3 class="text-2xl font-bold mb-2">Hunter Ho</h3>
						<p class="text-primary-400 mb-4">Founder & CEO</p>
						<p class="text-slate-300 mb-6">
							Former VR/AR engineer with 15+ years of experience in training technology and simulation. Passionate about making dangerous jobs safer through technology.
						</p>
						<div class="flex justify-center gap-4">
							<a href="https://github.com/HunterHo07" target="_blank" rel="noopener noreferrer" class="text-2xl hover:scale-110 transition-transform duration-300">
								🔗
							</a>
							<a href="https://hunterho07.github.io/Portfolio_1/" target="_blank" rel="noopener noreferrer" class="text-2xl hover:scale-110 transition-transform duration-300">
								💼
							</a>
						</div>
					</div>
				</div>
			</Card>
		</section>
	</div>
</div>

