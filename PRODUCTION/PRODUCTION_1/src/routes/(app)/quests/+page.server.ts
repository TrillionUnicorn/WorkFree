import { db } from '$lib/server/db';
import { quests, userProgress } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const userId = locals.user!.id;
	const category = url.searchParams.get('category');
	const difficulty = url.searchParams.get('difficulty');

	// Build query
	let query = db
		.select()
		.from(quests)
		.where(eq(quests.isPublished, true));

	// Apply filters
	if (category) {
		query = query.where(eq(quests.category, category));
	}
	if (difficulty) {
		query = query.where(eq(quests.difficulty, difficulty));
	}

	const allQuests = await query;

	// Get user progress for these quests
	const userProgressData = await db
		.select()
		.from(userProgress)
		.where(eq(userProgress.userId, userId));

	// Combine quests with progress
	const questsWithProgress = allQuests.map((quest) => {
		const progress = userProgressData.find((p) => p.questId === quest.id);
		return {
			...quest,
			userProgress: progress || null
		};
	});

	// Get unique categories and difficulties
	const categories = [...new Set(allQuests.map((q) => q.category))];
	const difficulties = ['beginner', 'intermediate', 'advanced'];

	return {
		quests: questsWithProgress,
		categories,
		difficulties,
		filters: {
			category,
			difficulty
		}
	};
};

