<script lang="ts">
	let selectedRole = $state('developer');
	let currentTask = $state<any>(null);
	let taskProgress = $state(0);

	const roles = [
		{ id: 'developer', name: 'Software Developer', icon: '💻', tasks: 45 },
		{ id: 'designer', name: 'UI/UX Designer', icon: '🎨', tasks: 32 },
		{ id: 'manager', name: 'Project Manager', icon: '📊', tasks: 28 },
		{ id: 'marketer', name: 'Digital Marketer', icon: '📈', tasks: 38 }
	];

	const sampleTasks = {
		developer: {
			title: 'Build a React Component Library',
			description: 'Create reusable UI components with TypeScript and Storybook documentation.',
			skills: ['React', 'TypeScript', 'CSS', 'Testing'],
			duration: '2-3 hours',
			difficulty: 'Intermediate'
		},
		designer: {
			title: 'Design a Mobile App Interface',
			description: 'Create wireframes and high-fidelity mockups for a fitness tracking app.',
			skills: ['Figma', 'UI Design', 'Mobile UX', 'Prototyping'],
			duration: '3-4 hours',
			difficulty: 'Intermediate'
		},
		manager: {
			title: 'Plan a Product Launch',
			description: 'Create project timeline, resource allocation, and risk management plan.',
			skills: ['Project Planning', 'Risk Management', 'Team Coordination', 'Agile'],
			duration: '2-3 hours',
			difficulty: 'Advanced'
		},
		marketer: {
			title: 'Create a Social Media Campaign',
			description: 'Develop content strategy and campaign materials for a product launch.',
			skills: ['Content Strategy', 'Social Media', 'Analytics', 'Copywriting'],
			duration: '2-3 hours',
			difficulty: 'Intermediate'
		}
	};

	function startTask() {
		currentTask = sampleTasks[selectedRole as keyof typeof sampleTasks];
		taskProgress = 0;

		// Simulate task progress
		const interval = setInterval(() => {
			taskProgress += Math.random() * 10;
			if (taskProgress >= 100) {
				taskProgress = 100;
				clearInterval(interval);
			}
		}, 500);
	}
</script>

<svelte:head>
	<title>WorkFree - Immersive Training Platform</title>
</svelte:head>

