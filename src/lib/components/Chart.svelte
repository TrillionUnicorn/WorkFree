<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	interface Props {
		type: 'line' | 'bar' | 'doughnut' | 'pie' | 'radar';
		data: any;
		options?: any;
		height?: number;
	}

	let { type, data, options = {}, height = 300 }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart;

	onMount(() => {
		Chart.register(...registerables);

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const defaultOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					labels: {
						color: '#cbd5e1',
						font: {
							size: 12
						}
					}
				},
				tooltip: {
					backgroundColor: 'rgba(15, 23, 42, 0.9)',
					titleColor: '#f1f5f9',
					bodyColor: '#cbd5e1',
					borderColor: 'rgba(148, 163, 184, 0.2)',
					borderWidth: 1,
					padding: 12,
					displayColors: true,
					callbacks: {
						label: function(context: any) {
							let label = context.dataset.label || '';
							if (label) {
								label += ': ';
							}
							if (context.parsed.y !== null) {
								label += new Intl.NumberFormat('en-US', {
									style: 'currency',
									currency: 'USD',
									minimumFractionDigits: 0,
									maximumFractionDigits: 0
								}).format(context.parsed.y);
							}
							return label;
						}
					}
				}
			},
			scales: type !== 'doughnut' && type !== 'pie' && type !== 'radar' ? {
				x: {
					grid: {
						color: 'rgba(148, 163, 184, 0.1)'
					},
					ticks: {
						color: '#94a3b8'
					}
				},
				y: {
					grid: {
						color: 'rgba(148, 163, 184, 0.1)'
					},
					ticks: {
						color: '#94a3b8',
						callback: function(value: any) {
							return '$' + value.toLocaleString();
						}
					}
				}
			} : undefined,
			...options
		};

		chart = new Chart(ctx, {
			type,
			data,
			options: defaultOptions
		});

		return () => {
			chart.destroy();
		};
	});
</script>

<div style="height: {height}px; position: relative;">
	<canvas bind:this={canvas}></canvas>
</div>

