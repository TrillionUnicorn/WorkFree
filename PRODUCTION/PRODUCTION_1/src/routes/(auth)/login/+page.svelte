<script lang="ts">
	import type { ActionData } from './$types';
	
	let { form }: { form: ActionData } = $props();
</script>

<div class="min-h-screen flex items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="bg-glass rounded-2xl p-8 shadow-2xl">
			<h1 class="text-3xl font-bold text-gradient mb-2">Welcome Back</h1>
			<p class="text-slate-400 mb-8">Sign in to continue your learning journey</p>

			{#if form?.message}
				<div class="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
					{form.message}
				</div>
			{/if}

			<form method="POST" class="space-y-6">
				<div>
					<label for="email" class="block text-sm font-medium text-slate-300 mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
						placeholder="john@example.com"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-slate-300 mb-2">
						Password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
						placeholder="••••••••"
					/>
				</div>

				<div class="flex items-center justify-between">
					<label class="flex items-center">
						<input type="checkbox" class="rounded border-slate-700 text-primary-600 focus:ring-primary-500" />
						<span class="ml-2 text-sm text-slate-400">Remember me</span>
					</label>
					<a href="/forgot-password" class="text-sm text-primary-400 hover:text-primary-300">
						Forgot password?
					</a>
				</div>

				<button
					type="submit"
					class="w-full bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
				>
					Sign In
				</button>
			</form>

			<p class="text-center text-slate-400 mt-6">
				Don't have an account?
				<a href="/register" class="text-primary-400 hover:text-primary-300 font-medium">
					Create one
				</a>
			</p>
		</div>
	</div>
</div>

