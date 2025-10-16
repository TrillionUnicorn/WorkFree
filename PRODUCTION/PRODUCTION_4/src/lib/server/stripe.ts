import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

if (!STRIPE_SECRET_KEY) {
	throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2024-11-20.acacia',
	typescript: true
});

// Subscription plans
export const SUBSCRIPTION_PLANS = {
	free: {
		name: 'Free',
		price: 0,
		priceId: null,
		features: [
			'5 quests per month',
			'Basic achievements',
			'Community support',
			'Web access only'
		],
		limits: {
			questsPerMonth: 5,
			maxActiveQuests: 2
		}
	},
	starter: {
		name: 'Starter',
		price: 49,
		priceId: 'price_starter', // Replace with actual Stripe price ID
		features: [
			'Unlimited quests',
			'All achievements',
			'Priority support',
			'Web + VR access',
			'Progress analytics'
		],
		limits: {
			questsPerMonth: -1, // unlimited
			maxActiveQuests: -1
		}
	},
	professional: {
		name: 'Professional',
		price: 149,
		priceId: 'price_professional', // Replace with actual Stripe price ID
		features: [
			'Everything in Starter',
			'Custom quests',
			'Team collaboration',
			'Advanced analytics',
			'API access',
			'White-label option'
		],
		limits: {
			questsPerMonth: -1,
			maxActiveQuests: -1,
			customQuests: true,
			teamMembers: 10
		}
	},
	enterprise: {
		name: 'Enterprise',
		price: 499,
		priceId: 'price_enterprise', // Replace with actual Stripe price ID
		features: [
			'Everything in Professional',
			'Unlimited team members',
			'Dedicated support',
			'Custom integrations',
			'SLA guarantee',
			'On-premise option'
		],
		limits: {
			questsPerMonth: -1,
			maxActiveQuests: -1,
			customQuests: true,
			teamMembers: -1
		}
	}
} as const;

export type SubscriptionTier = keyof typeof SUBSCRIPTION_PLANS;

// Helper functions
export async function createCheckoutSession(
	userId: string,
	priceId: string,
	successUrl: string,
	cancelUrl: string
) {
	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1
			}
		],
		success_url: successUrl,
		cancel_url: cancelUrl,
		client_reference_id: userId,
		metadata: {
			userId
		}
	});

	return session;
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
	const session = await stripe.billingPortal.sessions.create({
		customer: customerId,
		return_url: returnUrl
	});

	return session;
}

export async function cancelSubscription(subscriptionId: string) {
	const subscription = await stripe.subscriptions.update(subscriptionId, {
		cancel_at_period_end: true
	});

	return subscription;
}

export async function resumeSubscription(subscriptionId: string) {
	const subscription = await stripe.subscriptions.update(subscriptionId, {
		cancel_at_period_end: false
	});

	return subscription;
}

export async function getSubscription(subscriptionId: string) {
	const subscription = await stripe.subscriptions.retrieve(subscriptionId);
	return subscription;
}

export async function createCustomer(email: string, userId: string) {
	const customer = await stripe.customers.create({
		email,
		metadata: {
			userId
		}
	});

	return customer;
}

