<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Scene3D from '$lib/components/Scene3D.svelte';

	let selectedQuest = $state<any>(null);
	let userProgress = $state(0);
	let achievements = $state<string[]>([]);
	let isInQuest = $state(false);

	const quests = [
		{
			id: 'web-dev',
			title: 'Build a Full-Stack Web Application',
			description: 'Learn to create a complete web application using modern frameworks and best practices.',
			difficulty: 'Intermediate',
			duration: '3-4 hours',
			skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
			xp: 500,
			icon: '💻',
			color: 'from-blue-500 to-cyan-500'
		},
		{
			id: 'ui-design',
			title: 'Design a Mobile App Interface',
			description: 'Create beautiful, user-friendly mobile app designs with modern UI/UX principles.',
			difficulty: 'Beginner',
			duration: '2-3 hours',
			skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
			xp: 350,
			icon: '🎨',
			color: 'from-purple-500 to-pink-500'
		},
		{
			id: 'data-science',
			title: 'Analyze Data with Machine Learning',
			description: 'Build predictive models and extract insights from complex datasets.',
			difficulty: 'Advanced',
			duration: '4-5 hours',
			skills: ['Python', 'Pandas', 'Scikit-learn', 'Data Visualization'],
			xp: 750,
			icon: '📊',
			color: 'from-pink-500 to-rose-500'
		},
		{
			id: 'devops',
			title: 'Deploy with CI/CD Pipeline',
			description: 'Set up automated deployment pipelines and infrastructure as code.',
			difficulty: 'Intermediate',
			duration: '3-4 hours',
			skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS'],
			xp: 600,
			icon: '🚀',
			color: 'from-green-500 to-emerald-500'
		}
	];

	const availableAchievements = [
		{ id: 'first-quest', name: 'First Steps', icon: '🎯', description: 'Complete your first quest' },
		{ id: 'speed-demon', name: 'Speed Demon', icon: '⚡', description: 'Complete a quest in under 2 hours' },
		{ id: 'perfectionist', name: 'Perfectionist', icon: '💎', description: 'Score 100% on a quest' },
		{ id: 'explorer', name: 'Explorer', icon: '🗺️', description: 'Try all quest categories' },
		{ id: 'dedicated', name: 'Dedicated Learner', icon: '📚', description: 'Complete 5 quests' }
	];

	function startQuest(quest: any) {
		selectedQuest = quest;
		isInQuest = true;
		userProgress = 0;

		// Simulate quest progress
		const interval = setInterval(() => {
			userProgress += Math.random() * 5;
			if (userProgress >= 100) {
				userProgress = 100;
				clearInterval(interval);
				completeQuest();
			}
		}, 500);
	}

	function completeQuest() {
		if (!achievements.includes('first-quest')) {
			achievements = [...achievements, 'first-quest'];
		}
		setTimeout(() => {
			isInQuest = false;
		}, 2000);
	}

	function exitQuest() {
		isInQuest = false;
		selectedQuest = null;
		userProgress = 0;
	}
</script>

<svelte:head>
	<title>WorkFree Product - Immersive 3D Learning Environment</title>
	<meta name="description" content="Experience the future of learning with our immersive 3D training environment. Complete quests, earn achievements, and master real-world skills." />
</svelte:head>

