import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users table
export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	fullName: text('full_name'),
	avatarUrl: text('avatar_url'),
	role: text('role').notNull().default('user'), // user, premium, admin
	subscriptionTier: text('subscription_tier').notNull().default('free'), // free, starter, professional, enterprise
	subscriptionStatus: text('subscription_status').notNull().default('active'),
	stripeCustomerId: text('stripe_customer_id'),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	lastLoginAt: integer('last_login_at', { mode: 'timestamp' })
});

// Sessions table (for Lucia auth)
export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Quests table
export const quests = sqliteTable('quests', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	difficulty: text('difficulty').notNull(), // beginner, intermediate, advanced
	category: text('category').notNull(),
	durationMinutes: integer('duration_minutes'),
	xpReward: integer('xp_reward').notNull(),
	content: text('content', { mode: 'json' }).notNull(), // JSON content
	prerequisites: text('prerequisites', { mode: 'json' }), // JSON array of quest IDs
	isPublished: integer('is_published', { mode: 'boolean' }).notNull().default(false),
	createdBy: text('created_by').references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

// User progress table
export const userProgress = sqliteTable('user_progress', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	questId: text('quest_id')
		.notNull()
		.references(() => quests.id, { onDelete: 'cascade' }),
	status: text('status').notNull(), // not_started, in_progress, completed, failed
	progressPercentage: integer('progress_percentage').notNull().default(0),
	currentStep: integer('current_step').notNull().default(0),
	totalSteps: integer('total_steps'),
	timeSpentSeconds: integer('time_spent_seconds').notNull().default(0),
	score: integer('score'),
	startedAt: integer('started_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	completedAt: integer('completed_at', { mode: 'timestamp' }),
	metadata: text('metadata', { mode: 'json' })
});

// Achievements table
export const achievements = sqliteTable('achievements', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	iconUrl: text('icon_url'),
	criteria: text('criteria', { mode: 'json' }).notNull(), // JSON criteria
	xpReward: integer('xp_reward').notNull().default(0),
	rarity: text('rarity').notNull().default('common'), // common, rare, epic, legendary
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

// User achievements table
export const userAchievements = sqliteTable('user_achievements', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	achievementId: text('achievement_id')
		.notNull()
		.references(() => achievements.id, { onDelete: 'cascade' }),
	unlockedAt: integer('unlocked_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

// Subscriptions table
export const subscriptions = sqliteTable('subscriptions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	stripeSubscriptionId: text('stripe_subscription_id'),
	planId: text('plan_id').notNull(), // free, starter, professional, enterprise
	status: text('status').notNull(), // active, canceled, past_due, unpaid
	currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }),
	currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
	cancelAtPeriodEnd: integer('cancel_at_period_end', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)
});

// Email verification tokens
export const emailVerificationTokens = sqliteTable('email_verification_tokens', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Password reset tokens
export const passwordResetTokens = sqliteTable('password_reset_tokens', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Quest = typeof quests.$inferSelect;
export type NewQuest = typeof quests.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;
export type Achievement = typeof achievements.$inferSelect;
export type UserAchievement = typeof userAchievements.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;

