import { test, expect } from '@playwright/test';

test.describe('COMPREHENSIVE AUDIT - ALL PAGES, ALL ELEMENTS, ALL CTAs', () => {
	
	test('HOME PAGE - Complete Audit', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		// 1. Page loads without errors
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		
		await page.waitForLoadState('networkidle');
		expect(errors).toHaveLength(0);
		
		// 2. Navigation exists and is visible
		await expect(page.locator('nav')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Product' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Pitch Deck' })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
		
		// 3. Hero section - all elements visible
		await expect(page.getByRole('heading', { name: /Transform Training/i })).toBeVisible();
		await expect(page.getByText(/The world's most advanced training simulation platform/i)).toBeVisible();
		
		// 4. Hero CTAs work
		const startTrialBtn = page.getByRole('button', { name: /Start Free Trial/i }).first();
		const watchDemoBtn = page.getByRole('button', { name: /Watch Demo/i }).first();
		await expect(startTrialBtn).toBeVisible();
		await expect(watchDemoBtn).toBeVisible();
		
		// 5. Trust indicators visible
		await expect(page.getByText(/1,000\+ Companies/i)).toBeVisible();
		await expect(page.getByText(/500\+ Simulations/i)).toBeVisible();
		await expect(page.getByText(/90% Retention Rate/i)).toBeVisible();
		await expect(page.getByText(/SOC 2 Certified/i)).toBeVisible();
		
		// 6. Why Us section - all 6 features
		await expect(page.getByText(/Immersive VR\/AR Training/i)).toBeVisible();
		await expect(page.getByText(/AI-Powered Personalization/i)).toBeVisible();
		await expect(page.getByText(/Risk-Free Practice/i)).toBeVisible();
		await expect(page.getByText(/Deep Analytics/i)).toBeVisible();
		await expect(page.getByText(/90% Retention Rate/i)).toBeVisible();
		await expect(page.getByText(/70% Cost Savings/i)).toBeVisible();
		
		// 7. How It Works - 3 steps
		await expect(page.getByText(/Choose Your Training/i)).toBeVisible();
		await expect(page.getByText(/Immerse & Learn/i)).toBeVisible();
		await expect(page.getByText(/Track & Improve/i)).toBeVisible();
		
		// 8. Pricing section - 3 tiers
		await expect(page.getByText(/Starter/i)).toBeVisible();
		await expect(page.getByText(/Professional/i)).toBeVisible();
		await expect(page.getByText(/Enterprise/i)).toBeVisible();
		await expect(page.getByText(/\$49/i)).toBeVisible();
		await expect(page.getByText(/\$249/i)).toBeVisible();
		await expect(page.getByText(/\$1,499/i)).toBeVisible();
		
		// 9. Mission & Vision section
		await expect(page.getByRole('heading', { name: /Our Mission/i })).toBeVisible();
		await expect(page.getByRole('heading', { name: /Our Vision/i })).toBeVisible();
		
		// 10. Waitlist form - test submission
		const emailInput = page.getByPlaceholder(/Enter your email/i);
		const submitBtn = page.getByRole('button', { name: /Join Waitlist/i }).last();
		
		await emailInput.fill('test@audit.com');
		await submitBtn.click();
		await expect(page.getByText(/Success/i)).toBeVisible({ timeout: 5000 });
		
		// 11. Footer visible
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await expect(page.getByText(/WorkFree. All rights reserved/i)).toBeVisible();
		
		console.log('✅ HOME PAGE: All elements verified, no errors');
	});

	test('PRODUCT PAGE - Complete Audit', async ({ page }) => {
		await page.goto('http://localhost:5173/product');
		
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		
		await page.waitForLoadState('networkidle');
		expect(errors).toHaveLength(0);
		
		// 1. Page header
		await expect(page.getByRole('heading', { name: /Immersive Learning Environment/i })).toBeVisible();
		
		// 2. 3D scene container
		const sceneContainer = page.locator('.min-h-\\[600px\\]');
		await expect(sceneContainer).toBeVisible();
		
		// 3. All 4 quests visible
		await expect(page.getByText(/Build a Full-Stack Web Application/i)).toBeVisible();
		await expect(page.getByText(/Design a Mobile App Interface/i)).toBeVisible();
		await expect(page.getByText(/Analyze Data with Machine Learning/i)).toBeVisible();
		await expect(page.getByText(/Deploy with CI\/CD Pipeline/i)).toBeVisible();
		
		// 4. Quest details
		await expect(page.getByText(/Intermediate/i).first()).toBeVisible();
		await expect(page.getByText(/Beginner/i)).toBeVisible();
		await expect(page.getByText(/Advanced/i)).toBeVisible();
		
		// 5. XP values
		await expect(page.getByText(/\+500 XP/i)).toBeVisible();
		await expect(page.getByText(/\+350 XP/i)).toBeVisible();
		await expect(page.getByText(/\+750 XP/i)).toBeVisible();
		await expect(page.getByText(/\+600 XP/i)).toBeVisible();
		
		// 6. Achievements section
		await expect(page.getByRole('heading', { name: /Your Achievements/i })).toBeVisible();
		await expect(page.getByText(/First Steps/i)).toBeVisible();
		
		// 7. Test quest interaction
		const firstQuest = page.getByText(/Build a Full-Stack Web Application/i).first();
		await firstQuest.click();
		await expect(page.getByText(/Quest Progress/i)).toBeVisible({ timeout: 5000 });
		
		// 8. Back button works
		const backBtn = page.getByRole('button', { name: /Back to Quests/i });
		await expect(backBtn).toBeVisible();
		await backBtn.click();
		await expect(page.getByRole('heading', { name: /Choose Your Quest/i })).toBeVisible();
		
		console.log('✅ PRODUCT PAGE: All elements verified, no errors');
	});

	test('PITCH DECK PAGE - Complete Audit', async ({ page }) => {
		await page.goto('http://localhost:5173/pitch');
		
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		
		await page.waitForLoadState('networkidle');
		expect(errors).toHaveLength(0);
		
		// 1. Page header
		await expect(page.getByRole('heading', { name: /Investment Opportunity/i })).toBeVisible();
		
		// 2. Problem section
		await expect(page.getByRole('heading', { name: /The \$366B Problem/i })).toBeVisible();
		await expect(page.getByText(/\$366B/i)).toBeVisible();
		
		// 3. Market analysis
		await expect(page.getByRole('heading', { name: /Market Analysis/i })).toBeVisible();
		await expect(page.getByText(/\$31B/i)).toBeVisible();
		
		// 4. Charts render (wait for them)
		await page.waitForTimeout(2000);
		const canvases = page.locator('canvas');
		const count = await canvases.count();
		expect(count).toBeGreaterThan(0);
		
		// 5. Competitive landscape
		await expect(page.getByRole('heading', { name: /Competitive Landscape/i })).toBeVisible();
		await expect(page.getByText(/STRIVR/i)).toBeVisible();
		await expect(page.getByText(/Talespin/i)).toBeVisible();
		await expect(page.getByText(/Mursion/i)).toBeVisible();
		
		// 6. Business model
		await expect(page.getByRole('heading', { name: /Business Model/i })).toBeVisible();
		await expect(page.getByText(/Revenue Streams/i)).toBeVisible();
		
		// 7. Traction metrics
		await expect(page.getByRole('heading', { name: /Traction & Metrics/i })).toBeVisible();
		await expect(page.getByText(/250\+/i)).toBeVisible();
		
		// 8. Investment ask
		await expect(page.getByRole('heading', { name: /Investment Ask/i })).toBeVisible();
		await expect(page.getByText(/\$5M/i)).toBeVisible();
		
		// 9. Roadmap
		await expect(page.getByRole('heading', { name: /Product Roadmap/i })).toBeVisible();
		await expect(page.getByText(/Q4 2024/i)).toBeVisible();
		
		// 10. CTAs
		const downloadBtn = page.getByRole('button', { name: /Download Full Deck/i }).first();
		const scheduleBtn = page.getByRole('button', { name: /Schedule Meeting/i }).first();
		await expect(downloadBtn).toBeVisible();
		await expect(scheduleBtn).toBeVisible();
		
		console.log('✅ PITCH DECK PAGE: All elements verified, no errors');
	});

	test('CONTACT PAGE - Complete Audit', async ({ page }) => {
		await page.goto('http://localhost:5173/contact');
		
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') errors.push(msg.text());
		});
		
		await page.waitForLoadState('networkidle');
		expect(errors).toHaveLength(0);
		
		// 1. Page header
		await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();
		
		// 2. Contact form
		await expect(page.getByRole('heading', { name: /Send us a Message/i })).toBeVisible();
		const nameInput = page.getByPlaceholder(/John Doe/i);
		const emailInput = page.getByPlaceholder(/john@company.com/i);
		const messageInput = page.getByPlaceholder(/Tell us about your training needs/i);
		
		await expect(nameInput).toBeVisible();
		await expect(emailInput).toBeVisible();
		await expect(messageInput).toBeVisible();
		
		// 3. Test form submission
		await nameInput.fill('Audit Test');
		await emailInput.fill('audit@test.com');
		await messageInput.fill('This is a comprehensive audit test');
		
		const submitBtn = page.getByRole('button', { name: /Send Message/i });
		await submitBtn.click();
		await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 5000 });
		
		// 4. Contact information
		await expect(page.getByRole('heading', { name: /Contact Information/i })).toBeVisible();
		await expect(page.getByText(/hello@workfree.com/i)).toBeVisible();
		
		// 5. Social media
		await expect(page.getByRole('heading', { name: /Follow Us/i })).toBeVisible();
		await expect(page.getByText(/GitHub/i)).toBeVisible();
		
		// 6. FAQ
		await expect(page.getByRole('heading', { name: /Frequently Asked Questions/i })).toBeVisible();
		
		// 7. Team section
		await expect(page.getByRole('heading', { name: /Meet the Team/i })).toBeVisible();
		await expect(page.getByText(/Hunter Ho/i)).toBeVisible();
		
		console.log('✅ CONTACT PAGE: All elements verified, no errors');
	});

	test('RESPONSIVE DESIGN - Mobile Audit', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		
		// Test home page on mobile
		await page.goto('http://localhost:5173/');
		await page.waitForLoadState('networkidle');
		
		// Mobile menu button should be visible
		const menuButton = page.getByRole('button', { name: /Toggle menu/i });
		await expect(menuButton).toBeVisible();
		
		// Click mobile menu
		await menuButton.click();
		await expect(page.getByRole('link', { name: 'Product' })).toBeVisible();
		
		// Test product page on mobile
		await page.goto('http://localhost:5173/product');
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: /Immersive Learning/i })).toBeVisible();
		
		console.log('✅ RESPONSIVE DESIGN: Mobile layout verified');
	});

	test('NAVIGATION - All Links Work', async ({ page }) => {
		await page.goto('http://localhost:5173/');
		
		// Test navigation links
		await page.getByRole('link', { name: 'Product' }).click();
		await expect(page).toHaveURL(/.*product/);
		
		await page.getByRole('link', { name: 'Pitch Deck' }).click();
		await expect(page).toHaveURL(/.*pitch/);
		
		await page.getByRole('link', { name: 'Contact' }).click();
		await expect(page).toHaveURL(/.*contact/);
		
		await page.getByRole('link', { name: 'Home' }).click();
		await expect(page).toHaveURL(/.*\//);
		
		console.log('✅ NAVIGATION: All links work correctly');
	});
});

