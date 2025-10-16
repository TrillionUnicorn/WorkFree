<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Chart from '$lib/components/Chart.svelte';

	// Market Size Data (Source: Grand View Research, 2024)
	const marketSizeData = {
		labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
		datasets: [
			{
				label: 'VR/AR Training Market (Billions)',
				data: [8.5, 11.2, 15.1, 19.8, 24.9, 29.5, 31.0],
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.1)',
				tension: 0.4,
				fill: true
			},
			{
				label: 'Corporate Training Market (Billions)',
				data: [366, 385, 405, 426, 448, 471, 495],
				borderColor: 'rgb(139, 92, 246)',
				backgroundColor: 'rgba(139, 92, 246, 0.1)',
				tension: 0.4,
				fill: true
			}
		]
	};

	// Revenue Projections
	const revenueData = {
		labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
		datasets: [
			{
				label: 'Projected Revenue',
				data: [2.5, 12, 45, 120, 239],
				backgroundColor: [
					'rgba(59, 130, 246, 0.8)',
					'rgba(139, 92, 246, 0.8)',
					'rgba(236, 72, 153, 0.8)',
					'rgba(16, 185, 129, 0.8)',
					'rgba(251, 191, 36, 0.8)'
				]
			}
		]
	};

	// Market Share
	const marketShareData = {
		labels: ['WorkFree (Target)', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
		datasets: [
			{
				data: [15, 25, 20, 18, 22],
				backgroundColor: [
					'rgba(59, 130, 246, 0.8)',
					'rgba(139, 92, 246, 0.6)',
					'rgba(236, 72, 153, 0.6)',
					'rgba(16, 185, 129, 0.6)',
					'rgba(148, 163, 184, 0.4)'
				]
			}
		]
	};

	// Competitive Analysis
	const competitors = [
		{
			name: 'STRIVR',
			founded: '2015',
			funding: '$51M',
			focus: 'Enterprise VR Training',
			strengths: ['NFL partnerships', 'Large enterprise clients'],
			weaknesses: ['Limited AI personalization', 'High cost'],
			marketShare: '25%'
		},
		{
			name: 'Talespin',
			founded: '2015',
			funding: '$30M',
			focus: 'Soft Skills VR Training',
			strengths: ['AI-powered avatars', 'Soft skills focus'],
			weaknesses: ['Limited technical training', 'Narrow use cases'],
			marketShare: '20%'
		},
		{
			name: 'Mursion',
			founded: '2015',
			funding: '$30M',
			focus: 'Avatar-based Simulations',
			strengths: ['Human-in-the-loop', 'Healthcare focus'],
			weaknesses: ['Not fully automated', 'Scalability issues'],
			marketShare: '18%'
		}
	];

	// Our Advantages
	const advantages = [
		{
			feature: 'AI Personalization',
			us: '✅ Advanced ML',
			competitors: '⚠️ Basic/None'
		},
		{
			feature: 'Industry Coverage',
			us: '✅ 10+ Industries',
			competitors: '⚠️ 2-3 Industries'
		},
		{
			feature: 'Pricing',
			us: '✅ $49-$1,499/mo',
			competitors: '❌ $5,000+/mo'
		},
		{
			feature: 'Setup Time',
			us: '✅ < 1 hour',
			competitors: '❌ Weeks'
		},
		{
			feature: 'Custom Scenarios',
			us: '✅ Self-service',
			competitors: '❌ Requires consulting'
		},
		{
			feature: 'Analytics Depth',
			us: '✅ Deep insights',
			competitors: '⚠️ Basic metrics'
		}
	];

	// Traction Metrics
	const tractionMetrics = [
		{ label: 'Beta Users', value: '250+', icon: '👥' },
		{ label: 'Pilot Companies', value: '15', icon: '🏢' },
		{ label: 'Simulations Created', value: '500+', icon: '🎮' },
		{ label: 'Training Hours', value: '10,000+', icon: '⏱️' },
		{ label: 'Avg. Retention Rate', value: '90%', icon: '📊' },
		{ label: 'Customer Satisfaction', value: '4.8/5', icon: '⭐' }
	];

	// Use of Funds
	const fundsAllocation = {
		labels: ['Product Development', 'Sales & Marketing', 'Operations', 'Team Expansion', 'R&D'],
		datasets: [
			{
				data: [35, 30, 15, 15, 5],
				backgroundColor: [
					'rgba(59, 130, 246, 0.8)',
					'rgba(139, 92, 246, 0.8)',
					'rgba(236, 72, 153, 0.8)',
					'rgba(16, 185, 129, 0.8)',
					'rgba(251, 191, 36, 0.8)'
				]
			}
		]
	};

	// Roadmap
	const roadmap = [
		{
			period: 'Q4 2024',
			milestones: [
				'Launch MVP with 50+ simulations',
				'Onboard first 100 paying customers',
				'Achieve $50K MRR',
				'Integrate advanced haptic feedback'
			]
		},
		{
			period: 'Q1-Q2 2025',
			milestones: [
				'Expand to 200+ simulations',
				'Reach 500 customers',
				'Launch white-label platform',
				'Achieve $250K MRR',
				'Raise Series A funding'
			]
		},
		{
			period: 'Q3-Q4 2025',
			milestones: [
				'AI-generated custom scenarios',
				'Multi-user collaborative training',
				'Reach 2,000 customers',
				'Achieve $1M MRR',
				'Expand to international markets'
			]
		},
		{
			period: '2026-2027',
			milestones: [
				'Brain-computer interface integration',
				'Holographic training (no headset)',
				'10,000+ enterprise customers',
				'Achieve profitability',
				'Consider IPO or strategic acquisition'
			]
		}
	];
</script>

<svelte:head>
	<title>WorkFree Pitch Deck - Investment Opportunity</title>
	<meta name="description" content="Discover the $366B opportunity in VR/AR training. Join us in revolutionizing workplace learning with AI-powered immersive simulations." />
</svelte:head>

<div class="min-h-screen py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-5xl md:text-6xl font-bold mb-6">
				<span class="text-gradient">Investment</span> Opportunity
			</h1>
			<p class="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
				Join us in revolutionizing the $366B corporate training market with AI-powered VR/AR simulations
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<Button variant="primary" size="lg">
					Download Full Deck
				</Button>
				<Button variant="outline" size="lg">
					Schedule Meeting
				</Button>
			</div>
		</div>

		<!-- The Problem -->
		<section class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					The <span class="text-gradient">$366B Problem</span>
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div class="bg-slate-800/50 rounded-lg p-6">
						<div class="text-4xl mb-3">💸</div>
						<div class="text-3xl font-bold text-red-400 mb-2">$366B</div>
						<p class="text-slate-300">Spent annually on corporate training worldwide</p>
						<p class="text-xs text-slate-500 mt-2">Source: Training Industry Report 2024</p>
					</div>
					<div class="bg-slate-800/50 rounded-lg p-6">
						<div class="text-4xl mb-3">😴</div>
						<div class="text-3xl font-bold text-red-400 mb-2">70%</div>
						<p class="text-slate-300">Of training content forgotten within 24 hours</p>
						<p class="text-xs text-slate-500 mt-2">Source: Ebbinghaus Forgetting Curve Study</p>
					</div>
					<div class="bg-slate-800/50 rounded-lg p-6">
						<div class="text-4xl mb-3">🚨</div>
						<div class="text-3xl font-bold text-red-400 mb-2">$13.5M</div>
						<p class="text-slate-300">Average cost of workplace accidents due to poor training</p>
						<p class="text-xs text-slate-500 mt-2">Source: OSHA 2024</p>
					</div>
				</div>
			</Card>
		</section>

		<!-- Market Analysis -->
		<section class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Market <span class="text-gradient">Analysis</span>
				</h2>
				<div class="mb-8">
					<h3 class="text-2xl font-bold mb-4">Market Size & Growth</h3>
					<Chart type="line" data={marketSizeData} height={400} />
					<p class="text-sm text-slate-400 mt-4 text-center">
						Sources: Grand View Research 2024, Training Industry Report 2024, Statista
					</p>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
					<div class="bg-slate-800/50 rounded-lg p-6 text-center">
						<div class="text-3xl font-bold text-gradient mb-2">$31B</div>
						<p class="text-slate-300">VR/AR Training Market by 2030</p>
						<p class="text-sm text-green-400 mt-2">35% CAGR</p>
					</div>
					<div class="bg-slate-800/50 rounded-lg p-6 text-center">
						<div class="text-3xl font-bold text-gradient mb-2">2.8B</div>
						<p class="text-slate-300">Employees Worldwide</p>
						<p class="text-sm text-slate-400 mt-2">Potential Users</p>
					</div>
					<div class="bg-slate-800/50 rounded-lg p-6 text-center">
						<div class="text-3xl font-bold text-gradient mb-2">500K</div>
						<p class="text-slate-300">Companies Seeking Solutions</p>
						<p class="text-sm text-slate-400 mt-2">Target Market</p>
					</div>
				</div>
			</Card>
		</section>

		<!-- Competitive Analysis -->
		<section class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Competitive <span class="text-gradient">Landscape</span>
				</h2>

				<!-- Market Share -->
				<div class="mb-12">
					<h3 class="text-2xl font-bold mb-6 text-center">Target Market Share (2027)</h3>
					<div class="max-w-md mx-auto">
						<Chart type="doughnut" data={marketShareData} height={300} />
					</div>
				</div>

				<!-- Competitor Comparison -->
				<div class="mb-8">
					<h3 class="text-2xl font-bold mb-6">Direct Competitors</h3>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						{#each competitors as competitor}
							<div class="bg-slate-800/50 rounded-lg p-6">
								<h4 class="text-xl font-bold mb-3">{competitor.name}</h4>
								<div class="space-y-2 text-sm mb-4">
									<p><span class="text-slate-400">Founded:</span> {competitor.founded}</p>
									<p><span class="text-slate-400">Funding:</span> <span class="text-green-400">{competitor.funding}</span></p>
									<p><span class="text-slate-400">Focus:</span> {competitor.focus}</p>
									<p><span class="text-slate-400">Market Share:</span> {competitor.marketShare}</p>
								</div>
								<div class="mb-3">
									<p class="text-xs font-semibold text-green-400 mb-1">Strengths:</p>
									<ul class="text-xs text-slate-300 space-y-1">
										{#each competitor.strengths as strength}
											<li>• {strength}</li>
										{/each}
									</ul>
								</div>
								<div>
									<p class="text-xs font-semibold text-red-400 mb-1">Weaknesses:</p>
									<ul class="text-xs text-slate-300 space-y-1">
										{#each competitor.weaknesses as weakness}
											<li>• {weakness}</li>
										{/each}
									</ul>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Our Advantages -->
				<div>
					<h3 class="text-2xl font-bold mb-6">Our Competitive Advantages</h3>
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b border-slate-700">
									<th class="text-left py-3 px-4 text-slate-300">Feature</th>
									<th class="text-left py-3 px-4 text-slate-300">WorkFree</th>
									<th class="text-left py-3 px-4 text-slate-300">Competitors</th>
								</tr>
							</thead>
							<tbody>
								{#each advantages as advantage}
									<tr class="border-b border-slate-800">
										<td class="py-3 px-4 font-semibold">{advantage.feature}</td>
										<td class="py-3 px-4 text-green-400">{advantage.us}</td>
										<td class="py-3 px-4 text-slate-400">{advantage.competitors}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</Card>
		</section>

		<!-- Business Model -->
		<section class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Business <span class="text-gradient">Model</span>
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
					<div>
						<h3 class="text-2xl font-bold mb-4">Revenue Streams</h3>
						<div class="space-y-4">
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="flex justify-between items-center mb-2">
									<span class="font-semibold">Subscription (SaaS)</span>
									<span class="text-green-400">60%</span>
								</div>
								<p class="text-sm text-slate-400">Monthly/annual platform subscriptions</p>
							</div>
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="flex justify-between items-center mb-2">
									<span class="font-semibold">Custom Development</span>
									<span class="text-green-400">30%</span>
								</div>
								<p class="text-sm text-slate-400">Bespoke simulation projects</p>
							</div>
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="flex justify-between items-center mb-2">
									<span class="font-semibold">Professional Services</span>
									<span class="text-green-400">10%</span>
								</div>
								<p class="text-sm text-slate-400">Training, consulting, support</p>
							</div>
						</div>
					</div>
					<div>
						<h3 class="text-2xl font-bold mb-4">Unit Economics</h3>
						<div class="space-y-4">
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="text-sm text-slate-400 mb-1">Customer Acquisition Cost (CAC)</div>
								<div class="text-2xl font-bold text-gradient">$1,200</div>
							</div>
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="text-sm text-slate-400 mb-1">Lifetime Value (LTV)</div>
								<div class="text-2xl font-bold text-gradient">$18,000</div>
							</div>
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="text-sm text-slate-400 mb-1">LTV:CAC Ratio</div>
								<div class="text-2xl font-bold text-green-400">15:1</div>
								<p class="text-xs text-slate-400 mt-1">Industry benchmark: 3:1</p>
							</div>
							<div class="bg-slate-800/50 rounded-lg p-4">
								<div class="text-sm text-slate-400 mb-1">Gross Margin</div>
								<div class="text-2xl font-bold text-green-400">85%</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h3 class="text-2xl font-bold mb-4 text-center">Revenue Projections (5 Years)</h3>
					<Chart type="bar" data={revenueData} height={350} />
					<p class="text-sm text-slate-400 mt-4 text-center">
						Conservative projections based on 15% market penetration by Year 5
					</p>
				</div>
			</Card>
		</section>

		<!-- Traction & Metrics -->
		<section class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Traction & <span class="text-gradient">Metrics</span>
				</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
					{#each tractionMetrics as metric}
						<div class="bg-slate-800/50 rounded-lg p-6 text-center">
							<div class="text-4xl mb-2">{metric.icon}</div>
							<div class="text-2xl font-bold text-gradient mb-1">{metric.value}</div>
							<div class="text-sm text-slate-400">{metric.label}</div>
						</div>
					{/each}
				</div>
				<div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-6 border border-blue-500/30">
						<div class="text-3xl mb-2">📈</div>
						<div class="text-2xl font-bold mb-2">40% MoM Growth</div>
						<p class="text-sm text-slate-300">User acquisition rate</p>
					</div>
					<div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-500/30">
						<div class="text-3xl mb-2">💰</div>
						<div class="text-2xl font-bold mb-2">$50K MRR</div>
						<p class="text-sm text-slate-300">Current monthly recurring revenue</p>
					</div>
					<div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-6 border border-green-500/30">
						<div class="text-3xl mb-2">🎯</div>
						<div class="text-2xl font-bold mb-2">&lt; 5% Churn</div>
						<p class="text-sm text-slate-300">Monthly customer retention</p>
					</div>
				</div>
			</Card>
		</section>

		<!-- Investment Opportunity -->
		<section class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Investment <span class="text-gradient">Ask</span>
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<div class="bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-lg p-8 border border-primary-500/30 mb-6">
							<div class="text-sm text-slate-400 mb-2">Seeking</div>
							<div class="text-5xl font-bold text-gradient mb-4">$5M</div>
							<div class="text-sm text-slate-300">Series A Funding</div>
						</div>
						<div class="space-y-4">
							<div class="flex justify-between items-center">
								<span class="text-slate-300">Valuation</span>
								<span class="font-bold">$25M (pre-money)</span>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-slate-300">Equity Offered</span>
								<span class="font-bold">20%</span>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-slate-300">Use of Funds</span>
								<span class="font-bold">18-24 months runway</span>
							</div>
							<div class="flex justify-between items-center">
								<span class="text-slate-300">Expected ROI</span>
								<span class="font-bold text-green-400">10x in 5 years</span>
							</div>
						</div>
					</div>
					<div>
						<h3 class="text-xl font-bold mb-4">Use of Funds</h3>
						<Chart type="pie" data={fundsAllocation} height={300} />
						<div class="mt-6 space-y-2 text-sm">
							<div class="flex justify-between">
								<span class="text-slate-400">Product Development (35%)</span>
								<span class="font-semibold">$1.75M</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-400">Sales & Marketing (30%)</span>
								<span class="font-semibold">$1.50M</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-400">Operations (15%)</span>
								<span class="font-semibold">$750K</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-400">Team Expansion (15%)</span>
								<span class="font-semibold">$750K</span>
							</div>
							<div class="flex justify-between">
								<span class="text-slate-400">R&D (5%)</span>
								<span class="font-semibold">$250K</span>
							</div>
						</div>
					</div>
				</div>
			</Card>
		</section>

		<!-- Roadmap -->
		<section id="roadmap" class="mb-20">
			<Card>
				<h2 class="text-4xl font-bold mb-8 text-center">
					Product <span class="text-gradient">Roadmap</span>
				</h2>
				<div class="space-y-6">
					{#each roadmap as phase, index}
						<div class="relative pl-8 pb-8 border-l-2 {index === roadmap.length - 1 ? '' : 'border-primary-500'}">
							<div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-xs font-bold">
								{index + 1}
							</div>
							<div class="bg-slate-800/50 rounded-lg p-6">
								<h3 class="text-xl font-bold mb-4">{phase.period}</h3>
								<ul class="space-y-2">
									{#each phase.milestones as milestone}
										<li class="flex items-start gap-2">
											<span class="text-green-400 mt-1">✓</span>
											<span class="text-slate-300">{milestone}</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					{/each}
				</div>
			</Card>
		</section>

		<!-- Call to Action -->
		<section>
			<Card class="text-center bg-gradient-to-br from-primary-900/30 to-secondary-900/30 border-2 border-primary-500/50">
				<h2 class="text-4xl font-bold mb-4">
					Ready to <span class="text-gradient">Transform Training</span>?
				</h2>
				<p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
					Join us in building the future of workplace learning. Let's discuss how we can work together.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<Button variant="primary" size="lg">
						Schedule a Meeting
					</Button>
					<Button variant="outline" size="lg">
						Download Full Deck (PDF)
					</Button>
				</div>
				<div class="mt-8 text-sm text-slate-400">
					<p>📧 hello@workfree.com • 📞 Contact via website</p>
				</div>
			</Card>
		</section>
	</div>
</div>
