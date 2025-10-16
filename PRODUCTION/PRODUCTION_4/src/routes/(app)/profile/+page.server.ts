import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, userProgress, quests, userAchievements } from '$lib/server/db/schema';
import { eq, and, count, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user!.id;

	// Get user data
	const user = await db.query.users.findFirst({
		where: eq(users.id, userId)
	});

	if (!user) {
		throw redirect(302, '/login');
	}

	// Get quest stats
	const questStats = await db
		.select({
			total: count(),
			completed: count(userProgress.completedAt),
			inProgress: sql<number>`COUNT(CASE WHEN ${userProgress.status} = 'in_progress' THEN 1 END)`
		})
		.from(userProgress)
		.where(eq(userProgress.userId, userId));

	// Get total XP
	const xpData = await db
		.select({ xpReward: quests.xpReward })
		.from(userProgress)
		.leftJoin(quests, eq(userProgress.questId, quests.id))
		.where(and(eq(userProgress.userId, userId), eq(userProgress.status, 'completed')));

	const totalXP = xpData.reduce((sum, q) => sum + (q.xpReward || 0), 0);

	// Get achievements count
	const achievementsCount = await db
		.select({ count: count() })
		.from(userAchievements)
		.where(eq(userAchievements.userId, userId));

	// Get recent activity
	const recentActivity = await db
		.select({
			progress: userProgress,
			quest: quests
		})
		.from(userProgress)
		.leftJoin(quests, eq(userProgress.questId, quests.id))
		.where(eq(userProgress.userId, userId))
		.orderBy(userProgress.startedAt)
		.limit(10);

	return {
		user: {
			id: user.id,
			email: user.email,
			fullName: user.fullName,
			avatarUrl: user.avatarUrl,
			role: user.role,
			subscriptionTier: user.subscriptionTier,
			emailVerified: user.emailVerified,
			createdAt: user.createdAt,
			lastLoginAt: user.lastLoginAt
		},
		stats: {
			totalXP,
			totalQuests: questStats[0]?.total || 0,
			completedQuests: questStats[0]?.completed || 0,
			inProgressQuests: questStats[0]?.inProgress || 0,
			achievements: achievementsCount[0]?.count || 0
		},
		recentActivity
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const formData = await request.formData();
		const fullName = formData.get('fullName');

		// Validation
		if (typeof fullName !== 'string' || fullName.length < 1 || fullName.length > 255) {
			return fail(400, {
				message: 'Full name must be between 1 and 255 characters'
			});
		}

		// Update user
		await db.update(users).set({ fullName }).where(eq(users.id, userId));

		return { success: true, message: 'Profile updated successfully' };
	},

	updateEmail: async ({ request, locals }) => {
		const userId = locals.user!.id;
		const formData = await request.formData();
		const email = formData.get('email');

		// Validation
		if (typeof email !== 'string' || email.length < 3 || !/.+@.+/.test(email)) {
			return fail(400, {
				message: 'Invalid email address'
			});
		}

		// Check if email already exists
		const existingUser = await db.query.users.findFirst({
			where: eq(users.email, email.toLowerCase())
		});

		if (existingUser && existingUser.id !== userId) {
			return fail(400, {
				message: 'Email already in use'
			});
		}

		// Update email
		await db
			.update(users)
			.set({
				email: email.toLowerCase(),
				emailVerified: false // Require re-verification
			})
			.where(eq(users.id, userId));

		return { success: true, message: 'Email updated. Please verify your new email.' };
	}
};

