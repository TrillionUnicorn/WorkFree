import { db } from './index';
import { quests, achievements } from './schema';
import { generateId } from 'lucia';

export async function seedDatabase() {
	console.log('🌱 Seeding database...');

	// Seed quests
	const sampleQuests = [
		{
			id: generateId(15),
			title: 'Introduction to VR Training',
			description: 'Learn the basics of virtual reality training and how to navigate the WorkFree platform.',
			difficulty: 'beginner',
			category: 'Onboarding',
			durationMinutes: 15,
			xpReward: 100,
			content: {
				steps: [
					{
						title: 'Welcome to WorkFree',
						content: '<p>Welcome to WorkFree! This quest will introduce you to the basics of VR training.</p><p>You will learn how to navigate the platform, start quests, and track your progress.</p>'
					},
					{
						title: 'Understanding VR Training',
						content: '<p>VR training provides immersive learning experiences that are more engaging and effective than traditional methods.</p><p>Studies show that VR training can improve retention by up to 75%.</p>'
					},
					{
						title: 'Your First Steps',
						content: '<p>To get started, simply browse the quest catalog, select a quest that interests you, and click "Start Quest".</p><p>You can track your progress in the dashboard.</p>'
					}
				]
			},
			isPublished: true
		},
		{
			id: generateId(15),
			title: 'Customer Service Excellence',
			description: 'Master the art of exceptional customer service through interactive scenarios.',
			difficulty: 'intermediate',
			category: 'Customer Service',
			durationMinutes: 30,
			xpReward: 250,
			content: {
				steps: [
					{
						title: 'Understanding Customer Needs',
						content: '<p>The first step in excellent customer service is understanding what your customer needs.</p><p>Active listening is key to identifying their pain points.</p>'
					},
					{
						title: 'Effective Communication',
						content: '<p>Clear, empathetic communication builds trust and rapport with customers.</p><p>Use positive language and avoid jargon.</p>'
					},
					{
						title: 'Problem Resolution',
						content: '<p>Learn systematic approaches to resolving customer issues quickly and effectively.</p><p>Always follow up to ensure satisfaction.</p>'
					},
					{
						title: 'Going Above and Beyond',
						content: '<p>Exceptional service means exceeding expectations.</p><p>Look for opportunities to delight your customers.</p>'
					}
				]
			},
			isPublished: true
		},
		{
			id: generateId(15),
			title: 'Safety Procedures in Manufacturing',
			description: 'Learn critical safety protocols for manufacturing environments.',
			difficulty: 'advanced',
			category: 'Safety',
			durationMinutes: 45,
			xpReward: 500,
			content: {
				steps: [
					{
						title: 'Personal Protective Equipment',
						content: '<p>Proper PPE is your first line of defense in manufacturing.</p><p>Learn when and how to use each type of equipment.</p>'
					},
					{
						title: 'Machine Safety',
						content: '<p>Understanding machine guards, lockout/tagout procedures, and emergency stops.</p><p>Never bypass safety mechanisms.</p>'
					},
					{
						title: 'Hazard Identification',
						content: '<p>Learn to identify potential hazards before they cause accidents.</p><p>Report all safety concerns immediately.</p>'
					},
					{
						title: 'Emergency Response',
						content: '<p>Know your facility\'s emergency procedures and evacuation routes.</p><p>Practice makes perfect in emergency situations.</p>'
					},
					{
						title: 'Safety Culture',
						content: '<p>Building a culture of safety requires everyone\'s participation.</p><p>Lead by example and encourage others to prioritize safety.</p>'
					}
				]
			},
			isPublished: true
		},
		{
			id: generateId(15),
			title: 'Sales Fundamentals',
			description: 'Build a strong foundation in sales techniques and customer relationship management.',
			difficulty: 'beginner',
			category: 'Sales',
			durationMinutes: 25,
			xpReward: 150,
			content: {
				steps: [
					{
						title: 'Understanding Your Product',
						content: '<p>You can\'t sell what you don\'t understand.</p><p>Learn your product inside and out.</p>'
					},
					{
						title: 'Identifying Prospects',
						content: '<p>Not everyone is your customer.</p><p>Learn to identify and qualify prospects.</p>'
					},
					{
						title: 'The Sales Process',
						content: '<p>Follow a proven sales process: Prospect, Connect, Research, Present, Close, Delight.</p>'
					}
				]
			},
			isPublished: true
		},
		{
			id: generateId(15),
			title: 'Leadership Essentials',
			description: 'Develop core leadership skills to inspire and guide your team.',
			difficulty: 'intermediate',
			category: 'Leadership',
			durationMinutes: 40,
			xpReward: 300,
			content: {
				steps: [
					{
						title: 'What Makes a Great Leader',
						content: '<p>Great leaders inspire, motivate, and empower their teams.</p><p>Leadership is about influence, not authority.</p>'
					},
					{
						title: 'Communication Skills',
						content: '<p>Clear communication is the foundation of effective leadership.</p><p>Listen more than you speak.</p>'
					},
					{
						title: 'Decision Making',
						content: '<p>Leaders make tough decisions with incomplete information.</p><p>Learn frameworks for better decision making.</p>'
					},
					{
						title: 'Building Trust',
						content: '<p>Trust is earned through consistency and integrity.</p><p>Be transparent and follow through on commitments.</p>'
					}
				]
			},
			isPublished: true
		}
	];

	// Insert quests
	for (const quest of sampleQuests) {
		await db.insert(quests).values(quest).onConflictDoNothing();
	}

	console.log(`✅ Seeded ${sampleQuests.length} quests`);

	// Seed achievements
	const sampleAchievements = [
		{
			id: generateId(15),
			name: 'First Steps',
			description: 'Complete your first quest',
			iconUrl: '/achievements/first-steps.svg',
			criteria: { questsCompleted: 1 },
			xpReward: 50,
			rarity: 'common'
		},
		{
			id: generateId(15),
			name: 'Quick Learner',
			description: 'Complete 5 quests',
			iconUrl: '/achievements/quick-learner.svg',
			criteria: { questsCompleted: 5 },
			xpReward: 100,
			rarity: 'common'
		},
		{
			id: generateId(15),
			name: 'Dedicated Student',
			description: 'Complete 10 quests',
			iconUrl: '/achievements/dedicated-student.svg',
			criteria: { questsCompleted: 10 },
			xpReward: 250,
			rarity: 'rare'
		},
		{
			id: generateId(15),
			name: 'Master Learner',
			description: 'Complete 25 quests',
			iconUrl: '/achievements/master-learner.svg',
			criteria: { questsCompleted: 25 },
			xpReward: 500,
			rarity: 'epic'
		},
		{
			id: generateId(15),
			name: 'XP Hunter',
			description: 'Earn 1000 XP',
			iconUrl: '/achievements/xp-hunter.svg',
			criteria: { totalXP: 1000 },
			xpReward: 100,
			rarity: 'rare'
		},
		{
			id: generateId(15),
			name: 'Perfect Score',
			description: 'Complete a quest with 100% score',
			iconUrl: '/achievements/perfect-score.svg',
			criteria: { perfectScore: true },
			xpReward: 150,
			rarity: 'rare'
		},
		{
			id: generateId(15),
			name: 'Speed Runner',
			description: 'Complete a quest in under 10 minutes',
			iconUrl: '/achievements/speed-runner.svg',
			criteria: { fastCompletion: true },
			xpReward: 200,
			rarity: 'epic'
		},
		{
			id: generateId(15),
			name: 'Legend',
			description: 'Complete 100 quests',
			iconUrl: '/achievements/legend.svg',
			criteria: { questsCompleted: 100 },
			xpReward: 1000,
			rarity: 'legendary'
		}
	];

	// Insert achievements
	for (const achievement of sampleAchievements) {
		await db.insert(achievements).values(achievement).onConflictDoNothing();
	}

	console.log(`✅ Seeded ${sampleAchievements.length} achievements`);
	console.log('🎉 Database seeding complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
	await seedDatabase();
	process.exit(0);
}

