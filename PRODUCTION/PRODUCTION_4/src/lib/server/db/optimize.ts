import { db } from './index';
import { sql } from 'drizzle-orm';

/**
 * Database optimization utilities
 */

export async function optimizeDatabase() {
	console.log('🔧 Optimizing database...');

	// Analyze tables for query optimization
	await db.run(sql`ANALYZE`);

	// Vacuum to reclaim space
	await db.run(sql`VACUUM`);

	// Enable WAL mode for better concurrency
	await db.run(sql`PRAGMA journal_mode = WAL`);

	// Set cache size (10MB)
	await db.run(sql`PRAGMA cache_size = -10000`);

	// Enable foreign keys
	await db.run(sql`PRAGMA foreign_keys = ON`);

	// Set synchronous mode for better performance
	await db.run(sql`PRAGMA synchronous = NORMAL`);

	// Set temp store to memory
	await db.run(sql`PRAGMA temp_store = MEMORY`);

	// Set mmap size for better performance (256MB)
	await db.run(sql`PRAGMA mmap_size = 268435456`);

	console.log('✅ Database optimized');
}

export async function getDatabaseStats() {
	const stats = await db.all(sql`
		SELECT 
			name,
			(SELECT COUNT(*) FROM sqlite_master WHERE type='table' AND name=m.name) as table_count,
			(SELECT COUNT(*) FROM sqlite_master WHERE type='index' AND tbl_name=m.name) as index_count
		FROM sqlite_master m
		WHERE type='table'
		ORDER BY name
	`);

	return stats;
}

export async function getTableSizes() {
	const sizes = await db.all(sql`
		SELECT 
			name,
			SUM(pgsize) as size_bytes
		FROM dbstat
		WHERE name IN (SELECT name FROM sqlite_master WHERE type='table')
		GROUP BY name
		ORDER BY size_bytes DESC
	`);

	return sizes;
}

// Run optimization on startup in production
if (process.env.NODE_ENV === 'production') {
	optimizeDatabase().catch(console.error);
}

