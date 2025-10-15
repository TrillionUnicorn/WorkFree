import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/contact');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/Contact WorkFree/);
	});

	test('should display page header', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();
	});

	test('should display contact form', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Send us a Message/i })).toBeVisible();
		await expect(page.getByPlaceholder(/John Doe/i)).toBeVisible();
		await expect(page.getByPlaceholder(/john@company.com/i)).toBeVisible();
		await expect(page.getByPlaceholder(/Tell us about your training needs/i)).toBeVisible();
	});

	test('should validate required fields', async ({ page }) => {
		const submitBtn = page.getByRole('button', { name: /Send Message/i });
		await submitBtn.click();

		// Form should show validation errors
		await expect(page.getByText(/Name is required/i)).toBeVisible({ timeout: 2000 });
	});

	test('should validate email format', async ({ page }) => {
		const nameInput = page.getByPlaceholder(/John Doe/i);
		const emailInput = page.getByPlaceholder(/john@company.com/i);
		const messageInput = page.getByPlaceholder(/Tell us about your training needs/i);
		const submitBtn = page.getByRole('button', { name: /Send Message/i });

		await nameInput.fill('Test User');
		await emailInput.fill('invalid-email');
		await messageInput.fill('Test message');
		await submitBtn.click();

		await expect(page.getByText(/Invalid email/i)).toBeVisible({ timeout: 2000 });
	});

	test('should submit form successfully', async ({ page }) => {
		const nameInput = page.getByPlaceholder(/John Doe/i);
		const emailInput = page.getByPlaceholder(/john@company.com/i);
		const messageInput = page.getByPlaceholder(/Tell us about your training needs/i);
		const submitBtn = page.getByRole('button', { name: /Send Message/i });

		await nameInput.fill('Test User');
		await emailInput.fill('test@example.com');
		await messageInput.fill('This is a test message');
		await submitBtn.click();

		// Wait for success message
		await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 5000 });
	});

	test('should display contact information', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Contact Information/i })).toBeVisible();
		await expect(page.getByText(/hello@workfree.com/i)).toBeVisible();
	});

	test('should display social media links', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Follow Us/i })).toBeVisible();
		await expect(page.getByText(/GitHub/i)).toBeVisible();
		await expect(page.getByText(/LinkedIn/i)).toBeVisible();
		await expect(page.getByText(/Twitter/i)).toBeVisible();
	});

	test('should display FAQ section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
		await expect(page.getByText(/What is your typical response time/i)).toBeVisible();
		await expect(page.getByText(/Do you offer demos/i)).toBeVisible();
	});

	test('should display team section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Meet the Team/i })).toBeVisible();
		await expect(page.getByText(/Hunter Ho/i)).toBeVisible();
		await expect(page.getByText(/Founder & CEO/i)).toBeVisible();
	});

	test('should have clickable social links', async ({ page }) => {
		const githubLink = page.getByRole('link', { name: /GitHub/i }).first();
		await expect(githubLink).toBeVisible();
		await expect(githubLink).toHaveAttribute('href', /.+/);
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Form should be visible and usable on mobile
			const nameInput = page.getByPlaceholder(/John Doe/i);
			await expect(nameInput).toBeVisible();
		}
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		await page.goto('/contact');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});
});

