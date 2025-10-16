import { db } from '$lib/server/db';
import { users, quests, userProgress, userAchievements } from '$lib/server/db/schema';
import { count, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Get total counts
	const totalUsers = await db.select({ count: count() }).from(users);
	const totalQuests = await db.select({ count: count() }).from(quests);
	const totalProgress = await db.select({ count: count() }).from(userProgress);
	const totalAchievements = await db.select({ count: count() }).from(userAchievements);

	// Get user growth (last 30 days)
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	const recentUsers = await db
		.select({ count: count() })
		.from(users)
		.where(sql`${users.createdAt} >= ${thirtyDaysAgo}`);

	// Get quest completion stats
	const completedQuests = await db
		.select({ count: count() })
		.from(userProgress)
		.where(sql`${userProgress.status} = 'completed'`);

	const inProgressQuests = await db
		.select({ count: count() })
		.from(userProgress)
		.where(sql`${userProgress.status} = 'in_progress'`);

	// Get subscription breakdown
	const subscriptionStats = await db
		.select({
			tier: users.subscriptionTier,
			count: count()
		})
		.from(users)
		.groupBy(users.subscriptionTier);

	// Get recent users
	const recentUsersList = await db
		.select({
			id: users.id,
			email: users.email,
			fullName: users.fullName,
			role: users.role,
			subscriptionTier: users.subscriptionTier,
			createdAt: users.createdAt
		})
		.from(users)
		.orderBy(users.createdAt)
		.limit(10);

	// Get popular quests
	const popularQuests = await db
		.select({
			quest: quests,
			enrollments: count(userProgress.id)
		})
		.from(quests)
		.leftJoin(userProgress, sql`${quests.id} = ${userProgress.questId}`)
		.groupBy(quests.id)
		.orderBy(sql`enrollments DESC`)
		.limit(5);

	return {
		stats: {
			totalUsers: totalUsers[0]?.count || 0,
			totalQuests: totalQuests[0]?.count || 0,
			totalProgress: totalProgress[0]?.count || 0,
			totalAchievements: totalAchievements[0]?.count || 0,
			recentUsers: recentUsers[0]?.count || 0,
			completedQuests: completedQuests[0]?.count || 0,
			inProgressQuests: inProgressQuests[0]?.count || 0
		},
		subscriptionStats,
		recentUsers: recentUsersList,
		popularQuests
	};
};