<div class="platform">
	<header class="hero">
		<h1>🎯 WorkFree</h1>
		<p>Immersive Training & Skills Assessment Platform</p>
		<div class="hero-subtitle">
			Replace traditional CVs with real skill demonstrations
		</div>
	</header>

	<div class="role-selector">
		<h2>Choose Your Career Path</h2>
		<div class="roles-grid">
			{#each roles as role}
				<button
					class="role-card {selectedRole === role.id ? 'selected' : ''}"
					onclick={() => selectedRole = role.id}
				>
					<div class="role-icon">{role.icon}</div>
					<div class="role-name">{role.name}</div>
					<div class="role-tasks">{role.tasks} tasks available</div>
				</button>
			{/each}
		</div>
	</div>

	{#if !currentTask}
		<div class="task-preview">
			<h2>Next Challenge</h2>
			<div class="preview-card">
				<h3>{sampleTasks[selectedRole as keyof typeof sampleTasks].title}</h3>
				<p>{sampleTasks[selectedRole as keyof typeof sampleTasks].description}</p>

				<div class="task-meta">
					<div class="meta-item">
						<span class="meta-label">Duration:</span>
						<span class="meta-value">{sampleTasks[selectedRole as keyof typeof sampleTasks].duration}</span>
					</div>
					<div class="meta-item">
						<span class="meta-label">Difficulty:</span>
						<span class="meta-value">{sampleTasks[selectedRole as keyof typeof sampleTasks].difficulty}</span>
					</div>
				</div>

				<div class="skills-required">
					<h4>Skills Required:</h4>
					<div class="skills-list">
						{#each sampleTasks[selectedRole as keyof typeof sampleTasks].skills as skill}
							<span class="skill-tag">{skill}</span>
						{/each}
					</div>
				</div>

				<button class="start-btn" onclick={startTask}>Start Challenge</button>
			</div>
		</div>
	{:else}
		<div class="task-simulation">
			<h2>🚀 Task in Progress</h2>
			<div class="simulation-card">
				<h3>{currentTask.title}</h3>
				<div class="progress-section">
					<div class="progress-label">Progress: {Math.round(taskProgress)}%</div>
					<div class="progress-bar">
						<div class="progress-fill" style="width: {taskProgress}%"></div>
					</div>
				</div>

				{#if taskProgress >= 100}
					<div class="completion-message">
						<div class="completion-icon">🎉</div>
						<div class="completion-text">Task Completed!</div>
						<div class="completion-score">Score: 87/100</div>
						<button class="next-btn" onclick={() => currentTask = null}>Next Challenge</button>
					</div>
				{:else}
					<div class="simulation-content">
						<p>Simulating real work environment...</p>
						<div class="simulation-steps">
							<div class="step {taskProgress > 20 ? 'completed' : 'active'}">📋 Planning</div>
							<div class="step {taskProgress > 50 ? 'completed' : taskProgress > 20 ? 'active' : ''}">⚙️ Implementation</div>
							<div class="step {taskProgress > 80 ? 'completed' : taskProgress > 50 ? 'active' : ''}">🧪 Testing</div>
							<div class="step {taskProgress > 95 ? 'completed' : taskProgress > 80 ? 'active' : ''}">✅ Review</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		min-height: 100vh;
	}

	.platform {
		max-width: 1000px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		margin-bottom: 3rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.hero p {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		opacity: 0.9;
	}

	.hero-subtitle {
		font-size: 1rem;
		opacity: 0.7;
	}

	.role-selector h2,
	.task-preview h2,
	.task-simulation h2 {
		margin-bottom: 1.5rem;
		font-size: 1.5rem;
		text-align: center;
	}

	.roles-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.role-card {
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.3s;
		text-align: center;
		color: white;
	}

	.role-card:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.role-card.selected {
		border-color: #60a5fa;
		background: rgba(96, 165, 250, 0.2);
	}

	.role-icon {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.role-name {
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.role-tasks {
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.preview-card,
	.simulation-card {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		padding: 2rem;
		backdrop-filter: blur(10px);
	}

	.preview-card h3,
	.simulation-card h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.preview-card p {
		opacity: 0.9;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.task-meta {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.meta-item {
		display: flex;
		justify-content: space-between;
	}

	.meta-label {
		opacity: 0.8;
	}

	.meta-value {
		font-weight: 600;
	}

	.skills-required h4 {
		margin-bottom: 0.75rem;
		font-size: 1rem;
	}

	.skills-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.skill-tag {
		background: rgba(96, 165, 250, 0.3);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.start-btn,
	.next-btn {
		background: #10b981;
		color: white;
		border: none;
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		border-radius: 0.75rem;
		cursor: pointer;
		transition: background-color 0.2s;
		width: 100%;
	}

	.start-btn:hover,
	.next-btn:hover {
		background: #059669;
	}

	.progress-section {
		margin-bottom: 2rem;
	}

	.progress-label {
		margin-bottom: 0.5rem;
		font-weight: 600;
	}

	.progress-bar {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 9999px;
		height: 0.75rem;
		overflow: hidden;
	}

	.progress-fill {
		background: #10b981;
		height: 100%;
		transition: width 0.3s ease;
	}

	.completion-message {
		text-align: center;
	}

	.completion-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.completion-text {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.completion-score {
		font-size: 1.25rem;
		color: #60a5fa;
		margin-bottom: 2rem;
	}

	.simulation-content p {
		text-align: center;
		opacity: 0.9;
		margin-bottom: 2rem;
	}

	.simulation-steps {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.step {
		flex: 1;
		text-align: center;
		padding: 1rem;
		border-radius: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		opacity: 0.5;
		transition: all 0.3s;
	}

	.step.active {
		opacity: 1;
		background: rgba(96, 165, 250, 0.3);
	}

	.step.completed {
		opacity: 1;
		background: rgba(16, 185, 129, 0.3);
	}

	@media (max-width: 768px) {
		.roles-grid {
			grid-template-columns: 1fr;
		}

		.task-meta {
			grid-template-columns: 1fr;
		}

		.simulation-steps {
			flex-direction: column;
		}
	}
</style>
