import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// In-memory storage for demo purposes
// In production, this would connect to a database and send emails
const contacts: Array<{
	name: string;
	email: string;
	company?: string;
	subject?: string;
	message: string;
	timestamp: string;
}> = [];

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, company, subject, message } = await request.json();

		// Validate required fields
		if (!name || !email || !message) {
			return json({ error: 'Name, email, and message are required' }, { status: 400 });
		}

		// Validate email format
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Store contact submission
		contacts.push({
			name,
			email,
			company,
			subject,
			message,
			timestamp: new Date().toISOString()
		});

		// In production, you would:
		// 1. Store in database
		// 2. Send confirmation email to user
		// 3. Send notification email to team
		// 4. Add to CRM system
		// 5. Log analytics event

		console.log(`New contact submission from: ${name} (${email})`);

		return json({ success: true, message: 'Message sent successfully' });
	} catch (error) {
		console.error('Contact form error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};

export const GET: RequestHandler = async () => {
	// Return contact count (for admin purposes)
	return json({ count: contacts.length });
};

