import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { quests, userProgress } from '$lib/server/db/schema';
import { eq, count, sql } from 'drizzle-orm';
import { generateId } from 'lucia';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Get all quests with enrollment counts
	const allQuests = await db
		.select({
			quest: quests,
			enrollments: count(userProgress.id)
		})
		.from(quests)
		.leftJoin(userProgress, eq(quests.id, userProgress.questId))
		.groupBy(quests.id)
		.orderBy(quests.createdAt);

	return {
		quests: allQuests
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const formData = await request.formData();
		const questId = formData.get('questId');

		if (typeof questId !== 'string') {
			return fail(400, { message: 'Invalid quest ID' });
		}

		// Check if quest has enrollments
		const enrollments = await db
			.select({ count: count() })
			.from(userProgress)
			.where(eq(userProgress.questId, questId));

		if (enrollments[0]?.count > 0) {
			return fail(400, {
				message: 'Cannot delete quest with active enrollments. Unpublish it instead.'
			});
		}

		// Delete quest
		await db.delete(quests).where(eq(quests.id, questId));

		return { success: true, message: 'Quest deleted successfully' };
	},

	togglePublish: async ({ request }) => {
		const formData = await request.formData();
		const questId = formData.get('questId');
		const isPublished = formData.get('isPublished') === 'true';

		if (typeof questId !== 'string') {
			return fail(400, { message: 'Invalid quest ID' });
		}

		// Toggle publish status
		await db
			.update(quests)
			.set({ isPublished: !isPublished })
			.where(eq(quests.id, questId));

		return {
			success: true,
			message: isPublished ? 'Quest unpublished' : 'Quest published'
		};
	}
};

