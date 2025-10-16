import { redirect } from '@sveltejs/kit';
import { SUBSCRIPTION_PLANS, createCheckoutSession, createCustomer } from '$lib/server/stripe';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, locals.user.id)
	});

	return {
		plans: SUBSCRIPTION_PLANS,
		currentTier: user?.subscriptionTier || 'free'
	};
};

export const actions: Actions = {
	checkout: async ({ request, locals, url }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const tier = formData.get('tier') as string;

		if (!tier || !['starter', 'professional', 'enterprise'].includes(tier)) {
			return { error: 'Invalid subscription tier' };
		}

		const plan = SUBSCRIPTION_PLANS[tier as keyof typeof SUBSCRIPTION_PLANS];
		if (!plan.priceId) {
			return { error: 'Price ID not configured' };
		}

		// Get or create Stripe customer
		const user = await db.query.users.findFirst({
			where: eq(users.id, locals.user.id)
		});

		let customerId = user?.stripeCustomerId;

		if (!customerId) {
			const customer = await createCustomer(locals.user.email, locals.user.id);
			customerId = customer.id;

			// Update user with Stripe customer ID
			await db
				.update(users)
				.set({ stripeCustomerId: customerId })
				.where(eq(users.id, locals.user.id));
		}

		// Create checkout session
		const session = await createCheckoutSession(
			locals.user.id,
			plan.priceId,
			`${url.origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
			`${url.origin}/pricing`
		);

		throw redirect(303, session.url!);
	}
};

