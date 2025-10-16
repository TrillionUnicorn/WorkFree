<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	function formatDate(date: Date) {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
		<p class="text-slate-400">Monitor and manage your platform</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Total Users</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.totalUsers}</p>
					<p class="text-xs text-green-400 mt-1">+{data.stats.recentUsers} this month</p>
				</div>
				<div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
					</svg>
				</div>
			</div>
		</div>

		<div class="bg-glass rounded-xl p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-slate-400 text-sm">Total Quests</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.totalQuests}</p>
					<p class="text-xs text-slate-400 mt-1">{data.stats.totalProgress} enrollments</p>
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
					<p class="text-slate-400 text-sm">Completed Quests</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.completedQuests}</p>
					<p class="text-xs text-slate-400 mt-1">{data.stats.inProgressQuests} in progress</p>
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
					<p class="text-slate-400 text-sm">Achievements Unlocked</p>
					<p class="text-3xl font-bold text-white mt-1">{data.stats.totalAchievements}</p>
				</div>
				<div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
					<svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
					</svg>
				</div>
			</div>
		</div>
	</div>

	<!-- Subscription Breakdown -->
	<div class="bg-glass rounded-xl p-6">
		<h2 class="text-2xl font-bold text-white mb-6">Subscription Breakdown</h2>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			{#each data.subscriptionStats as stat}
				<div class="bg-slate-900/50 rounded-lg p-4">
					<p class="text-sm text-slate-400 mb-1 capitalize">{stat.tier}</p>
					<p class="text-2xl font-bold text-white">{stat.count}</p>
					<p class="text-xs text-slate-500 mt-1">
						{Math.round((stat.count / data.stats.totalUsers) * 100)}%
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Recent Users -->
	<div class="bg-glass rounded-xl p-6">
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-2xl font-bold text-white">Recent Users</h2>
			<a href="/admin/users" class="text-primary-400 hover:text-primary-300 font-medium">
				View All →
			</a>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-slate-900/50">
					<tr>
						<th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">User</th>
						<th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Role</th>
						<th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Subscription</th>
						<th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Joined</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/10">
					{#each data.recentUsers as user}
						<tr class="hover:bg-white/5">
							<td class="px-4 py-3">
								<div>
									<p class="font-medium text-white">{user.fullName || 'N/A'}</p>
									<p class="text-sm text-slate-400">{user.email}</p>
								</div>
							</td>
							<td class="px-4 py-3">
								<span class="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded capitalize">
									{user.role}
								</span>
							</td>
							<td class="px-4 py-3">
								<span class="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded capitalize">
									{user.subscriptionTier}
								</span>
							</td>
							<td class="px-4 py-3 text-slate-400 text-sm">
								{formatDate(user.createdAt)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Popular Quests -->
	<div class="bg-glass rounded-xl p-6">
		<div class="flex items-center justify-between mb-6">
			<h2 class="text-2xl font-bold text-white">Popular Quests</h2>
			<a href="/admin/quests" class="text-primary-400 hover:text-primary-300 font-medium">
				Manage Quests →
			</a>
		</div>
		<div class="space-y-4">
			{#each data.popularQuests as { quest, enrollments }}
				{#if quest}
					<div class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
						<div class="flex-1">
							<h3 class="font-semibold text-white">{quest.title}</h3>
							<p class="text-sm text-slate-400">{quest.category} • {quest.difficulty}</p>
						</div>
						<div class="text-right">
							<p class="text-lg font-bold text-primary-400">{enrollments}</p>
							<p class="text-xs text-slate-400">enrollments</p>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

