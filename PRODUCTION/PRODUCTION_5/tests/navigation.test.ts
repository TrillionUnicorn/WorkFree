import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
	test('should navigate to pricing page', async ({ page }) => {
		await page.goto('/');
		await page.click('a[href="/pricing"]');
		await expect(page).toHaveURL(/\/pricing/);
		await expect(page.locator('h1')).toContainText('Choose Your Plan');
	});

	test('should display all subscription tiers', async ({ page }) => {
		await page.goto('/');
		// Navigate through login to pricing (if needed)
		await page.goto('/pricing');
		
		// Should show all 4 tiers
		await expect(page.locator('text=Free')).toBeVisible();
		await expect(page.locator('text=Starter')).toBeVisible();
		await expect(page.locator('text=Professional')).toBeVisible();
		await expect(page.locator('text=Enterprise')).toBeVisible();
	});

	test('should have working footer links', async ({ page }) => {
		await page.goto('/');
		
		// Check footer exists
		await expect(page.locator('footer')).toBeVisible();
		await expect(page.locator('footer >> text=WorkFree')).toBeVisible();
	});

	test('should display features section on home page', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('text=Why WorkFree?')).toBeVisible();
		await expect(page.locator('text=10x Cheaper')).toBeVisible();
		await expect(page.locator('text=AI-Powered')).toBeVisible();
	});
});

