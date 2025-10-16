import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/product');
	});

	test('should load successfully', async ({ page }) => {
		await expect(page).toHaveTitle(/WorkFree Product/);
	});

	test('should display page header', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Immersive Learning Environment/i })).toBeVisible();
	});

	test('should display 3D scene container', async ({ page }) => {
		const sceneContainer = page.locator('.min-h-\\[600px\\]');
		await expect(sceneContainer).toBeVisible();
	});

	test('should display all 4 quests', async ({ page }) => {
		await expect(page.getByText(/Build a Full-Stack Web Application/i)).toBeVisible();
		await expect(page.getByText(/Design a Mobile App Interface/i)).toBeVisible();
		await expect(page.getByText(/Analyze Data with Machine Learning/i)).toBeVisible();
		await expect(page.getByText(/Deploy with CI\/CD Pipeline/i)).toBeVisible();
	});

	test('should display quest details', async ({ page }) => {
		// Check for difficulty levels
		await expect(page.getByText(/Intermediate/i).first()).toBeVisible();
		await expect(page.getByText(/Beginner/i)).toBeVisible();
		await expect(page.getByText(/Advanced/i)).toBeVisible();

		// Check for XP values
		await expect(page.getByText(/\+500 XP/i)).toBeVisible();
		await expect(page.getByText(/\+350 XP/i)).toBeVisible();
		await expect(page.getByText(/\+750 XP/i)).toBeVisible();
		await expect(page.getByText(/\+600 XP/i)).toBeVisible();
	});

	test('should display achievements section', async ({ page }) => {
		await expect(page.getByRole('heading', { name: /Your Achievements/i })).toBeVisible();
		await expect(page.getByText(/First Steps/i)).toBeVisible();
		await expect(page.getByText(/Speed Demon/i)).toBeVisible();
		await expect(page.getByText(/Perfectionist/i)).toBeVisible();
	});

	test('should start quest when clicked', async ({ page }) => {
		// Click on first quest
		const firstQuest = page.getByText(/Build a Full-Stack Web Application/i).first();
		await firstQuest.click();

		// Should show quest in progress
		await expect(page.getByText(/Quest Progress/i)).toBeVisible({ timeout: 5000 });
		await expect(page.getByText(/Current Task/i)).toBeVisible();
	});

	test('should show progress bar in quest', async ({ page }) => {
		// Start a quest
		await page.getByText(/Build a Full-Stack Web Application/i).first().click();

		// Check for progress bar
		const progressBar = page.locator('.bg-gradient-to-r').first();
		await expect(progressBar).toBeVisible();
	});

	test('should have back button in quest', async ({ page }) => {
		// Start a quest
		await page.getByText(/Build a Full-Stack Web Application/i).first().click();

		// Check for back button
		const backButton = page.getByRole('button', { name: /Back to Quests/i });
		await expect(backButton).toBeVisible();

		// Click back button
		await backButton.click();

		// Should return to quest selection
		await expect(page.getByRole('heading', { name: /Choose Your Quest/i })).toBeVisible();
	});

	test('should be responsive on mobile', async ({ page, viewport }) => {
		if (viewport && viewport.width < 768) {
			// Quests should stack vertically
			const quests = page.locator('.grid-cols-1');
			await expect(quests.first()).toBeVisible();
		}
	});

	test('should have no console errors', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		await page.goto('/product');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});
});

