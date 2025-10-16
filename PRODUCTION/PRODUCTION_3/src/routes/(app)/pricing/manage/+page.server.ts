import { redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { createCustomerPortalSession } from '$lib/server/stripe';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const user = await db.query.users.findFirst({
		where: eq(users.id, locals.user.id)
	});

	if (!user?.stripeCustomerId) {
		throw redirect(302, '/pricing');
	}

	return {
		user: {
			subscriptionTier: user.subscriptionTier,
			subscriptionStatus: user.subscriptionStatus
		}
	};
};

export const actions: Actions = {
	portal: async ({ locals, url }) => {
		if (!locals.user) {
			return fail(401, { message: 'Unauthorized' });
		}

		const user = await db.query.users.findFirst({
			where: eq(users.id, locals.user.id)
		});

		if (!user?.stripeCustomerId) {
			return fail(400, { message: 'No active subscription' });
		}

		const session = await createCustomerPortalSession(
			user.stripeCustomerId,
			`${url.origin}/pricing/manage`
		);

		throw redirect(303, session.url);
	}
};

