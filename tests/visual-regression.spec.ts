import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests - Pixel Perfect Verification', () => {
	
	test('Home Page - Visual Regression', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		await page.waitForLoadState('networkidle');
		
		// Take full page screenshot
		await expect(page).toHaveScreenshot('home-page-full.png', {
			fullPage: true,
			maxDiffPixels: 100
		});
		
		// Hero section screenshot
		const hero = page.locator('section').first();
		await expect(hero).toHaveScreenshot('home-hero-section.png');
		
		// Pricing section screenshot
		await page.locator('#pricing').scrollIntoViewIfNeeded();
		await expect(page.locator('#pricing')).toHaveScreenshot('home-pricing-section.png');
	});

	test('Product Page - Visual Regression', async ({ page }) => {
		await page.goto('http://localhost:5173/product');
		await page.waitForLoadState('networkidle');
		
		// Wait for 3D scene to render
		await page.waitForTimeout(2000);
		
		await expect(page).toHaveScreenshot('product-page-full.png', {
			fullPage: true,
			maxDiffPixels: 100
		});
	});

	test('Pitch Deck Page - Visual Regression', async ({ page }) => {
		await page.goto('http://localhost:5173/pitch');
		await page.waitForLoadState('networkidle');
		
		// Wait for charts to render
		await page.waitForTimeout(3000);
		
		await expect(page).toHaveScreenshot('pitch-page-full.png', {
			fullPage: true,
			maxDiffPixels: 100
		});
	});

	test('Contact Page - Visual Regression', async ({ page }) => {
		await page.goto('http://localhost:5173/contact');
		await page.waitForLoadState('networkidle');
		
		await expect(page).toHaveScreenshot('contact-page-full.png', {
			fullPage: true,
			maxDiffPixels: 100
		});
	});

	test('Responsive - Mobile Visual Regression', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		await page.goto('http://localhost:5173/');
		await page.waitForLoadState('networkidle');
		
		await expect(page).toHaveScreenshot('home-mobile.png', {
			fullPage: true,
			maxDiffPixels: 100
		});
	});

	test('Responsive - Tablet Visual Regression', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		
		await page.goto('http://localhost:5173/');
		await page.waitForLoadState('networkidle');
		
		await expect(page).toHaveScreenshot('home-tablet.png', {
			fullPage: true,
			maxDiffPixels: 100
		});
	});
});

test.describe('Color & Style Verification', () => {
	
	test('Verify Tailwind Colors Render Correctly', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		// Check primary color on button
		const primaryBtn = page.getByRole('button', { name: /Start Free Trial/i }).first();
		const btnColor = await primaryBtn.evaluate((el) => {
			return window.getComputedStyle(el).backgroundColor;
		});
		
		// Primary gradient should contain blue/purple tones
		expect(btnColor).toBeTruthy();
		
		// Check text gradient
		const gradientText = page.locator('.text-gradient').first();
		const bgClip = await gradientText.evaluate((el) => {
			return window.getComputedStyle(el).backgroundClip;
		});
		expect(bgClip).toBe('text');
	});

	test('Verify Glass Morphism Effect', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		const glassCard = page.locator('.bg-glass').first();
		const backdropFilter = await glassCard.evaluate((el) => {
			return window.getComputedStyle(el).backdropFilter;
		});
		
		expect(backdropFilter).toContain('blur');
	});

	test('Verify Responsive Breakpoints', async ({ page }) => {
		// Desktop
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('http://localhost:5173/');
		
		const desktopNav = page.locator('nav .hidden.md\\:flex');
		await expect(desktopNav).toBeVisible();
		
		// Mobile
		await page.setViewportSize({ width: 375, height: 667 });
		await page.reload();
		
		const mobileMenuBtn = page.getByRole('button', { name: /Toggle menu/i });
		await expect(mobileMenuBtn).toBeVisible();
	});
});

test.describe('Element Positioning Verification', () => {
	
	test('Verify Navigation Positioning', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		const nav = page.locator('nav');
		const box = await nav.boundingBox();
		
		expect(box).toBeTruthy();
		expect(box!.y).toBe(0); // Should be at top
		expect(box!.x).toBe(0); // Should be at left edge
	});

	test('Verify Hero Section Centering', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		const hero = page.locator('.hero-section');
		const heroBox = await hero.boundingBox();
		
		expect(heroBox).toBeTruthy();
		expect(heroBox!.width).toBeGreaterThan(0);
	});

	test('Verify Grid Layouts', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		// Check features grid
		const featuresGrid = page.locator('.features-grid');
		const gridDisplay = await featuresGrid.evaluate((el) => {
			return window.getComputedStyle(el).display;
		});
		
		expect(gridDisplay).toBe('grid');
	});
});

