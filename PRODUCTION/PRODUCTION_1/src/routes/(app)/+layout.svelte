<script lang="ts">
	import type { LayoutData } from './$types';
	
	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<div class="min-h-screen">
	<!-- Navigation -->
	<nav class="bg-glass border-b border-white/10">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<a href="/dashboard" class="text-2xl font-bold text-gradient">
						WorkFree
					</a>
					<div class="hidden md:flex ml-10 space-x-8">
						<a href="/dashboard" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
							Dashboard
						</a>
						<a href="/quests" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
							Quests
						</a>
						<a href="/achievements" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
							Achievements
						</a>
						<a href="/leaderboard" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
							Leaderboard
						</a>
					</div>
				</div>
				<div class="flex items-center space-x-4">
					<span class="text-sm text-slate-400">
						{data.user.email}
					</span>
					<form method="POST" action="/logout">
						<button
							type="submit"
							class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
						>
							Logout
						</button>
					</form>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>
</div>

