import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Check if user is logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// Check if user is admin
	if (locals.user.role !== 'admin') {
		throw redirect(302, '/dashboard');
	}

	return {
		user: locals.user
	};
};

