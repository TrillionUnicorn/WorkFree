import { fail, redirect } from '@sveltejs/kit';
import { hash } from 'bcrypt';
import { generateId } from 'lucia';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const fullName = formData.get('fullName');

		// Validation
		if (
			typeof email !== 'string' ||
			email.length < 3 ||
			email.length > 255 ||
			!/.+@.+/.test(email)
		) {
			return fail(400, {
				message: 'Invalid email'
			});
		}

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Password must be between 6 and 255 characters'
			});
		}

		if (typeof fullName !== 'string' || fullName.length < 1 || fullName.length > 255) {
			return fail(400, {
				message: 'Full name is required'
			});
		}

		// Check if user exists
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email.toLowerCase())
		});

		if (existingUser) {
			return fail(400, {
				message: 'Email already in use'
			});
		}

		const userId = generateId(15);
		const passwordHash = await hash(password, 10);

		// Create user
		await db.insert(users).values({
			id: userId,
			email: email.toLowerCase(),
			passwordHash,
			fullName,
			role: 'user',
			subscriptionTier: 'free',
			subscriptionStatus: 'active',
			emailVerified: false
		});

		// Create session
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		throw redirect(302, '/dashboard');
	}
};

