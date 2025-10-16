import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================
// ENTERPRISE SCHEMA FOR PRODUCTION 3
// Includes: Advanced Analytics, SSO, RBAC, Audit Logging
// ============================================

// Organizations (Enterprise level)
export const organizations = sqliteTable('organizations', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	domain: text('domain').unique(),
	plan: text('plan').notNull().default('enterprise'),
	ssoEnabled: integer('sso_enabled', { mode: 'boolean' }).default(false),
	ssoProvider: text('sso_provider'), // saml, oauth, ldap
	ssoConfig: text('sso_config', { mode: 'json' }),
	ipWhitelist: text('ip_whitelist', { mode: 'json' }),
	securitySettings: text('security_settings', { mode: 'json' }),
	complianceSettings: text('compliance_settings', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Departments (Enterprise structure)
export const departments = sqliteTable('departments', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	parentId: text('parent_id').references(() => departments.id),
	managerId: text('manager_id'),
	budget: real('budget'),
	settings: text('settings', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Roles (RBAC)
export const roles = sqliteTable('roles', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	permissions: text('permissions', { mode: 'json' }).notNull(),
	isSystem: integer('is_system', { mode: 'boolean' }).default(false),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Permissions (Granular access control)
export const permissions = sqliteTable('permissions', {
	id: text('id').primaryKey(),
	resource: text('resource').notNull(),
	action: text('action').notNull(),
	description: text('description'),
	category: text('category').notNull()
});

// User Roles (Many-to-many)
export const userRoles = sqliteTable('user_roles', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	roleId: text('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
	assignedBy: text('assigned_by'),
	assignedAt: integer('assigned_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Analytics Events (Advanced tracking)
export const analyticsEvents = sqliteTable('analytics_events', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	userId: text('user_id'),
	eventType: text('event_type').notNull(),
	eventName: text('event_name').notNull(),
	properties: text('properties', { mode: 'json' }),
	sessionId: text('session_id'),
	deviceInfo: text('device_info', { mode: 'json' }),
	location: text('location', { mode: 'json' }),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Performance Metrics
export const performanceMetrics = sqliteTable('performance_metrics', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	userId: text('user_id'),
	metricType: text('metric_type').notNull(),
	metricName: text('metric_name').notNull(),
	value: real('value').notNull(),
	unit: text('unit'),
	tags: text('tags', { mode: 'json' }),
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Custom Reports
export const customReports = sqliteTable('custom_reports', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	query: text('query', { mode: 'json' }).notNull(),
	schedule: text('schedule'), // cron expression
	recipients: text('recipients', { mode: 'json' }),
	format: text('format').notNull(), // pdf, csv, json
	createdBy: text('created_by'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Audit Trail (Enhanced)
export const auditTrail = sqliteTable('audit_trail', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	userId: text('user_id'),
	action: text('action').notNull(),
	resource: text('resource').notNull(),
	resourceId: text('resource_id'),
	changes: text('changes', { mode: 'json' }),
	metadata: text('metadata', { mode: 'json' }),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	severity: text('severity').notNull(), // low, medium, high, critical
	status: text('status').notNull(), // success, failure
	timestamp: integer('timestamp', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Compliance Records
export const complianceRecords = sqliteTable('compliance_records', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	standard: text('standard').notNull(), // GDPR, HIPAA, SOC2, etc.
	requirement: text('requirement').notNull(),
	status: text('status').notNull(), // compliant, non_compliant, in_progress
	evidence: text('evidence', { mode: 'json' }),
	lastAuditDate: integer('last_audit_date', { mode: 'timestamp' }),
	nextAuditDate: integer('next_audit_date', { mode: 'timestamp' }),
	assignedTo: text('assigned_to'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Data Retention Policies
export const dataRetentionPolicies = sqliteTable('data_retention_policies', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	dataType: text('data_type').notNull(),
	retentionPeriod: integer('retention_period').notNull(), // days
	archiveAfter: integer('archive_after'), // days
	deleteAfter: integer('delete_after'), // days
	exceptions: text('exceptions', { mode: 'json' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// SSO Sessions
export const ssoSessions = sqliteTable('sso_sessions', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	userId: text('user_id').notNull(),
	provider: text('provider').notNull(),
	providerId: text('provider_id').notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	expiresAt: integer('expires_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Two-Factor Authentication
export const twoFactorAuth = sqliteTable('two_factor_auth', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().unique(),
	secret: text('secret').notNull(),
	backupCodes: text('backup_codes', { mode: 'json' }),
	enabled: integer('enabled', { mode: 'boolean' }).notNull().default(false),
	verifiedAt: integer('verified_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Security Alerts
export const securityAlerts = sqliteTable('security_alerts', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	alertType: text('alert_type').notNull(),
	severity: text('severity').notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	affectedUsers: text('affected_users', { mode: 'json' }),
	status: text('status').notNull().default('open'), // open, investigating, resolved
	resolvedBy: text('resolved_by'),
	resolvedAt: integer('resolved_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Learning Paths (Enterprise training)
export const learningPaths = sqliteTable('learning_paths', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	departmentId: text('department_id').references(() => departments.id),
	requiredFor: text('required_for', { mode: 'json' }), // roles, departments
	quests: text('quests', { mode: 'json' }).notNull(),
	estimatedDuration: integer('estimated_duration'),
	createdBy: text('created_by'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// Certifications
export const certifications = sqliteTable('certifications', {
	id: text('id').primaryKey(),
	organizationId: text('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
	name: text('name').notNull(),
	description: text('description'),
	requirements: text('requirements', { mode: 'json' }),
	validityPeriod: integer('validity_period'), // days
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

// User Certifications
export const userCertifications = sqliteTable('user_certifications', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	certificationId: text('certification_id').notNull().references(() => certifications.id, { onDelete: 'cascade' }),
	issuedAt: integer('issued_at', { mode: 'timestamp' }).notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }),
	certificateUrl: text('certificate_url'),
	verificationCode: text('verification_code').unique()
});

// Export types
export type Organization = typeof organizations.$inferSelect;
export type Department = typeof departments.$inferSelect;
export type Role = typeof roles.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;
export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type CustomReport = typeof customReports.$inferSelect;
export type AuditTrail = typeof auditTrail.$inferSelect;
export type ComplianceRecord = typeof complianceRecords.$inferSelect;
export type SsoSession = typeof ssoSessions.$inferSelect;
export type TwoFactorAuth = typeof twoFactorAuth.$inferSelect;
export type SecurityAlert = typeof securityAlerts.$inferSelect;
export type LearningPath = typeof learningPaths.$inferSelect;
export type Certification = typeof certifications.$inferSelect;

