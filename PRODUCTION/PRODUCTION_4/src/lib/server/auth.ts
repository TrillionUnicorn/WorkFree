import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { sessions, users } from './db/schema';
import { dev } from '$app/environment';

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			fullName: attributes.fullName,
			role: attributes.role,
			subscriptionTier: attributes.subscriptionTier,
			emailVerified: attributes.emailVerified
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			fullName: string | null;
			role: string;
			subscriptionTier: string;
			emailVerified: boolean;
		};
	}
}

