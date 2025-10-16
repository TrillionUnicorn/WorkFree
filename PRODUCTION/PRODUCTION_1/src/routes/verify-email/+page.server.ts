import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, emailVerificationTokens } from '$lib/server/db/schema';
import { eq, and, gt } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw error(400, 'Missing verification token');
	}

	// Find token
	const verificationToken = await db.query.emailVerificationTokens.findFirst({
		where: and(
			eq(emailVerificationTokens.token, token),
			gt(emailVerificationTokens.expiresAt, new Date())
		)
	});

	if (!verificationToken) {
		return {
			success: false,
			message: 'Invalid or expired verification token'
		};
	}

	// Update user
	await db
		.update(users)
		.set({ emailVerified: true })
		.where(eq(users.id, verificationToken.userId));

	// Delete token
	await db.delete(emailVerificationTokens).where(eq(emailVerificationTokens.id, verificationToken.id));

	return {
		success: true,
		message: 'Email verified successfully!'
	};
};

