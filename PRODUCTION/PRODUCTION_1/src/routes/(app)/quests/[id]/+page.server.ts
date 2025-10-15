import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { quests, userProgress } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { generateId } from 'lucia';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const userId = locals.user!.id;
	const questId = params.id;

	// Get quest
	const quest = await db.query.quests.findFirst({
		where: and(eq(quests.id, questId), eq(quests.isPublished, true))
	});

	if (!quest) {
		throw error(404, 'Quest not found');
	}

	// Get user progress
	const progress = await db.query.userProgress.findFirst({
		where: and(eq(userProgress.userId, userId), eq(userProgress.questId, questId))
	});

	return {
		quest,
		progress
	};
};

export const actions: Actions = {
	start: async ({ params, locals }) => {
		const userId = locals.user!.id;
		const questId = params.id;

		// Check if quest exists
		const quest = await db.query.quests.findFirst({
			where: eq(quests.id, questId)
		});

		if (!quest) {
			return fail(404, { message: 'Quest not found' });
		}

		// Check if already started
		const existing = await db.query.userProgress.findFirst({
			where: and(eq(userProgress.userId, userId), eq(userProgress.questId, questId))
		});

		if (existing) {
			return fail(400, { message: 'Quest already started' });
		}

		// Create progress
		const progressId = generateId(15);
		await db.insert(userProgress).values({
			id: progressId,
			userId,
			questId,
			status: 'in_progress',
			progressPercentage: 0,
			currentStep: 0,
			totalSteps: (quest.content as any)?.steps?.length || 1,
			timeSpentSeconds: 0
		});

		return { success: true };
	},

	updateProgress: async ({ request, params, locals }) => {
		const userId = locals.user!.id;
		const questId = params.id;
		const formData = await request.formData();
		const currentStep = Number(formData.get('currentStep'));
		const progressPercentage = Number(formData.get('progressPercentage'));

		// Get progress
		const progress = await db.query.userProgress.findFirst({
			where: and(eq(userProgress.userId, userId), eq(userProgress.questId, questId))
		});

		if (!progress) {
			return fail(404, { message: 'Progress not found' });
		}

		// Update progress
		await db
			.update(userProgress)
			.set({
				currentStep,
				progressPercentage,
				timeSpentSeconds: progress.timeSpentSeconds + 60 // Increment by 1 minute
			})
			.where(eq(userProgress.id, progress.id));

		return { success: true };
	},

	complete: async ({ params, locals }) => {
		const userId = locals.user!.id;
		const questId = params.id;

		// Get quest and progress
		const quest = await db.query.quests.findFirst({
			where: eq(quests.id, questId)
		});

		const progress = await db.query.userProgress.findFirst({
			where: and(eq(userProgress.userId, userId), eq(userProgress.questId, questId))
		});

		if (!quest || !progress) {
			return fail(404, { message: 'Quest or progress not found' });
		}

		// Update progress to completed
		await db
			.update(userProgress)
			.set({
				status: 'completed',
				progressPercentage: 100,
				completedAt: new Date(),
				score: 100 // TODO: Calculate actual score
			})
			.where(eq(userProgress.id, progress.id));

		// TODO: Award XP
		// TODO: Check and unlock achievements

		throw redirect(302, '/dashboard');
	}
};

