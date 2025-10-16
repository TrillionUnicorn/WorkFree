import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// In-memory storage for demo purposes
// In production, this would connect to Redis or a database
const waitlist: Array<{ email: string; timestamp: string }> = [];

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		// Validate email
		if (!email || !email.includes('@')) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Check if email already exists
		const exists = waitlist.some(entry => entry.email === email);
		if (exists) {
			return json({ error: 'Email already registered' }, { status: 409 });
		}

		// Add to waitlist
		waitlist.push({
			email,
			timestamp: new Date().toISOString()
		});

		// In production, you would:
		// 1. Store in Redis/Database
		// 2. Send confirmation email
		// 3. Add to email marketing list
		// 4. Log analytics event

		console.log(`New waitlist signup: ${email}`);

		return json({ success: true, message: 'Successfully joined waitlist' });
	} catch (error) {
		console.error('Waitlist error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

export const GET: RequestHandler = async () => {
	// Return waitlist count (for admin purposes)
	return json({ count: waitlist.length });
};

