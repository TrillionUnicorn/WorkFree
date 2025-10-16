import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, userProgress, userAchievements } from '$lib/server/db/schema';
import { eq, count, sql } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get('search') || '';
	const role = url.searchParams.get('role') || '';
	const tier = url.searchParams.get('tier') || '';

	// Build query
	let query = db.select().from(users);

	// Apply filters
	if (search) {
		query = query.where(
			sql`${users.email} LIKE ${'%' + search + '%'} OR ${users.fullName} LIKE ${'%' + search + '%'}`
		);
	}
	if (role) {
		query = query.where(eq(users.role, role));
	}
	if (tier) {
		query = query.where(eq(users.subscriptionTier, tier));
	}

	const allUsers = await query.orderBy(users.createdAt).limit(100);

	// Get stats for each user
	const usersWithStats = await Promise.all(
		allUsers.map(async (user) => {
			const questStats = await db
				.select({
					total: count(),
					completed: sql<number>`COUNT(CASE WHEN ${userProgress.status} = 'completed' THEN 1 END)`
				})
				.from(userProgress)
				.where(eq(userProgress.userId, user.id));

			const achievementCount = await db
				.select({ count: count() })
				.from(userAchievements)
				.where(eq(userAchievements.userId, user.id));

			return {
				...user,
				stats: {
					totalQuests: questStats[0]?.total || 0,
					completedQuests: questStats[0]?.completed || 0,
					achievements: achievementCount[0]?.count || 0
				}
			};
		})
	);

	return {
		users: usersWithStats,
		filters: { search, role, tier }
	};
};

export const actions: Actions = {
	updateRole: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');
		const role = formData.get('role');

		if (typeof userId !== 'string' || typeof role !== 'string') {
			return fail(400, { message: 'Invalid parameters' });
		}

		if (!['user', 'premium', 'admin'].includes(role)) {
			return fail(400, { message: 'Invalid role' });
		}

		await db.update(users).set({ role }).where(eq(users.id, userId));

		return { success: true, message: 'User role updated' };
	},

	updateTier: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');
		const tier = formData.get('tier');

		if (typeof userId !== 'string' || typeof tier !== 'string') {
			return fail(400, { message: 'Invalid parameters' });
		}

		if (!['free', 'starter', 'professional', 'enterprise'].includes(tier)) {
			return fail(400, { message: 'Invalid subscription tier' });
		}

		await db.update(users).set({ subscriptionTier: tier }).where(eq(users.id, userId));

		return { success: true, message: 'Subscription tier updated' };
	},

	deleteUser: async ({ request }) => {
		const formData = await request.formData();
		const userId = formData.get('userId');

		if (typeof userId !== 'string') {
			return fail(400, { message: 'Invalid user ID' });
		}

		// Delete user (cascade will handle related records)
		await db.delete(users).where(eq(users.id, userId));

		return { success: true, message: 'User deleted successfully' };
	}
};

