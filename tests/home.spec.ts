import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/WorkFree/);
	});

	test('should display hero section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Transform Training/i })).toBeVisible();
		await expect(page.getByText(/The world's most advanced training simulation platform/i)).toBeVisible();
	});

	test('should have working CTAs in hero', async ({ page }) => {
		const startTrialBtn = page.getByRole('button', { name: /Start Free Trial/i }).first();
		const watchDemoBtn = page.getByRole('button', { name: /Watch Demo/i }).first();
		
		await expect(startTrialBtn).toBeVisible();
		await expect(watchDemoBtn).toBeVisible();
	});

	test('should display trust indicators', async ({ page }) => {
		await expect(page.getByText(/1,000\+ Companies/i)).toBeVisible();
		await expect(page.getByText(/500\+ Simulations/i)).toBeVisible();
		await expect(page.getByText(/90% Retention Rate/i)).toBeVisible();
	});

	test('should display Why Us section with features', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Why Choose WorkFree/i })).toBeVisible();
		await expect(page.getByText(/Immersive VR\/AR Training/i)).toBeVisible();
		await expect(page.getByText(/AI-Powered Personalization/i)).toBeVisible();
		await expect(page.getByText(/Risk-Free Practice/i)).toBeVisible();
	});

	test('should display How It Works section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /How It Works/i })).toBeVisible();
		await expect(page.getByText(/Choose Your Training/i)).toBeVisible();
		await expect(page.getByText(/Immerse & Learn/i)).toBeVisible();
		await expect(page.getByText(/Track & Improve/i)).toBeVisible();
	});

	test('should display pricing section with 3 tiers', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Simple, Transparent Pricing/i })).toBeVisible();
		await expect(page.getByText(/Starter/i)).toBeVisible();
		await expect(page.getByText(/Professional/i)).toBeVisible();
		await expect(page.getByText(/Enterprise/i)).toBeVisible();
	});

	test('should display mission and vision section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Our Mission/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Our Vision/i })).toBeVisible();
	});

	test('should have working waitlist form', async ({ page }) => {
		const emailInput = page.getByPlaceholder(/Enter your email/i);
		const submitBtn = page.getByRole('button', { name: /Join Waitlist/i }).last();

		await expect(emailInput).toBeVisible();
		await expect(submitBtn).toBeVisible();

		// Test form submission
		await emailInput.fill('test@example.com');
		await submitBtn.click();

		// Wait for success message
		await expect(page.getByText(/Success/i)).toBeVisible({ timeout: 5000 });
	});

	test('should have working navigation', async ({ page }) => {
		await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Product' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Pitch Deck' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
	});

	test('should have working footer', async ({ page }) => {
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await expect(page.getByText(/WorkFree. All rights reserved/i)).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Check mobile menu button exists
			const menuButton = page.getByRole('button', { name: /Toggle menu/i });
			await expect(menuButton).toBeVisible();
		}
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});

	test('should have proper meta tags', async ({ page }) => {
		const title = await page.title();
		expect(title).toContain('WorkFree');

		const description = await page.locator('meta[name="description"]').getAttribute('content');
		expect(description).toBeTruthy();
	});
});

