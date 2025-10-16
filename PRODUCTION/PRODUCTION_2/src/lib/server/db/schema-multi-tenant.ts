import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================
// MULTI-TENANT SCHEMA FOR PRODUCTION 2
// ============================================

// Tenants (Organizations)
export const tenants = sqliteTable('tenants', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	domain: text('domain'),
	plan: text('plan').notNull().default('starter'), // starter, professional, enterprise
	status: text('status').notNull().default('active'), // active, suspended, cancelled
	maxUsers: integer('max_users').notNull().default(10),
	settings: text('settings', { mode: 'json' }),
	branding: text('branding', { mode: 'json' }), // logo, colors, etc.
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Users (with tenant association)
export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	email: text('email').notNull(),
	username: text('username').notNull(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull().default('user'), // user, admin, owner
	firstName: text('first_name'),
	lastName: text('last_name'),
	avatar: text('avatar'),
	emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
	status: text('status').notNull().default('active'), // active, suspended, deleted
	lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Sessions (with tenant association)
export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Quests (tenant-specific)
export const quests = sqliteTable('quests', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	description: text('description').notNull(),
	category: text('category').notNull(),
	difficulty: text('difficulty').notNull(),
	duration: integer('duration').notNull(),
	xp: integer('xp').notNull(),
	content: text('content', { mode: 'json' }),
	requirements: text('requirements', { mode: 'json' }),
	rewards: text('rewards', { mode: 'json' }),
	status: text('status').notNull().default('active'), // active, archived, draft
	createdBy: text('created_by').references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// User Progress (tenant-specific)
export const userProgress = sqliteTable('user_progress', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	questId: text('quest_id').notNull().references(() => quests.id, { onDelete: 'cascade' }),
	status: text('status').notNull().default('not_started'), // not_started, in_progress, completed
	progress: integer('progress').notNull().default(0),
	score: integer('score'),
	startedAt: integer('started_at', { mode: 'timestamp' }),
	completedAt: integer('completed_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Achievements (tenant-specific)
export const achievements = sqliteTable('achievements', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description').notNull(),
	icon: text('icon').notNull(),
	rarity: text('rarity').notNull(),
	xp: integer('xp').notNull(),
	requirements: text('requirements', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// User Achievements
export const userAchievements = sqliteTable('user_achievements', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	achievementId: text('achievement_id').notNull().references(() => achievements.id, { onDelete: 'cascade' }),
	unlockedAt: integer('unlocked_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Subscriptions (tenant billing)
export const subscriptions = sqliteTable('subscriptions', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	stripeCustomerId: text('stripe_customer_id'),
	stripeSubscriptionId: text('stripe_subscription_id'),
	stripePriceId: text('stripe_price_id'),
	status: text('status').notNull(), // active, canceled, past_due, trialing
	currentPeriodStart: integer('current_period_start', { mode: 'timestamp' }),
	currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
	cancelAtPeriodEnd: integer('cancel_at_period_end', { mode: 'boolean' }).default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Usage Tracking (for billing)
export const usageTracking = sqliteTable('usage_tracking', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	metric: text('metric').notNull(), // active_users, quests_completed, storage_used, etc.
	value: real('value').notNull(),
	period: text('period').notNull(), // daily, monthly
	date: integer('date', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Invitations (for team members)
export const invitations = sqliteTable('invitations', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	email: text('email').notNull(),
	role: text('role').notNull().default('user'),
	invitedBy: text('invited_by').notNull().references(() => users.id),
	token: text('token').notNull().unique(),
	status: text('status').notNull().default('pending'), // pending, accepted, expired
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Audit Logs (for compliance)
export const auditLogs = sqliteTable('audit_logs', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	userId: text('user_id').references(() => users.id),
	action: text('action').notNull(),
	resource: text('resource').notNull(),
	resourceId: text('resource_id'),
	metadata: text('metadata', { mode: 'json' }),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// API Keys (for integrations)
export const apiKeys = sqliteTable('api_keys', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	key: text('key').notNull().unique(),
	permissions: text('permissions', { mode: 'json' }),
	lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }),
	createdBy: text('created_by').notNull().references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Webhooks (for integrations)
export const webhooks = sqliteTable('webhooks', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	url: text('url').notNull(),
	events: text('events', { mode: 'json' }).notNull(),
	secret: text('secret').notNull(),
	status: text('status').notNull().default('active'), // active, inactive
	createdBy: text('created_by').notNull().references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Notifications
export const notifications = sqliteTable('notifications', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	type: text('type').notNull(),
	title: text('title').notNull(),
	message: text('message').notNull(),
	data: text('data', { mode: 'json' }),
	read: integer('read', { mode: 'boolean' }).notNull().default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Teams (within tenants)
export const teams = sqliteTable('teams', {
	id: text('id').primaryKey(),
	tenantId: text('tenant_id').notNull().references(() => tenants.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	createdBy: text('created_by').notNull().references(() => users.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Team Members
export const teamMembers = sqliteTable('team_members', {
	id: text('id').primaryKey(),
	teamId: text('team_id').notNull().references(() => teams.id, { onDelete: 'cascade' }),
	userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
	role: text('role').notNull().default('member'), // member, lead
	joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Export types
export type Tenant = typeof tenants.$inferSelect;
export type NewTenant = typeof tenants.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type Quest = typeof quests.$inferSelect;
export type NewQuest = typeof quests.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type UsageTracking = typeof usageTracking.$inferSelect;
export type Invitation = typeof invitations.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Webhook = typeof webhooks.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;

