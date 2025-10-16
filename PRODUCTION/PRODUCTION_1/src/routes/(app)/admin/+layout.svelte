<script lang="ts">
	import type { LayoutData } from './$types';
	
	let { data, children }: { data: LayoutData; children: any } = $props();
</script>

<div class="min-h-screen">
	<!-- Admin Navigation -->
	<div class="bg-red-500/10 border-b border-red-500/50 mb-8">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
					<span class="text-red-400 font-semibold">Admin Panel</span>
				</div>
				<div class="flex items-center space-x-4">
					<a href="/admin" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
						Dashboard
					</a>
					<a href="/admin/quests" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
						Quests
					</a>
					<a href="/admin/users" class="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
						Users
					</a>
					<a href="/dashboard" class="text-slate-400 hover:text-white px-3 py-2 rounded-md text-sm">
						← Back to App
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Admin Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{@render children()}
	</div>
</div>

