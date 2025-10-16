import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================
// AI-POWERED SCHEMA FOR PRODUCTION 4
// Includes: ML Models, AI Generation, Personalization, Predictions
// ============================================

// AI Models
export const aiModels = sqliteTable('ai_models', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	type: text('type').notNull(), // recommendation, prediction, generation, classification
	version: text('version').notNull(),
	provider: text('provider').notNull(), // openai, custom, tensorflow
	config: text('config', { mode: 'json' }),
	status: text('status').notNull().default('active'), // active, training, deprecated
	accuracy: real('accuracy'),
	lastTrainedAt: integer('last_trained_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// User Learning Profiles (AI-powered)
export const userLearningProfiles = sqliteTable('user_learning_profiles', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().unique(),
	learningStyle: text('learning_style'), // visual, auditory, kinesthetic, reading
	pace: text('pace'), // slow, medium, fast
	preferredDifficulty: text('preferred_difficulty'),
	strengths: text('strengths', { mode: 'json' }),
	weaknesses: text('weaknesses', { mode: 'json' }),
	interests: text('interests', { mode: 'json' }),
	goals: text('goals', { mode: 'json' }),
	aiInsights: text('ai_insights', { mode: 'json' }),
	lastUpdated: integer('last_updated', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// AI-Generated Quests
export const aiGeneratedQuests = sqliteTable('ai_generated_quests', {
	id: text('id').primaryKey(),
	userId: text('user_id'),
	title: text('title').notNull(),
	description: text('description').notNull(),
	content: text('content', { mode: 'json' }).notNull(),
	difficulty: text('difficulty').notNull(),
	category: text('category').notNull(),
	generationPrompt: text('generation_prompt'),
	modelId: text('model_id').references(() => aiModels.id),
	quality_score: real('quality_score'),
	status: text('status').notNull().default('draft'), // draft, approved, published
	approvedBy: text('approved_by'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Personalized Recommendations
export const recommendations = sqliteTable('recommendations', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	itemType: text('item_type').notNull(), // quest, achievement, learning_path
	itemId: text('item_id').notNull(),
	score: real('score').notNull(),
	reason: text('reason', { mode: 'json' }),
	modelId: text('model_id').references(() => aiModels.id),
	shown: integer('shown', { mode: 'boolean' }).default(false),
	clicked: integer('clicked', { mode: 'boolean' }).default(false),
	completed: integer('completed', { mode: 'boolean' }).default(false),
	feedback: text('feedback'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Performance Predictions
export const performancePredictions = sqliteTable('performance_predictions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	questId: text('quest_id'),
	predictionType: text('prediction_type').notNull(), // completion_time, success_rate, score
	predictedValue: real('predicted_value').notNull(),
	confidence: real('confidence').notNull(),
	actualValue: real('actual_value'),
	modelId: text('model_id').references(() => aiModels.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Churn Predictions
export const churnPredictions = sqliteTable('churn_predictions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	churnProbability: real('churn_probability').notNull(),
	riskLevel: text('risk_level').notNull(), // low, medium, high
	factors: text('factors', { mode: 'json' }),
	recommendations: text('recommendations', { mode: 'json' }),
	modelId: text('model_id').references(() => aiModels.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Engagement Optimization
export const engagementOptimization = sqliteTable('engagement_optimization', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	optimizationType: text('optimization_type').notNull(), // notification_timing, content_type, difficulty
	currentValue: text('current_value'),
	suggestedValue: text('suggested_value'),
	expectedImprovement: real('expected_improvement'),
	applied: integer('applied', { mode: 'boolean' }).default(false),
	result: text('result', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// AI Chatbot Conversations
export const chatbotConversations = sqliteTable('chatbot_conversations', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	sessionId: text('session_id').notNull(),
	messages: text('messages', { mode: 'json' }).notNull(),
	context: text('context', { mode: 'json' }),
	sentiment: text('sentiment'),
	resolved: integer('resolved', { mode: 'boolean' }).default(false),
	rating: integer('rating'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Content Embeddings (for semantic search)
export const contentEmbeddings = sqliteTable('content_embeddings', {
	id: text('id').primaryKey(),
	contentType: text('content_type').notNull(),
	contentId: text('content_id').notNull(),
	embedding: text('embedding', { mode: 'json' }).notNull(),
	modelId: text('model_id').references(() => aiModels.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Anomaly Detection
export const anomalies = sqliteTable('anomalies', {
	id: text('id').primaryKey(),
	userId: text('user_id'),
	anomalyType: text('anomaly_type').notNull(),
	description: text('description').notNull(),
	severity: text('severity').notNull(), // low, medium, high
	data: text('data', { mode: 'json' }),
	status: text('status').notNull().default('detected'), // detected, investigating, resolved, false_positive
	modelId: text('model_id').references(() => aiModels.id),
	detectedAt: integer('detected_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Pattern Recognition
export const patterns = sqliteTable('patterns', {
	id: text('id').primaryKey(),
	patternType: text('pattern_type').notNull(),
	name: text('name').notNull(),
	description: text('description'),
	conditions: text('conditions', { mode: 'json' }).notNull(),
	frequency: integer('frequency'),
	confidence: real('confidence'),
	insights: text('insights', { mode: 'json' }),
	modelId: text('model_id').references(() => aiModels.id),
	discoveredAt: integer('discovered_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Adaptive Difficulty
export const adaptiveDifficulty = sqliteTable('adaptive_difficulty', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	questId: text('quest_id').notNull(),
	originalDifficulty: text('original_difficulty').notNull(),
	adjustedDifficulty: text('adjusted_difficulty').notNull(),
	adjustmentReason: text('adjustment_reason', { mode: 'json' }),
	performance: real('performance'),
	modelId: text('model_id').references(() => aiModels.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Smart Notifications
export const smartNotifications = sqliteTable('smart_notifications', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	notificationType: text('notification_type').notNull(),
	content: text('content').notNull(),
	scheduledFor: integer('scheduled_for', { mode: 'timestamp' }).notNull(),
	priority: integer('priority').notNull(),
	channel: text('channel').notNull(), // email, push, sms
	personalizationData: text('personalization_data', { mode: 'json' }),
	sent: integer('sent', { mode: 'boolean' }).default(false),
	opened: integer('opened', { mode: 'boolean' }).default(false),
	clicked: integer('clicked', { mode: 'boolean' }).default(false),
	modelId: text('model_id').references(() => aiModels.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// AI-Generated Assessments
export const aiAssessments = sqliteTable('ai_assessments', {
	id: text('id').primaryKey(),
	questId: text('quest_id').notNull(),
	questions: text('questions', { mode: 'json' }).notNull(),
	difficulty: text('difficulty').notNull(),
	estimatedTime: integer('estimated_time'),
	generationPrompt: text('generation_prompt'),
	modelId: text('model_id').references(() => aiModels.id),
	qualityScore: real('quality_score'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Learning Analytics (AI-enhanced)
export const learningAnalytics = sqliteTable('learning_analytics', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	period: text('period').notNull(), // daily, weekly, monthly
	metrics: text('metrics', { mode: 'json' }).notNull(),
	insights: text('insights', { mode: 'json' }),
	predictions: text('predictions', { mode: 'json' }),
	recommendations: text('recommendations', { mode: 'json' }),
	modelId: text('model_id').references(() => aiModels.id),
	generatedAt: integer('generated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Cohort Analysis (AI-powered)
export const cohortAnalysis = sqliteTable('cohort_analysis', {
	id: text('id').primaryKey(),
	cohortName: text('cohort_name').notNull(),
	cohortDefinition: text('cohort_definition', { mode: 'json' }).notNull(),
	userCount: integer('user_count'),
	metrics: text('metrics', { mode: 'json' }),
	insights: text('insights', { mode: 'json' }),
	trends: text('trends', { mode: 'json' }),
	modelId: text('model_id').references(() => aiModels.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// AI Training Data
export const aiTrainingData = sqliteTable('ai_training_data', {
	id: text('id').primaryKey(),
	modelId: text('model_id').references(() => aiModels.id),
	dataType: text('data_type').notNull(),
	features: text('features', { mode: 'json' }).notNull(),
	labels: text('labels', { mode: 'json' }),
	metadata: text('metadata', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Export types
export type AiModel = typeof aiModels.$inferSelect;
export type UserLearningProfile = typeof userLearningProfiles.$inferSelect;
export type AiGeneratedQuest = typeof aiGeneratedQuests.$inferSelect;
export type Recommendation = typeof recommendations.$inferSelect;
export type PerformancePrediction = typeof performancePredictions.$inferSelect;
export type ChurnPrediction = typeof churnPredictions.$inferSelect;
export type EngagementOptimization = typeof engagementOptimization.$inferSelect;
export type ChatbotConversation = typeof chatbotConversations.$inferSelect;
export type ContentEmbedding = typeof contentEmbeddings.$inferSelect;
export type Anomaly = typeof anomalies.$inferSelect;
export type Pattern = typeof patterns.$inferSelect;
export type AdaptiveDifficulty = typeof adaptiveDifficulty.$inferSelect;
export type SmartNotification = typeof smartNotifications.$inferSelect;
export type AiAssessment = typeof aiAssessments.$inferSelect;
export type LearningAnalytics = typeof learningAnalytics.$inferSelect;
export type CohortAnalysis = typeof cohortAnalysis.$inferSelect;

