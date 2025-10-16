import { describe, it, expect } from 'vitest';
import { SUBSCRIPTION_PLANS } from './stripe';

describe('Stripe Configuration', () => {
	it('should have all subscription plans defined', () => {
		expect(SUBSCRIPTION_PLANS).toBeDefined();
		expect(SUBSCRIPTION_PLANS.free).toBeDefined();
		expect(SUBSCRIPTION_PLANS.starter).toBeDefined();
		expect(SUBSCRIPTION_PLANS.professional).toBeDefined();
		expect(SUBSCRIPTION_PLANS.enterprise).toBeDefined();
	});

	it('should have correct pricing structure', () => {
		expect(SUBSCRIPTION_PLANS.free.price).toBe(0);
		expect(SUBSCRIPTION_PLANS.starter.price).toBe(49);
		expect(SUBSCRIPTION_PLANS.professional.price).toBe(149);
		expect(SUBSCRIPTION_PLANS.enterprise.price).toBe(499);
	});

	it('should have features for each plan', () => {
		Object.values(SUBSCRIPTION_PLANS).forEach((plan) => {
			expect(plan.features).toBeDefined();
			expect(Array.isArray(plan.features)).toBe(true);
			expect(plan.features.length).toBeGreaterThan(0);
		});
	});

	it('should have limits for each plan', () => {
		Object.values(SUBSCRIPTION_PLANS).forEach((plan) => {
			expect(plan.limits).toBeDefined();
			expect(plan.limits.questsPerMonth).toBeDefined();
			expect(plan.limits.maxActiveQuests).toBeDefined();
		});
	});

	it('should have unlimited quests for paid plans', () => {
		expect(SUBSCRIPTION_PLANS.starter.limits.questsPerMonth).toBe(-1);
		expect(SUBSCRIPTION_PLANS.professional.limits.questsPerMonth).toBe(-1);
		expect(SUBSCRIPTION_PLANS.enterprise.limits.questsPerMonth).toBe(-1);
	});

	it('should have quest limits for free plan', () => {
		expect(SUBSCRIPTION_PLANS.free.limits.questsPerMonth).toBe(5);
		expect(SUBSCRIPTION_PLANS.free.limits.maxActiveQuests).toBe(2);
	});
});

