import { db } from '$lib/server/db';
import { users, userProgress, quests } from '$lib/server/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const currentUserId = locals.user!.id;

	// Get all users with their stats
	const leaderboardData = await db
		.select({
			userId: users.id,
			email: users.email,
			fullName: users.fullName,
			avatarUrl: users.avatarUrl,
			completedQuests: sql<number>`COUNT(CASE WHEN ${userProgress.status} = 'completed' THEN 1 END)`,
			totalXP: sql<number>`COALESCE(SUM(CASE WHEN ${userProgress.status} = 'completed' THEN ${quests.xpReward} ELSE 0 END), 0)`,
			averageScore: sql<number>`COALESCE(AVG(CASE WHEN ${userProgress.status} = 'completed' THEN ${userProgress.score} END), 0)`,
			totalTimeSpent: sql<number>`COALESCE(SUM(${userProgress.timeSpentSeconds}), 0)`
		})
		.from(users)
		.leftJoin(userProgress, eq(users.id, userProgress.userId))
		.leftJoin(quests, eq(userProgress.questId, quests.id))
		.groupBy(users.id)
		.orderBy(sql`totalXP DESC`)
		.limit(100);

	// Find current user's rank
	const currentUserRank =
		leaderboardData.findIndex((user) => user.userId === currentUserId) + 1;

	// Get current user's stats
	const currentUserStats = leaderboardData.find((user) => user.userId === currentUserId) || {
		userId: currentUserId,
		email: locals.user!.email,
		fullName: locals.user!.fullName,
		avatarUrl: null,
		completedQuests: 0,
		totalXP: 0,
		averageScore: 0,
		totalTimeSpent: 0
	};

	return {
		leaderboard: leaderboardData.map((user, index) => ({
			...user,
			rank: index + 1,
			isCurrentUser: user.userId === currentUserId
		})),
		currentUser: {
			...currentUserStats,
			rank: currentUserRank || leaderboardData.length + 1
		}
	};
};

