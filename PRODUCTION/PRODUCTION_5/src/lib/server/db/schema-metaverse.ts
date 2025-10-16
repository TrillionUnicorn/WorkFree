import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================
// METAVERSE SCHEMA FOR PRODUCTION 5
// Includes: 3D Worlds, Avatars, VR/AR, Social Features
// ============================================

// Virtual Worlds
export const virtualWorlds = sqliteTable('virtual_worlds', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	description: text('description'),
	type: text('type').notNull(), // training, social, event, custom
	capacity: integer('capacity').notNull().default(100),
	environment: text('environment', { mode: 'json' }), // 3D scene config
	physics: text('physics', { mode: 'json' }), // physics settings
	lighting: text('lighting', { mode: 'json' }),
	skybox: text('skybox'),
	status: text('status').notNull().default('active'), // active, maintenance, archived
	createdBy: text('created_by'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Avatars
export const avatars = sqliteTable('avatars', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().unique(),
	name: text('name').notNull(),
	model: text('model').notNull(), // 3D model reference
	customization: text('customization', { mode: 'json' }), // colors, accessories, etc.
	animations: text('animations', { mode: 'json' }),
	equipment: text('equipment', { mode: 'json' }),
	stats: text('stats', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Avatar Items (Customization)
export const avatarItems = sqliteTable('avatar_items', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(), // clothing, accessory, emote, effect
	category: text('category'),
	rarity: text('rarity').notNull(), // common, rare, epic, legendary
	model: text('model'), // 3D model reference
	price: integer('price'),
	currency: text('currency').default('coins'),
	requirements: text('requirements', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// User Inventory
export const userInventory = sqliteTable('user_inventory', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	itemId: text('item_id').notNull().references(() => avatarItems.id),
	quantity: integer('quantity').notNull().default(1),
	equipped: integer('equipped', { mode: 'boolean' }).default(false),
	acquiredAt: integer('acquired_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Virtual Spaces (Rooms/Areas)
export const virtualSpaces = sqliteTable('virtual_spaces', {
	id: text('id').primaryKey(),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	type: text('type').notNull(), // classroom, meeting, social, quest
	capacity: integer('capacity').notNull().default(50),
	position: text('position', { mode: 'json' }), // x, y, z coordinates
	size: text('size', { mode: 'json' }), // width, height, depth
	objects: text('objects', { mode: 'json' }), // 3D objects in space
	permissions: text('permissions', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Active Sessions (Users in worlds)
export const activeSessions = sqliteTable('active_sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id),
	spaceId: text('space_id').references(() => virtualSpaces.id),
	position: text('position', { mode: 'json' }),
	rotation: text('rotation', { mode: 'json' }),
	state: text('state', { mode: 'json' }), // current activity, animations, etc.
	deviceType: text('device_type'), // vr, ar, desktop, mobile
	joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	lastUpdate: integer('last_update', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Multiplayer Quests
export const multiplayerQuests = sqliteTable('multiplayer_quests', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id),
	minPlayers: integer('min_players').notNull().default(2),
	maxPlayers: integer('max_players').notNull().default(10),
	difficulty: text('difficulty').notNull(),
	duration: integer('duration'),
	objectives: text('objectives', { mode: 'json' }).notNull(),
	rewards: text('rewards', { mode: 'json' }),
	status: text('status').notNull().default('active'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Quest Instances (Active multiplayer sessions)
export const questInstances = sqliteTable('quest_instances', {
	id: text('id').primaryKey(),
	questId: text('quest_id').notNull().references(() => multiplayerQuests.id),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id),
	participants: text('participants', { mode: 'json' }).notNull(),
	status: text('status').notNull().default('waiting'), // waiting, active, completed, failed
	progress: text('progress', { mode: 'json' }),
	startedAt: integer('started_at', { mode: 'timestamp' }),
	completedAt: integer('completed_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Voice Channels
export const voiceChannels = sqliteTable('voice_channels', {
	id: text('id').primaryKey(),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id),
	spaceId: text('space_id').references(() => virtualSpaces.id),
	name: text('name').notNull(),
	type: text('type').notNull(), // spatial, broadcast, private
	maxParticipants: integer('max_participants').default(50),
	settings: text('settings', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Voice Participants
export const voiceParticipants = sqliteTable('voice_participants', {
	id: text('id').primaryKey(),
	channelId: text('channel_id').notNull().references(() => voiceChannels.id, { onDelete: 'cascade' }),
	userId: text('user_id').notNull(),
	muted: integer('muted', { mode: 'boolean' }).default(false),
	deafened: integer('deafened', { mode: 'boolean' }).default(false),
	speaking: integer('speaking', { mode: 'boolean' }).default(false),
	joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Social Interactions
export const socialInteractions = sqliteTable('social_interactions', {
	id: text('id').primaryKey(),
	fromUserId: text('from_user_id').notNull(),
	toUserId: text('to_user_id').notNull(),
	type: text('type').notNull(), // friend_request, wave, high_five, emote
	worldId: text('world_id').references(() => virtualWorlds.id),
	status: text('status').default('pending'), // pending, accepted, rejected
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Friends
export const friends = sqliteTable('friends', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	friendId: text('friend_id').notNull(),
	status: text('status').notNull().default('active'), // active, blocked
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Virtual Events
export const virtualEvents = sqliteTable('virtual_events', {
	id: text('id').primaryKey(),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id),
	name: text('name').notNull(),
	description: text('description'),
	type: text('type').notNull(), // training, conference, social, competition
	startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
	endTime: integer('end_time', { mode: 'timestamp' }).notNull(),
	capacity: integer('capacity'),
	registrations: integer('registrations').default(0),
	status: text('status').notNull().default('scheduled'), // scheduled, live, completed, cancelled
	createdBy: text('created_by'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Event Registrations
export const eventRegistrations = sqliteTable('event_registrations', {
	id: text('id').primaryKey(),
	eventId: text('event_id').notNull().references(() => virtualEvents.id, { onDelete: 'cascade' }),
	userId: text('user_id').notNull(),
	status: text('status').notNull().default('registered'), // registered, attended, no_show
	registeredAt: integer('registered_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// 3D Assets
export const assets3d = sqliteTable('assets_3d', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(), // model, texture, material, animation
	format: text('format').notNull(), // gltf, fbx, obj, etc.
	url: text('url').notNull(),
	thumbnail: text('thumbnail'),
	size: integer('size'), // bytes
	metadata: text('metadata', { mode: 'json' }),
	tags: text('tags', { mode: 'json' }),
	uploadedBy: text('uploaded_by'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// VR/AR Devices
export const vrDevices = sqliteTable('vr_devices', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	deviceType: text('device_type').notNull(), // quest2, quest3, vive, index, hololens
	deviceId: text('device_id').notNull(),
	capabilities: text('capabilities', { mode: 'json' }),
	lastUsed: integer('last_used', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Performance Metrics (VR-specific)
export const vrPerformanceMetrics = sqliteTable('vr_performance_metrics', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	sessionId: text('session_id').notNull(),
	worldId: text('world_id').notNull().references(() => virtualWorlds.id),
	fps: real('fps'),
	latency: real('latency'),
	renderTime: real('render_time'),
	networkQuality: text('network_quality'),
	deviceType: text('device_type'),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Virtual Economy
export const virtualCurrency = sqliteTable('virtual_currency', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	currencyType: text('currency_type').notNull(), // coins, gems, tokens
	balance: integer('balance').notNull().default(0),
	earned: integer('earned').notNull().default(0),
	spent: integer('spent').notNull().default(0),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Transactions
export const transactions = sqliteTable('transactions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	type: text('type').notNull(), // earn, spend, transfer, purchase
	currencyType: text('currency_type').notNull(),
	amount: integer('amount').notNull(),
	itemId: text('item_id'),
	description: text('description'),
	metadata: text('metadata', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Leaderboards (3D/VR specific)
export const vrLeaderboards = sqliteTable('vr_leaderboards', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(), // quest, event, skill
	period: text('period').notNull(), // daily, weekly, monthly, all_time
	worldId: text('world_id').references(() => virtualWorlds.id),
	entries: text('entries', { mode: 'json' }),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Export types
export type VirtualWorld = typeof virtualWorlds.$inferSelect;
export type Avatar = typeof avatars.$inferSelect;
export type AvatarItem = typeof avatarItems.$inferSelect;
export type VirtualSpace = typeof virtualSpaces.$inferSelect;
export type ActiveSession = typeof activeSessions.$inferSelect;
export type MultiplayerQuest = typeof multiplayerQuests.$inferSelect;
export type QuestInstance = typeof questInstances.$inferSelect;
export type VoiceChannel = typeof voiceChannels.$inferSelect;
export type SocialInteraction = typeof socialInteractions.$inferSelect;
export type VirtualEvent = typeof virtualEvents.$inferSelect;
export type Asset3d = typeof assets3d.$inferSelect;
export type VrDevice = typeof vrDevices.$inferSelect;
export type VirtualCurrency = typeof virtualCurrency.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;

