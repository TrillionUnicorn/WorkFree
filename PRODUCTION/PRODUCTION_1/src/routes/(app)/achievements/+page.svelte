<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	let selectedRarity = $state<string | null>(null);
	
	const rarityColors = {
		common: 'from-slate-500 to-slate-600',
		rare: 'from-blue-500 to-blue-600',
		epic: 'from-purple-500 to-purple-600',
		legendary: 'from-yellow-500 to-orange-600'
	};
	
	const rarityBadgeColors = {
		common: 'bg-slate-500/20 text-slate-400',
		rare: 'bg-blue-500/20 text-blue-400',
		epic: 'bg-purple-500/20 text-purple-400',
		legendary: 'bg-yellow-500/20 text-yellow-400'
	};
	
	const filteredAchievements = $derived(
		selectedRarity
			? data.achievements.filter((a) => a.rarity === selectedRarity)
			: data.achievements
	);
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-4xl font-bold text-gradient mb-2">Achievements</h1>
		<p class="text-slate-400">Track your progress and unlock rewards</p>
	</div>

	<!-- Stats -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Total Achievements</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.total}</p>
				</div>
				<div class="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
					</svg>
				</div>
			</div>
		</div>

		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Unlocked</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.unlocked}</p>
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
					<p class="text-slate-400 text-sm">Completion</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.percentage}%</p>
				</div>
				<div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="bg-glass rounded-xl p-6">
		<div class="flex flex-wrap gap-3">
			<button
				onclick={() => (selectedRarity = null)}
				class="px-4 py-2 rounded-lg font-medium transition-colors {selectedRarity === null
					? 'bg-primary-500 text-white'
					: 'bg-slate-800 text-slate-300 hover:bg-slate-700'}"
			>
				All ({data.achievements.length})
			</button>
			<button
				onclick={() => (selectedRarity = 'common')}
				class="px-4 py-2 rounded-lg font-medium transition-colors {selectedRarity === 'common'
					? 'bg-slate-500 text-white'
					: 'bg-slate-800 text-slate-300 hover:bg-slate-700'}"
			>
				Common ({data.grouped.common.length})
			</button>
			<button
				onclick={() => (selectedRarity = 'rare')}
				class="px-4 py-2 rounded-lg font-medium transition-colors {selectedRarity === 'rare'
					? 'bg-blue-500 text-white'
					: 'bg-slate-800 text-slate-300 hover:bg-slate-700'}"
			>
				Rare ({data.grouped.rare.length})
			</button>
			<button
				onclick={() => (selectedRarity = 'epic')}
				class="px-4 py-2 rounded-lg font-medium transition-colors {selectedRarity === 'epic'
					? 'bg-purple-500 text-white'
					: 'bg-slate-800 text-slate-300 hover:bg-slate-700'}"
			>
				Epic ({data.grouped.epic.length})
			</button>
			<button
				onclick={() => (selectedRarity = 'legendary')}
				class="px-4 py-2 rounded-lg font-medium transition-colors {selectedRarity === 'legendary'
					? 'bg-yellow-500 text-white'
					: 'bg-slate-800 text-slate-300 hover:bg-slate-700'}"
			>
				Legendary ({data.grouped.legendary.length})
			</button>
		</div>
	</div>

	<!-- Achievements Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each filteredAchievements as achievement}
			<div
				class="bg-glass rounded-xl p-6 {achievement.unlocked
					? 'border-2 border-green-500/50'
					: 'opacity-75'}"
			>
				<!-- Achievement Icon -->
				<div class="flex items-start justify-between mb-4">
					<div
						class="w-16 h-16 rounded-lg bg-gradient-to-br {rarityColors[
							achievement.rarity as keyof typeof rarityColors
						]} flex items-center justify-center"
					>
						{#if achievement.unlocked}
							<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						{:else}
							<svg class="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
							</svg>
						{/if}
					</div>
					<span
						class="px-3 py-1 rounded-full text-xs font-medium {rarityBadgeColors[
							achievement.rarity as keyof typeof rarityBadgeColors
						]}"
					>
						{achievement.rarity}
					</span>
				</div>

				<!-- Achievement Info -->
				<h3 class="text-lg font-bold text-white mb-2">{achievement.name}</h3>
				<p class="text-sm text-slate-400 mb-4">{achievement.description}</p>

				<!-- Progress or Unlocked Date -->
				{#if achievement.unlocked}
					<div class="flex items-center text-sm text-green-400">
						<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
						</svg>
						Unlocked
					</div>
					<div class="mt-2 flex items-center text-xs text-slate-500">
						<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						{new Date(achievement.unlockedAt!).toLocaleDateString()}
					</div>
				{:else}
					<div class="space-y-2">
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-400">Progress</span>
							<span class="text-white font-medium">{achievement.progress}%</span>
						</div>
						<div class="w-full bg-slate-700 rounded-full h-2">
							<div
								class="bg-gradient-to-r {rarityColors[
									achievement.rarity as keyof typeof rarityColors
								]} h-2 rounded-full transition-all duration-300"
								style="width: {achievement.progress}%"
							></div>
						</div>
					</div>
				{/if}

				<!-- XP Reward -->
				<div class="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
					<span class="text-xs text-slate-400">Reward</span>
					<span class="text-sm font-medium text-yellow-400">+{achievement.xpReward} XP</span>
				</div>
			</div>
		{/each}
	</div>
</div>

