<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	function getRankBadge(rank: number) {
		if (rank === 1) return '🥇';
		if (rank === 2) return '🥈';
		if (rank === 3) return '🥉';
		return `#${rank}`;
	}
	
	function getRankColor(rank: number) {
		if (rank === 1) return 'text-yellow-400';
		if (rank === 2) return 'text-slate-300';
		if (rank === 3) return 'text-orange-400';
		return 'text-slate-400';
	}
	
	function formatTime(seconds: number) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		if (hours > 0) return `${hours}h ${minutes}m`;
		return `${minutes}m`;
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-4xl font-bold text-gradient mb-2">Leaderboard</h1>
		<p class="text-slate-400">See how you rank against other learners</p>
	</div>

	<!-- Current User Stats -->
	<div class="bg-glass rounded-xl p-6 border-2 border-primary-500/50">
		<div class="flex items-center justify-between mb-4">
			<h2 class="text-xl font-bold text-white">Your Ranking</h2>
			<span class="text-3xl font-bold {getRankColor(data.currentUser.rank)}">
				{getRankBadge(data.currentUser.rank)}
			</span>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div>
				<p class="text-sm text-slate-400">Total XP</p>
				<p class="text-2xl font-bold text-white">{data.currentUser.totalXP}</p>
			</div>
			<div>
				<p class="text-sm text-slate-400">Quests Completed</p>
				<p class="text-2xl font-bold text-white">{data.currentUser.completedQuests}</p>
			</div>
			<div>
				<p class="text-sm text-slate-400">Avg Score</p>
				<p class="text-2xl font-bold text-white">{Math.round(data.currentUser.averageScore)}%</p>
			</div>
			<div>
				<p class="text-sm text-slate-400">Time Spent</p>
				<p class="text-2xl font-bold text-white">{formatTime(data.currentUser.totalTimeSpent)}</p>
			</div>
		</div>
	</div>

	<!-- Top 3 Podium -->
	<div class="grid grid-cols-3 gap-4">
		{#each data.leaderboard.slice(0, 3) as user, index}
			<div
				class="bg-glass rounded-xl p-6 text-center {index === 0
					? 'order-2 md:order-1 transform md:scale-110'
					: index === 1
						? 'order-1 md:order-2'
						: 'order-3'}"
			>
				<div class="text-4xl mb-2">{getRankBadge(user.rank)}</div>
				<div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white">
					{user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
				</div>
				<h3 class="font-semibold text-white mb-1 truncate">
					{user.fullName || user.email.split('@')[0]}
				</h3>
				<p class="text-2xl font-bold text-gradient mb-2">{user.totalXP} XP</p>
				<p class="text-sm text-slate-400">{user.completedQuests} quests</p>
			</div>
		{/each}
	</div>

	<!-- Full Leaderboard -->
	<div class="bg-glass rounded-xl overflow-hidden">
		<div class="p-6 border-b border-white/10">
			<h2 class="text-2xl font-bold text-white">All Rankings</h2>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-slate-900/50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
							Rank
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
							User
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
							XP
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
							Quests
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
							Avg Score
						</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
							Time
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/10">
					{#each data.leaderboard as user}
						<tr
							class="hover:bg-white/5 transition-colors {user.isCurrentUser
								? 'bg-primary-500/10'
								: ''}"
						>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="text-lg font-bold {getRankColor(user.rank)}">
									{getRankBadge(user.rank)}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									<div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">
										{user.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
									</div>
									<div>
										<div class="font-medium text-white">
											{user.fullName || user.email.split('@')[0]}
											{#if user.isCurrentUser}
												<span class="ml-2 px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
													You
												</span>
											{/if}
										</div>
										<div class="text-sm text-slate-400">{user.email}</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="text-lg font-bold text-gradient">{user.totalXP}</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="text-white">{user.completedQuests}</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="text-white">{Math.round(user.averageScore)}%</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="text-slate-400">{formatTime(user.totalTimeSpent)}</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Motivational Message -->
	{#if data.currentUser.rank > 3}
		<div class="bg-gradient-to-r from-primary-600/20 to-purple-600/20 rounded-xl p-6 text-center">
			<h3 class="text-xl font-bold text-white mb-2">Keep Learning!</h3>
			<p class="text-slate-300">
				Complete more quests to climb the leaderboard and earn more XP
			</p>
			<a
				href="/quests"
				class="inline-block mt-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
			>
				Browse Quests
			</a>
		</div>
	{/if}
</div>

