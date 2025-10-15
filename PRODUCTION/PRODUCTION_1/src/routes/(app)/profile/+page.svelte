<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	
	let { data, form }: { data: PageData; form: ActionData } = $props();
	
	let isEditingProfile = $state(false);
	let isEditingEmail = $state(false);
	
	function formatDate(date: Date | null) {
		if (!date) return 'Never';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	function getSubscriptionBadge(tier: string) {
		switch (tier) {
			case 'free':
				return { text: 'Free', color: 'bg-slate-500/20 text-slate-400' };
			case 'starter':
				return { text: 'Starter', color: 'bg-blue-500/20 text-blue-400' };
			case 'professional':
				return { text: 'Professional', color: 'bg-purple-500/20 text-purple-400' };
			case 'enterprise':
				return { text: 'Enterprise', color: 'bg-yellow-500/20 text-yellow-400' };
			default:
				return { text: tier, color: 'bg-slate-500/20 text-slate-400' };
		}
	}
</script>

<div class="max-w-4xl mx-auto space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-4xl font-bold text-gradient mb-2">Profile</h1>
		<p class="text-slate-400">Manage your account settings and view your progress</p>
	</div>

	<!-- Success/Error Messages -->
	{#if form?.success}
		<div class="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg">
			{form.message}
		</div>
	{:else if form?.message}
		<div class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
			{form.message}
		</div>
	{/if}

	<!-- Profile Card -->
	<div class="bg-glass rounded-2xl p-8">
		<div class="flex items-start justify-between mb-6">
			<div class="flex items-center space-x-4">
				<div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold text-white">
					{data.user.fullName?.charAt(0) || data.user.email.charAt(0).toUpperCase()}
				</div>
				<div>
					<h2 class="text-2xl font-bold text-white">{data.user.fullName || 'User'}</h2>
					<p class="text-slate-400">{data.user.email}</p>
					<div class="flex items-center space-x-2 mt-2">
						<span class="px-3 py-1 rounded-full text-xs font-medium {getSubscriptionBadge(data.user.subscriptionTier).color}">
							{getSubscriptionBadge(data.user.subscriptionTier).text}
						</span>
						{#if data.user.emailVerified}
							<span class="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
								✓ Verified
							</span>
						{:else}
							<span class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
								⚠ Unverified
							</span>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
			<div class="bg-slate-900/50 rounded-lg p-4">
				<p class="text-sm text-slate-400 mb-1">Total XP</p>
				<p class="text-2xl font-bold text-gradient">{data.stats.totalXP}</p>
			</div>
			<div class="bg-slate-900/50 rounded-lg p-4">
				<p class="text-sm text-slate-400 mb-1">Completed</p>
				<p class="text-2xl font-bold text-white">{data.stats.completedQuests}</p>
			</div>
			<div class="bg-slate-900/50 rounded-lg p-4">
				<p class="text-sm text-slate-400 mb-1">In Progress</p>
				<p class="text-2xl font-bold text-white">{data.stats.inProgressQuests}</p>
			</div>
			<div class="bg-slate-900/50 rounded-lg p-4">
				<p class="text-sm text-slate-400 mb-1">Achievements</p>
				<p class="text-2xl font-bold text-white">{data.stats.achievements}</p>
			</div>
		</div>

		<!-- Account Info -->
		<div class="space-y-4 pt-6 border-t border-white/10">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-sm text-slate-400">Member Since</p>
					<p class="text-white">{formatDate(data.user.createdAt)}</p>
				</div>
				<div>
					<p class="text-sm text-slate-400">Last Login</p>
					<p class="text-white">{formatDate(data.user.lastLoginAt)}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Edit Profile -->
	<div class="bg-glass rounded-2xl p-8">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-xl font-bold text-white">Personal Information</h3>
			<button
				onclick={() => (isEditingProfile = !isEditingProfile)}
				class="text-primary-400 hover:text-primary-300 font-medium"
			>
				{isEditingProfile ? 'Cancel' : 'Edit'}
			</button>
		</div>

		{#if isEditingProfile}
			<form method="POST" action="?/updateProfile" use:enhance class="space-y-4">
				<div>
					<label for="fullName" class="block text-sm font-medium text-slate-300 mb-2">
						Full Name
					</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={data.user.fullName || ''}
						required
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
					/>
				</div>
				<button
					type="submit"
					class="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
				>
					Save Changes
				</button>
			</form>
		{:else}
			<div class="space-y-4">
				<div>
					<p class="text-sm text-slate-400">Full Name</p>
					<p class="text-white">{data.user.fullName || 'Not set'}</p>
				</div>
			</div>
		{/if}
	</div>

	<!-- Edit Email -->
	<div class="bg-glass rounded-2xl p-8">
		<div class="flex items-center justify-between mb-6">
			<h3 class="text-xl font-bold text-white">Email Address</h3>
			<button
				onclick={() => (isEditingEmail = !isEditingEmail)}
				class="text-primary-400 hover:text-primary-300 font-medium"
			>
				{isEditingEmail ? 'Cancel' : 'Change'}
			</button>
		</div>

		{#if isEditingEmail}
			<form method="POST" action="?/updateEmail" use:enhance class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium text-slate-300 mb-2">
						New Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={data.user.email}
						required
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
					/>
					<p class="text-xs text-slate-500 mt-1">
						You will need to verify your new email address
					</p>
				</div>
				<button
					type="submit"
					class="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
				>
					Update Email
				</button>
			</form>
		{:else}
			<div>
				<p class="text-sm text-slate-400">Current Email</p>
				<p class="text-white">{data.user.email}</p>
			</div>
		{/if}
	</div>

	<!-- Recent Activity -->
	<div class="bg-glass rounded-2xl p-8">
		<h3 class="text-xl font-bold text-white mb-6">Recent Activity</h3>
		
		{#if data.recentActivity.length === 0}
			<p class="text-slate-400 text-center py-8">No activity yet</p>
		{:else}
			<div class="space-y-3">
				{#each data.recentActivity as { progress, quest }}
					<div class="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
						<div class="flex-1">
							<h4 class="font-semibold text-white">{quest?.title || 'Unknown Quest'}</h4>
							<p class="text-sm text-slate-400">
								{progress.status === 'completed' ? 'Completed' : 'In Progress'} • 
								{formatDate(progress.startedAt)}
							</p>
						</div>
						<div class="text-right">
							<p class="text-sm font-medium text-white">{progress.progressPercentage}%</p>
							{#if progress.status === 'completed'}
								<p class="text-xs text-green-400">+{quest?.xpReward || 0} XP</p>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Danger Zone -->
	<div class="bg-red-500/10 border border-red-500/50 rounded-2xl p-8">
		<h3 class="text-xl font-bold text-red-400 mb-4">Danger Zone</h3>
		<p class="text-slate-300 mb-4">
			Once you delete your account, there is no going back. Please be certain.
		</p>
		<button
			class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
			onclick={() => {
				if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
					alert('Account deletion would be implemented here');
				}
			}}
		>
			Delete Account
		</button>
	</div>
</div>

