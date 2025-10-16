import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
	test('should display registration page', async ({ page }) => {
		await page.goto('/register');
		await expect(page.locator('h1')).toContainText('Create Account');
		await expect(page.locator('input[name="email"]')).toBeVisible();
		await expect(page.locator('input[name="password"]')).toBeVisible();
		await expect(page.locator('input[name="fullName"]')).toBeVisible();
	});

	test('should display login page', async ({ page }) => {
		await page.goto('/login');
		await expect(page.locator('h1')).toContainText('Welcome Back');
		await expect(page.locator('input[name="email"]')).toBeVisible();
		await expect(page.locator('input[name="password"]')).toBeVisible();
	});

	test('should show validation errors on empty registration', async ({ page }) => {
		await page.goto('/register');
		await page.click('button[type="submit"]');
		
		// HTML5 validation should prevent submission
		const emailInput = page.locator('input[name="email"]');
		await expect(emailInput).toHaveAttribute('required');
	});

	test('should redirect to login after visiting root when not authenticated', async ({ page }) => {
		await page.goto('/dashboard');
		await expect(page).toHaveURL(/\/login/);
	});

	test('should display home page for unauthenticated users', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('h1')).toContainText('Democratizing VR Training');
		await expect(page.locator('a[href="/register"]')).toBeVisible();
		await expect(page.locator('a[href="/login"]')).toBeVisible();
	});
});

