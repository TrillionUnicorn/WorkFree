<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	
	let { data, form }: { data: PageData; form: ActionData } = $props();
	
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
		<h1 class="text-4xl font-bold text-gradient mb-2">User Management</h1>
		<p class="text-slate-400">Manage users, roles, and subscriptions</p>
	</div>

	<!-- Messages -->
	{#if form?.success}
		<div class="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
			{form.message}
		</div>
	{:else if form?.message}
		<div class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
			{form.message}
		</div>
	{/if}

	<!-- Filters -->
	<div class="bg-glass rounded-xl p-6">
		<form method="GET" class="flex flex-wrap gap-4">
			<div class="flex-1 min-w-[200px]">
				<input
					type="text"
					name="search"
					value={data.filters.search}
					placeholder="Search by email or name..."
					class="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
				/>
			</div>
			<div>
				<select
					name="role"
					class="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
				>
					<option value="">All Roles</option>
					<option value="user" selected={data.filters.role === 'user'}>User</option>
					<option value="premium" selected={data.filters.role === 'premium'}>Premium</option>
					<option value="admin" selected={data.filters.role === 'admin'}>Admin</option>
				</select>
			</div>
			<div>
				<select
					name="tier"
					class="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
				>
					<option value="">All Tiers</option>
					<option value="free" selected={data.filters.tier === 'free'}>Free</option>
					<option value="starter" selected={data.filters.tier === 'starter'}>Starter</option>
					<option value="professional" selected={data.filters.tier === 'professional'}>Professional</option>
					<option value="enterprise" selected={data.filters.tier === 'enterprise'}>Enterprise</option>
				</select>
			</div>
			<button
				type="submit"
				class="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
			>
				Filter
			</button>
			{#if data.filters.search || data.filters.role || data.filters.tier}
				<a
					href="/admin/users"
					class="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
				>
					Clear
				</a>
			{/if}
		</form>
	</div>

	<!-- Users Table -->
	<div class="bg-glass rounded-xl overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-slate-900/50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">User</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Role</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Tier</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Stats</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Joined</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/10">
					{#each data.users as user}
						<tr class="hover:bg-white/5">
							<td class="px-6 py-4">
								<div>
									<p class="font-medium text-white">{user.fullName || 'N/A'}</p>
									<p class="text-sm text-slate-400">{user.email}</p>
								</div>
							</td>
							<td class="px-6 py-4">
								<form method="POST" action="?/updateRole" use:enhance class="inline">
									<input type="hidden" name="userId" value={user.id} />
									<select
										name="role"
										value={user.role}
										onchange={(e) => e.currentTarget.form?.requestSubmit()}
										class="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded capitalize cursor-pointer"
									>
										<option value="user">User</option>
										<option value="premium">Premium</option>
										<option value="admin">Admin</option>
									</select>
								</form>
							</td>
							<td class="px-6 py-4">
								<form method="POST" action="?/updateTier" use:enhance class="inline">
									<input type="hidden" name="userId" value={user.id} />
									<select
										name="tier"
										value={user.subscriptionTier}
										onchange={(e) => e.currentTarget.form?.requestSubmit()}
										class="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded capitalize cursor-pointer"
									>
										<option value="free">Free</option>
										<option value="starter">Starter</option>
										<option value="professional">Professional</option>
										<option value="enterprise">Enterprise</option>
									</select>
								</form>
							</td>
							<td class="px-6 py-4">
								<div class="text-sm text-slate-400">
									<div>{user.stats.completedQuests}/{user.stats.totalQuests} quests</div>
									<div>{user.stats.achievements} achievements</div>
								</div>
							</td>
							<td class="px-6 py-4 text-slate-400 text-sm">
								{formatDate(user.createdAt)}
							</td>
							<td class="px-6 py-4">
								<form
									method="POST"
									action="?/deleteUser"
									use:enhance
									onsubmit={(e) => {
										if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
											e.preventDefault();
										}
									}}
								>
									<input type="hidden" name="userId" value={user.id} />
									<button
										type="submit"
										class="text-red-400 hover:text-red-300 text-sm font-medium"
									>
										Delete
									</button>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	{#if data.users.length === 0}
		<div class="bg-glass rounded-xl p-12 text-center">
			<p class="text-slate-400 text-lg">No users found</p>
		</div>
	{/if}
</div>

