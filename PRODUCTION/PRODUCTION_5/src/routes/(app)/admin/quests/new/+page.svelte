<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	
	let { form }: { form: ActionData } = $props();
	
	let steps = $state([
		{ title: '', content: '' }
	]);
	
	function addStep() {
		steps = [...steps, { title: '', content: '' }];
	}
	
	function removeStep(index: number) {
		steps = steps.filter((_, i) => i !== index);
	}
	
	function handleSubmit(event: SubmitEvent) {
		const formData = new FormData(event.target as HTMLFormElement);
		formData.set('steps', JSON.stringify(steps));
	}
</script>

<div class="max-w-4xl mx-auto space-y-8">
	<!-- Header -->
	<div>
		<a href="/admin/quests" class="text-primary-400 hover:text-primary-300 mb-4 inline-block">
			← Back to Quests
		</a>
		<h1 class="text-4xl font-bold text-gradient mb-2">Create New Quest</h1>
		<p class="text-slate-400">Fill in the details to create a new learning quest</p>
	</div>

	<!-- Error Message -->
	{#if form?.message}
		<div class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
			{form.message}
		</div>
	{/if}

	<!-- Quest Form -->
	<form method="POST" use:enhance onsubmit={handleSubmit} class="space-y-8">
		<!-- Basic Information -->
		<div class="bg-glass rounded-xl p-8 space-y-6">
			<h2 class="text-2xl font-bold text-white mb-4">Basic Information</h2>
			
			<div>
				<label for="title" class="block text-sm font-medium text-slate-300 mb-2">
					Quest Title *
				</label>
				<input
					type="text"
					id="title"
					name="title"
					required
					minlength="3"
					maxlength="255"
					class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
					placeholder="e.g., Introduction to Customer Service"
				/>
			</div>

			<div>
				<label for="description" class="block text-sm font-medium text-slate-300 mb-2">
					Description *
				</label>
				<textarea
					id="description"
					name="description"
					required
					minlength="10"
					rows="3"
					class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
					placeholder="Describe what learners will achieve in this quest..."
				></textarea>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label for="category" class="block text-sm font-medium text-slate-300 mb-2">
						Category *
					</label>
					<input
						type="text"
						id="category"
						name="category"
						required
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
						placeholder="e.g., Customer Service, Safety, Sales"
					/>
				</div>

				<div>
					<label for="difficulty" class="block text-sm font-medium text-slate-300 mb-2">
						Difficulty *
					</label>
					<select
						id="difficulty"
						name="difficulty"
						required
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
					>
						<option value="beginner">Beginner</option>
						<option value="intermediate">Intermediate</option>
						<option value="advanced">Advanced</option>
					</select>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label for="durationMinutes" class="block text-sm font-medium text-slate-300 mb-2">
						Duration (minutes) *
					</label>
					<input
						type="number"
						id="durationMinutes"
						name="durationMinutes"
						required
						min="1"
						max="480"
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
						placeholder="30"
					/>
				</div>

				<div>
					<label for="xpReward" class="block text-sm font-medium text-slate-300 mb-2">
						XP Reward *
					</label>
					<input
						type="number"
						id="xpReward"
						name="xpReward"
						required
						min="10"
						max="10000"
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
						placeholder="100"
					/>
				</div>
			</div>
		</div>

		<!-- Quest Steps -->
		<div class="bg-glass rounded-xl p-8 space-y-6">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-2xl font-bold text-white">Quest Steps</h2>
				<button
					type="button"
					onclick={addStep}
					class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
				>
					+ Add Step
				</button>
			</div>

			{#each steps as step, index}
				<div class="bg-slate-900/50 rounded-lg p-6 space-y-4">
					<div class="flex items-center justify-between mb-4">
						<h3 class="text-lg font-semibold text-white">Step {index + 1}</h3>
						{#if steps.length > 1}
							<button
								type="button"
								onclick={() => removeStep(index)}
								class="text-red-400 hover:text-red-300 text-sm font-medium"
							>
								Remove
							</button>
						{/if}
					</div>

					<div>
						<label for="step-title-{index}" class="block text-sm font-medium text-slate-300 mb-2">
							Step Title *
						</label>
						<input
							type="text"
							id="step-title-{index}"
							bind:value={step.title}
							required
							class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
							placeholder="e.g., Understanding Customer Needs"
						/>
					</div>

					<div>
						<label for="step-content-{index}" class="block text-sm font-medium text-slate-300 mb-2">
							Step Content *
						</label>
						<textarea
							id="step-content-{index}"
							bind:value={step.content}
							required
							rows="4"
							class="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
							placeholder="Enter the content for this step (HTML supported)..."
						></textarea>
						<p class="text-xs text-slate-500 mt-1">
							You can use HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, etc.
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Submit -->
		<div class="flex items-center justify-end space-x-4">
			<a
				href="/admin/quests"
				class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
			>
				Cancel
			</a>
			<button
				type="submit"
				class="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
			>
				Create Quest
			</button>
		</div>
	</form>
</div>

