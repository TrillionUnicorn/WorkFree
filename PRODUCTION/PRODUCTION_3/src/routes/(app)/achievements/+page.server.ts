import { db } from '$lib/server/db';
import { achievements, userAchievements, userProgress, quests } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const userId = locals.user!.id;

	// Get all achievements
	const allAchievements = await db.select().from(achievements);

	// Get user's unlocked achievements
	const unlockedAchievements = await db
		.select({
			achievement: achievements,
			unlockedAt: userAchievements.unlockedAt
		})
		.from(userAchievements)
		.leftJoin(achievements, eq(userAchievements.achievementId, achievements.id))
		.where(eq(userAchievements.userId, userId));

	// Get user stats for progress calculation
	const completedQuests = await db
		.select({ count: count() })
		.from(userProgress)
		.where(and(eq(userProgress.userId, userId), eq(userProgress.status, 'completed')));

	const totalXP = await db
		.select({ xpReward: quests.xpReward })
		.from(userProgress)
		.leftJoin(quests, eq(userProgress.questId, quests.id))
		.where(and(eq(userProgress.userId, userId), eq(userProgress.status, 'completed')));

	const userStats = {
		questsCompleted: completedQuests[0]?.count || 0,
		totalXP: totalXP.reduce((sum, q) => sum + (q.xpReward || 0), 0)
	};

	// Map achievements with unlock status and progress
	const achievementsWithStatus = allAchievements.map((achievement) => {
		const unlocked = unlockedAchievements.find(
			(ua) => ua.achievement?.id === achievement.id
		);

		// Calculate progress based on criteria
		let progress = 0;
		const criteria = achievement.criteria as any;

		if (criteria.questsCompleted) {
			progress = Math.min(
				100,
				Math.round((userStats.questsCompleted / criteria.questsCompleted) * 100)
			);
		} else if (criteria.totalXP) {
			progress = Math.min(100, Math.round((userStats.totalXP / criteria.totalXP) * 100));
		}

		return {
			...achievement,
			unlocked: !!unlocked,
			unlockedAt: unlocked?.unlockedAt || null,
			progress
		};
	});

	// Group by rarity
	const grouped = {
		common: achievementsWithStatus.filter((a) => a.rarity === 'common'),
		rare: achievementsWithStatus.filter((a) => a.rarity === 'rare'),
		epic: achievementsWithStatus.filter((a) => a.rarity === 'epic'),
		legendary: achievementsWithStatus.filter((a) => a.rarity === 'legendary')
	};

	return {
		achievements: achievementsWithStatus,
		grouped,
		stats: {
			total: allAchievements.length,
			unlocked: unlockedAchievements.length,
			percentage: Math.round((unlockedAchievements.length / allAchievements.length) * 100)
		}
	};
};

