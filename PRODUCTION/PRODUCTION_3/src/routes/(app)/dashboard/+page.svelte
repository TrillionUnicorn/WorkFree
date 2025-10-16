<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-8">
	<!-- Welcome Section -->
	<div>
		<h1 class="text-4xl font-bold text-gradient mb-2">Welcome Back!</h1>
		<p class="text-slate-400">Continue your learning journey</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Total XP</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.totalXP}</p>
				</div>
				<div class="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
					</svg>
				</div>
			</div>
		</div>

		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Quests Completed</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.completedQuests}</p>
				</div>
				<div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
			</div>
		</div>

		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Total Quests</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.totalQuests}</p>
				</div>
				<div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
					</svg>
				</div>
			</div>
		</div>

		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Achievements</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.achievements}</p>
				</div>
				<div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- Recent Progress -->
	<div class="bg-glass rounded-xl p-6">
		<h2 class="text-2xl font-bold text-white mb-6">Recent Progress</h2>
		
		{#if data.recentProgress.length === 0}
			<div class="text-center py-12">
				<p class="text-slate-400 mb-4">No quests started yet</p>
				<a
					href="/quests"
					class="inline-block bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
				>
					Browse Quests
				</a>
			</div>
		{:else}
			<div class="space-y-4">
				{#each data.recentProgress as { progress, quest }}
					<div class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
						<div class="flex-1">
							<h3 class="font-semibold text-white">{quest?.title || 'Unknown Quest'}</h3>
							<p class="text-sm text-slate-400">{quest?.category || 'General'}</p>
						</div>
						<div class="flex items-center space-x-4">
							<div class="text-right">
								<p class="text-sm font-medium text-white">{progress.progressPercentage}%</p>
								<p class="text-xs text-slate-400">{progress.status}</p>
							</div>
							<div class="w-24 bg-slate-700 rounded-full h-2">
								<div
									class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full"
									style="width: {progress.progressPercentage}%"
								></div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Quick Actions -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<a
			href="/quests"
			class="bg-glass rounded-xl p-6 hover:bg-white/10 transition-colors group"
		>
			<div class="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
				<svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-white mb-2">Browse Quests</h3>
			<p class="text-slate-400 text-sm">Explore new learning adventures</p>
		</a>

		<a
			href="/achievements"
			class="bg-glass rounded-xl p-6 hover:bg-white/10 transition-colors group"
		>
			<div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
				<svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-white mb-2">View Achievements</h3>
			<p class="text-slate-400 text-sm">See your accomplishments</p>
		</a>

		<a
			href="/leaderboard"
			class="bg-glass rounded-xl p-6 hover:bg-white/10 transition-colors group"
		>
			<div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
				<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>
			</div>
			<h3 class="text-lg font-semibold text-white mb-2">Leaderboard</h3>
			<p class="text-slate-400 text-sm">Compare with other learners</p>
		</a>
	</div>
</div>

