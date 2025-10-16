<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	
	let { data, form }: { data: PageData; form: ActionData } = $props();
	
	function getDifficultyColor(difficulty: string) {
		switch (difficulty) {
			case 'beginner': return 'bg-green-500/20 text-green-400';
			case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
			case 'advanced': return 'bg-red-500/20 text-red-400';
			default: return 'bg-slate-500/20 text-slate-400';
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-4xl font-bold text-gradient mb-2">Quest Management</h1>
			<p class="text-slate-400">Create, edit, and manage quests</p>
		</div>
		<a
			href="/admin/quests/new"
			class="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
		>
			+ Create Quest
		</a>
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

	<!-- Quests Table -->
	<div class="bg-glass rounded-xl overflow-hidden">
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-slate-900/50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Quest</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Category</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Difficulty</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">XP</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Enrollments</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Status</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-white/10">
					{#each data.quests as { quest, enrollments }}
						<tr class="hover:bg-white/5">
							<td class="px-6 py-4">
								<div>
									<p class="font-medium text-white">{quest.title}</p>
									<p class="text-sm text-slate-400 line-clamp-1">{quest.description}</p>
								</div>
							</td>
							<td class="px-6 py-4">
								<span class="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded">
									{quest.category}
								</span>
							</td>
							<td class="px-6 py-4">
								<span class="px-2 py-1 {getDifficultyColor(quest.difficulty)} text-xs rounded capitalize">
									{quest.difficulty}
								</span>
							</td>
							<td class="px-6 py-4 text-white">
								{quest.xpReward}
							</td>
							<td class="px-6 py-4 text-white">
								{enrollments}
							</td>
							<td class="px-6 py-4">
								{#if quest.isPublished}
									<span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
										Published
									</span>
								{:else}
									<span class="px-2 py-1 bg-slate-500/20 text-slate-400 text-xs rounded">
										Draft
									</span>
								{/if}
							</td>
							<td class="px-6 py-4">
								<div class="flex items-center space-x-2">
									<a
										href="/admin/quests/{quest.id}/edit"
										class="text-primary-400 hover:text-primary-300 text-sm font-medium"
									>
										Edit
									</a>
									<form method="POST" action="?/togglePublish" use:enhance>
										<input type="hidden" name="questId" value={quest.id} />
										<input type="hidden" name="isPublished" value={quest.isPublished} />
										<button
											type="submit"
											class="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
										>
											{quest.isPublished ? 'Unpublish' : 'Publish'}
										</button>
									</form>
									{#if enrollments === 0}
										<form
											method="POST"
											action="?/delete"
											use:enhance
											onsubmit={(e) => {
												if (!confirm('Are you sure you want to delete this quest?')) {
													e.preventDefault();
												}
											}}
										>
											<input type="hidden" name="questId" value={quest.id} />
											<button
												type="submit"
												class="text-red-400 hover:text-red-300 text-sm font-medium"
											>
												Delete
											</button>
										</form>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