<div class="min-h-screen py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center mb-12">
			<h1 class="text-5xl md:text-6xl font-bold mb-6">
				<span class="text-gradient">Immersive Learning</span>
				<br />
				Environment
			</h1>
			<p class="text-xl text-slate-300 max-w-3xl mx-auto">
				Step into a 3D world where learning feels like an adventure. Complete quests, earn achievements, and master real-world skills.
			</p>
		</div>

		{#if !selectedQuest}
			<!-- 3D Scene -->
			<div class="mb-12">
				<Card>
					<div class="mb-4">
						<h2 class="text-2xl font-bold mb-2">🌍 Learning World</h2>
						<p class="text-slate-400">Navigate the 3D environment and select a quest to begin your journey</p>
					</div>
					<Scene3D />
					<div class="mt-4 text-center text-sm text-slate-400">
						<p>💡 Move your mouse to explore • Click on quest cubes to start learning</p>
					</div>
				</Card>
			</div>

			<!-- Quest Selection -->
			<div class="mb-12">
				<h2 class="text-3xl font-bold mb-8 text-center">
					Choose Your <span class="text-gradient">Quest</span>
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each quests as quest}
						<Card hover={true} class="cursor-pointer" onclick={() => startQuest(quest)}>
							<div class="flex items-start gap-4">
								<div class="text-5xl">{quest.icon}</div>
								<div class="flex-1">
									<h3 class="text-xl font-bold mb-2">{quest.title}</h3>
									<p class="text-slate-400 text-sm mb-4">{quest.description}</p>
									
									<div class="flex flex-wrap gap-2 mb-4">
										{#each quest.skills as skill}
											<span class="px-3 py-1 bg-gradient-to-r {quest.color} bg-opacity-20 rounded-full text-xs font-semibold">
												{skill}
											</span>
										{/each}
									</div>

									<div class="flex items-center justify-between text-sm">
										<div class="flex gap-4">
											<span class="text-slate-400">
												⏱️ {quest.duration}
											</span>
											<span class="text-slate-400">
												📊 {quest.difficulty}
											</span>
										</div>
										<span class="text-yellow-400 font-semibold">
											+{quest.xp} XP
										</span>
									</div>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			</div>

			<!-- Achievements -->
			<div>
				<h2 class="text-3xl font-bold mb-8 text-center">
					Your <span class="text-gradient">Achievements</span>
				</h2>
				<div class="grid grid-cols-2 md:grid-cols-5 gap-4">
					{#each availableAchievements as achievement}
						<Card class="text-center {achievements.includes(achievement.id) ? 'ring-2 ring-yellow-500' : 'opacity-50'}">
							<div class="text-4xl mb-2">{achievement.icon}</div>
							<div class="text-sm font-semibold mb-1">{achievement.name}</div>
							<div class="text-xs text-slate-400">{achievement.description}</div>
							{#if achievements.includes(achievement.id)}
								<div class="mt-2 text-xs text-yellow-400">✓ Unlocked</div>
							{/if}
						</Card>
					{/each}
				</div>
			</div>
		{:else}
			<!-- Quest In Progress -->
			<Card>
				<div class="mb-6">
					<Button variant="ghost" onclick={exitQuest} class="mb-4">
						← Back to Quests
					</Button>
					<div class="flex items-start gap-4">
						<div class="text-6xl">{selectedQuest.icon}</div>
						<div class="flex-1">
							<h2 class="text-3xl font-bold mb-2">{selectedQuest.title}</h2>
							<p class="text-slate-400 mb-4">{selectedQuest.description}</p>
						</div>
					</div>
				</div>

				<!-- Progress Bar -->
				<div class="mb-8">
					<div class="flex justify-between items-center mb-2">
						<span class="text-sm font-semibold">Quest Progress</span>
						<span class="text-sm text-slate-400">{Math.round(userProgress)}%</span>
					</div>
					<div class="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
						<div 
							class="h-full bg-gradient-to-r {selectedQuest.color} transition-all duration-300 ease-out"
							style="width: {userProgress}%"
						></div>
					</div>
				</div>

				{#if userProgress < 100}
					<!-- Quest Content -->
					<div class="space-y-6">
						<div class="bg-slate-800/50 rounded-lg p-6">
							<h3 class="text-xl font-bold mb-4">📋 Current Task</h3>
							<p class="text-slate-300 mb-4">
								{#if userProgress < 25}
									Setting up your development environment and installing dependencies...
								{:else if userProgress < 50}
									Building the core functionality and implementing key features...
								{:else if userProgress < 75}
									Testing your implementation and fixing any issues...
								{:else}
									Finalizing the project and preparing for deployment...
								{/if}
							</p>
							<div class="flex gap-2">
								<div class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
									{userProgress < 25 ? '🔧 Setup' : userProgress < 50 ? '⚙️ Development' : userProgress < 75 ? '🧪 Testing' : '✅ Finalization'}
								</div>
							</div>
						</div>

						<div class="bg-slate-800/50 rounded-lg p-6">
							<h3 class="text-xl font-bold mb-4">💡 AI Coach Tips</h3>
							<ul class="space-y-2 text-slate-300">
								<li class="flex items-start gap-2">
									<span class="text-green-400 mt-1">✓</span>
									<span>Take your time to understand each concept before moving forward</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="text-green-400 mt-1">✓</span>
									<span>Don't hesitate to experiment and try different approaches</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="text-green-400 mt-1">✓</span>
									<span>Review the documentation when you encounter challenges</span>
								</li>
							</ul>
						</div>
					</div>
				{:else}
					<!-- Quest Complete -->
					<div class="text-center py-12">
						<div class="text-8xl mb-6 animate-bounce">🎉</div>
						<h3 class="text-4xl font-bold mb-4">Quest Complete!</h3>
						<p class="text-xl text-slate-300 mb-6">
							Congratulations! You've successfully completed the quest.
						</p>
						<div class="flex justify-center gap-4 mb-8">
							<div class="bg-glass p-6 rounded-lg">
								<div class="text-3xl font-bold text-gradient mb-1">+{selectedQuest.xp}</div>
								<div class="text-sm text-slate-400">XP Earned</div>
							</div>
							<div class="bg-glass p-6 rounded-lg">
								<div class="text-3xl font-bold text-gradient mb-1">95%</div>
								<div class="text-sm text-slate-400">Score</div>
							</div>
						</div>
						<Button variant="primary" size="lg" onclick={exitQuest}>
							Choose Next Quest
						</Button>
					</div>
				{/if}
			</Card>
		{/if}
	</div>
</div>

