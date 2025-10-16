import { db } from '$lib/server/db';
import { userProgress, quests, userAchievements } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user!.id;

	// Get user progress stats
	const progressStats = await db
		.select({
			total: count(),
			completed: count(userProgress.completedAt)
		})
		.from(userProgress)
		.where(eq(userProgress.userId, userId));

	// Get recent progress
	const recentProgress = await db
		.select({
			progress: userProgress,
			quest: quests
		})
		.from(userProgress)
		.leftJoin(quests, eq(userProgress.questId, quests.id))
		.where(eq(userProgress.userId, userId))
		.orderBy(userProgress.startedAt)
		.limit(5);

	// Get achievements count
	const achievementsCount = await db
		.select({ count: count() })
		.from(userAchievements)
		.where(eq(userAchievements.userId, userId));

	// Calculate total XP
	const completedQuests = await db
		.select({ xpReward: quests.xpReward })
		.from(userProgress)
		.leftJoin(quests, eq(userProgress.questId, quests.id))
		.where(
			and(
				eq(userProgress.userId, userId),
				eq(userProgress.status, 'completed')
			)
		);

	const totalXP = completedQuests.reduce((sum, q) => sum + (q.xpReward || 0), 0);

	return {
		stats: {
			totalQuests: progressStats[0]?.total || 0,
			completedQuests: progressStats[0]?.completed || 0,
			totalXP,
			achievements: achievementsCount[0]?.count || 0
		},
		recentProgress
	};
};

