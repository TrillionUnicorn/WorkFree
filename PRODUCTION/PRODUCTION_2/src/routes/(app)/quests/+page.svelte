<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	function getDifficultyColor(difficulty: string) {
		switch (difficulty) {
			case 'beginner':
				return 'bg-green-500/20 text-green-400';
			case 'intermediate':
				return 'bg-yellow-500/20 text-yellow-400';
			case 'advanced':
				return 'bg-red-500/20 text-red-400';
			default:
				return 'bg-slate-500/20 text-slate-400';
		}
	}
	
	function getStatusColor(status: string | null) {
		if (!status) return 'bg-slate-500/20 text-slate-400';
		switch (status) {
			case 'completed':
				return 'bg-green-500/20 text-green-400';
			case 'in_progress':
				return 'bg-blue-500/20 text-blue-400';
			case 'failed':
				return 'bg-red-500/20 text-red-400';
			default:
				return 'bg-slate-500/20 text-slate-400';
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-4xl font-bold text-gradient mb-2">Quests</h1>
		<p class="text-slate-400">Choose your next learning adventure</p>
	</div>

	<!-- Filters -->
	<div class="bg-glass rounded-xl p-6">
		<div class="flex flex-wrap gap-4">
			<div>
				<label class="block text-sm font-medium text-slate-300 mb-2">Category</label>
				<select
					class="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
					onchange={(e) => {
						const url = new URL(window.location.href);
						if (e.currentTarget.value) {
							url.searchParams.set('category', e.currentTarget.value);
						} else {
							url.searchParams.delete('category');
						}
						window.location.href = url.toString();
					}}
				>
					<option value="">All Categories</option>
					{#each data.categories as category}
						<option value={category} selected={data.filters.category === category}>
							{category}
						</option>
					{/each}
				</select>
			</div>

			<div>
				<label class="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
				<select
					class="bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
					onchange={(e) => {
						const url = new URL(window.location.href);
						if (e.currentTarget.value) {
							url.searchParams.set('difficulty', e.currentTarget.value);
						} else {
							url.searchParams.delete('difficulty');
						}
						window.location.href = url.toString();
					}}
				>
					<option value="">All Difficulties</option>
					{#each data.difficulties as difficulty}
						<option value={difficulty} selected={data.filters.difficulty === difficulty}>
							{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
						</option>
					{/each}
				</select>
			</div>

			{#if data.filters.category || data.filters.difficulty}
				<div class="flex items-end">
					<a
						href="/quests"
						class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
					>
						Clear Filters
					</a>
				</div>
			{/if}
		</div>
	</div>

	<!-- Quests Grid -->
	{#if data.quests.length === 0}
		<div class="bg-glass rounded-xl p-12 text-center">
			<p class="text-slate-400 text-lg">No quests found matching your filters</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.quests as quest}
				<a
					href="/quests/{quest.id}"
					class="bg-glass rounded-xl p-6 hover:bg-white/10 transition-all duration-200 group"
				>
					<!-- Quest Header -->
					<div class="flex items-start justify-between mb-4">
						<div class="flex-1">
							<h3 class="text-xl font-bold text-white group-hover:text-gradient transition-colors mb-2">
								{quest.title}
							</h3>
							<p class="text-sm text-slate-400 line-clamp-2">
								{quest.description || 'No description available'}
							</p>
						</div>
					</div>

					<!-- Quest Meta -->
					<div class="flex flex-wrap gap-2 mb-4">
						<span class="px-3 py-1 rounded-full text-xs font-medium {getDifficultyColor(quest.difficulty)}">
							{quest.difficulty}
						</span>
						<span class="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400">
							{quest.category}
						</span>
						{#if quest.userProgress}
							<span class="px-3 py-1 rounded-full text-xs font-medium {getStatusColor(quest.userProgress.status)}">
								{quest.userProgress.status.replace('_', ' ')}
							</span>
						{/if}
					</div>

					<!-- Quest Stats -->
					<div class="flex items-center justify-between text-sm">
						<div class="flex items-center space-x-4">
							<div class="flex items-center text-slate-400">
								<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								{quest.durationMinutes || 30} min
							</div>
							<div class="flex items-center text-yellow-400">
								<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								{quest.xpReward} XP
							</div>
						</div>

						{#if quest.userProgress}
							<div class="text-primary-400 font-medium">
								{quest.userProgress.progressPercentage}%
							</div>
						{/if}
					</div>

					<!-- Progress Bar -->
					{#if quest.userProgress}
						<div class="mt-4">
							<div class="w-full bg-slate-700 rounded-full h-2">
								<div
									class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
									style="width: {quest.userProgress.progressPercentage}%"
								></div>
							</div>
						</div>
					{/if}
				</a>
			{/each}
		</div>
	{/if}
</div>

