<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	
	let { data, form }: { data: PageData; form: ActionData } = $props();
	
	let currentStep = $state(data.progress?.currentStep || 0);
	let isSubmitting = $state(false);
	
	const content = data.quest.content as any;
	const steps = content?.steps || [];
	const totalSteps = steps.length;
	
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
	
	function nextStep() {
		if (currentStep < totalSteps - 1) {
			currentStep++;
			updateProgress();
		}
	}
	
	function prevStep() {
		if (currentStep > 0) {
			currentStep--;
			updateProgress();
		}
	}
	
	function updateProgress() {
		const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);
		const formData = new FormData();
		formData.append('currentStep', currentStep.toString());
		formData.append('progressPercentage', progressPercentage.toString());
		
		fetch(`?/updateProgress`, {
			method: 'POST',
			body: formData
		});
	}
</script>

<div class="max-w-4xl mx-auto space-y-8">
	<!-- Back Button -->
	<a
		href="/quests"
		class="inline-flex items-center text-slate-400 hover:text-white transition-colors"
	>
		<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		Back to Quests
	</a>

	<!-- Quest Header -->
	<div class="bg-glass rounded-2xl p-8">
		<div class="flex items-start justify-between mb-6">
			<div class="flex-1">
				<h1 class="text-4xl font-bold text-gradient mb-4">{data.quest.title}</h1>
				<p class="text-lg text-slate-300 mb-6">{data.quest.description}</p>
				
				<div class="flex flex-wrap gap-3">
					<span class="px-4 py-2 rounded-full text-sm font-medium {getDifficultyColor(data.quest.difficulty)}">
						{data.quest.difficulty}
					</span>
					<span class="px-4 py-2 rounded-full text-sm font-medium bg-primary-500/20 text-primary-400">
						{data.quest.category}
					</span>
					<span class="px-4 py-2 rounded-full text-sm font-medium bg-slate-700 text-slate-300">
						<svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						{data.quest.durationMinutes || 30} min
					</span>
					<span class="px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400">
						<svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						{data.quest.xpReward} XP
					</span>
				</div>
			</div>
		</div>

		<!-- Progress Bar -->
		{#if data.progress}
			<div class="mb-6">
				<div class="flex items-center justify-between mb-2">
					<span class="text-sm font-medium text-slate-300">Progress</span>
					<span class="text-sm font-medium text-primary-400">{data.progress.progressPercentage}%</span>
				</div>
				<div class="w-full bg-slate-700 rounded-full h-3">
					<div
						class="bg-gradient-to-r from-primary-500 to-purple-500 h-3 rounded-full transition-all duration-300"
						style="width: {data.progress.progressPercentage}%"
					></div>
				</div>
			</div>
		{/if}

		<!-- Start Quest Button -->
		{#if !data.progress}
			<form method="POST" action="?/start" use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}>
				<button
					type="submit"
					disabled={isSubmitting}
					class="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					{isSubmitting ? 'Starting...' : 'Start Quest'}
				</button>
			</form>
		{/if}
	</div>

	<!-- Quest Content -->
	{#if data.progress && data.progress.status === 'in_progress'}
		<div class="bg-glass rounded-2xl p-8">
			<div class="mb-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-2xl font-bold text-white">
						Step {currentStep + 1} of {totalSteps}
					</h2>
					<span class="text-sm text-slate-400">
						{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
					</span>
				</div>
				<div class="w-full bg-slate-700 rounded-full h-2">
					<div
						class="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full transition-all duration-300"
						style="width: {((currentStep + 1) / totalSteps) * 100}%"
					></div>
				</div>
			</div>

			<!-- Step Content -->
			{#if steps[currentStep]}
				<div class="prose prose-invert max-w-none mb-8">
					<h3 class="text-xl font-semibold text-white mb-4">{steps[currentStep].title}</h3>
					<div class="text-slate-300 space-y-4">
						{@html steps[currentStep].content || '<p>No content available</p>'}
					</div>
				</div>
			{/if}

			<!-- Navigation -->
			<div class="flex items-center justify-between">
				<button
					onclick={prevStep}
					disabled={currentStep === 0}
					class="px-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
				>
					Previous
				</button>

				{#if currentStep === totalSteps - 1}
					<form method="POST" action="?/complete" use:enhance>
						<button
							type="submit"
							class="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
						>
							Complete Quest
						</button>
					</form>
				{:else}
					<button
						onclick={nextStep}
						class="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
					>
						Next Step
					</button>
				{/if}
			</div>
		</div>
	{/if}

	<!-- Completed State -->
	{#if data.progress && data.progress.status === 'completed'}
		<div class="bg-glass rounded-2xl p-12 text-center">
			<div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
				<svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h2 class="text-3xl font-bold text-white mb-4">Quest Completed!</h2>
			<p class="text-lg text-slate-300 mb-8">
				You earned {data.quest.xpReward} XP
			</p>
			<div class="flex items-center justify-center space-x-4">
				<a
					href="/quests"
					class="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
				>
					Browse More Quests
				</a>
				<a
					href="/dashboard"
					class="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200"
				>
					Go to Dashboard
				</a>
			</div>
		</div>
	{/if}
</div>

