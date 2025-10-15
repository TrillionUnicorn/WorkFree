import { test, expect } from '@playwright/test';

test.describe('Pitch Deck Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/pitch');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/WorkFree Pitch Deck/);
	});

	test('should display page header', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Investment Opportunity/i })).toBeVisible();
	});

	test('should display problem section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /The \$366B Problem/i })).toBeVisible();
		await expect(page.getByText(/\$366B/i)).toBeVisible();
		await expect(page.getByText(/70%/i)).toBeVisible();
	});

	test('should display market analysis section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Market Analysis/i })).toBeVisible();
		await expect(page.getByText(/\$31B/i)).toBeVisible();
		await expect(page.getByText(/2\.8B/i)).toBeVisible();
	});

	test('should display charts', async ({ page }) => {
		// Wait for charts to render
		await page.waitForTimeout(2000);
		
		// Check for canvas elements (Chart.js renders to canvas)
		const canvases = page.locator('canvas');
		const count = await canvases.count();
		expect(count).toBeGreaterThan(0);
	});

	test('should display competitive landscape', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Competitive Landscape/i })).toBeVisible();
		await expect(page.getByText(/STRIVR/i)).toBeVisible();
		await expect(page.getByText(/Talespin/i)).toBeVisible();
		await expect(page.getByText(/Mursion/i)).toBeVisible();
	});

	test('should display competitive advantages table', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Our Competitive Advantages/i })).toBeVisible();
		await expect(page.getByText(/AI Personalization/i)).toBeVisible();
		await expect(page.getByText(/Industry Coverage/i)).toBeVisible();
	});

	test('should display business model section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Business Model/i })).toBeVisible();
		await expect(page.getByText(/Revenue Streams/i)).toBeVisible();
		await expect(page.getByText(/Unit Economics/i)).toBeVisible();
	});

	test('should display traction metrics', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Traction & Metrics/i })).toBeVisible();
		await expect(page.getByText(/250\+/i)).toBeVisible();
		await expect(page.getByText(/Beta Users/i)).toBeVisible();
	});

	test('should display investment ask', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Investment Ask/i })).toBeVisible();
		await expect(page.getByText(/\$5M/i)).toBeVisible();
		await expect(page.getByText(/Series A Funding/i)).toBeVisible();
	});

	test('should display roadmap', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Product Roadmap/i })).toBeVisible();
		await expect(page.getByText(/Q4 2024/i)).toBeVisible();
		await expect(page.getByText(/Q1-Q2 2025/i)).toBeVisible();
	});

	test('should have CTA buttons', async ({ page }) => {
		const downloadBtn = page.getByRole('button', { name: /Download Full Deck/i }).first();
		const scheduleBtn = page.getByRole('button', { name: /Schedule Meeting/i }).first();

		await expect(downloadBtn).toBeVisible();
		await expect(scheduleBtn).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Charts should be visible on mobile
			await page.waitForTimeout(2000);
			const canvases = page.locator('canvas');
			await expect(canvases.first()).toBeVisible();
		}
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		await page.goto('/pitch');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});
});

