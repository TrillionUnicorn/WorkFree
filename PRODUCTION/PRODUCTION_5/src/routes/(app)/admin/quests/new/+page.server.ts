import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { quests } from '$lib/server/db/schema';
import { generateId } from 'lucia';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const title = formData.get('title');
		const description = formData.get('description');
		const difficulty = formData.get('difficulty');
		const category = formData.get('category');
		const durationMinutes = formData.get('durationMinutes');
		const xpReward = formData.get('xpReward');
		const stepsJson = formData.get('steps');

		// Validation
		if (typeof title !== 'string' || title.length < 3 || title.length > 255) {
			return fail(400, { message: 'Title must be between 3 and 255 characters' });
		}

		if (typeof description !== 'string' || description.length < 10) {
			return fail(400, { message: 'Description must be at least 10 characters' });
		}

		if (!['beginner', 'intermediate', 'advanced'].includes(difficulty as string)) {
			return fail(400, { message: 'Invalid difficulty level' });
		}

		if (typeof category !== 'string' || category.length < 2) {
			return fail(400, { message: 'Category is required' });
		}

		const duration = Number(durationMinutes);
		if (isNaN(duration) || duration < 1 || duration > 480) {
			return fail(400, { message: 'Duration must be between 1 and 480 minutes' });
		}

		const xp = Number(xpReward);
		if (isNaN(xp) || xp < 10 || xp > 10000) {
			return fail(400, { message: 'XP reward must be between 10 and 10000' });
		}

		// Parse steps
		let steps;
		try {
			steps = JSON.parse(stepsJson as string);
			if (!Array.isArray(steps) || steps.length === 0) {
				return fail(400, { message: 'At least one step is required' });
			}
		} catch (e) {
			return fail(400, { message: 'Invalid steps format' });
		}

		// Create quest
		const questId = generateId(15);
		await db.insert(quests).values({
			id: questId,
			title,
			description,
			difficulty: difficulty as string,
			category,
			durationMinutes: duration,
			xpReward: xp,
			content: { steps },
			isPublished: false,
			createdBy: locals.user!.id
		});

		throw redirect(302, '/admin/quests');
	}
};

