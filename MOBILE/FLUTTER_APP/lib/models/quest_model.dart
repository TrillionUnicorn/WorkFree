class QuestModel {
  final String id;
  final String title;
  final String description;
  final String category;
  final String difficulty;
  final int duration;
  final int xp;
  final String status;
  final List<String>? requirements;
  final Map<String, dynamic>? content;
  final DateTime createdAt;

  QuestModel({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.difficulty,
    required this.duration,
    required this.xp,
    this.status = 'not_started',
    this.requirements,
    this.content,
    required this.createdAt,
  });

  factory QuestModel.fromJson(Map<String, dynamic> json) {
    return QuestModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      category: json['category'] ?? '',
      difficulty: json['difficulty'] ?? '',
      duration: json['duration'] ?? 0,
      xp: json['xp'] ?? 0,
      status: json['status'] ?? 'not_started',
      requirements: json['requirements'] != null 
          ? List<String>.from(json['requirements']) 
          : null,
      content: json['content'],
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category,
      'difficulty': difficulty,
      'duration': duration,
      'xp': xp,
      'status': status,
      'requirements': requirements,
      'content': content,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

class AchievementModel {
  final String id;
  final String name;
  final String description;
  final String icon;
  final String rarity;
  final int xp;
  final bool unlocked;
  final DateTime? unlockedAt;

  AchievementModel({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    required this.rarity,
    required this.xp,
    this.unlocked = false,
    this.unlockedAt,
  });

  factory AchievementModel.fromJson(Map<String, dynamic> json) {
    return AchievementModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      icon: json['icon'] ?? '',
      rarity: json['rarity'] ?? 'common',
      xp: json['xp'] ?? 0,
      unlocked: json['unlocked'] ?? false,
      unlockedAt: json['unlockedAt'] != null 
          ? DateTime.parse(json['unlockedAt']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'icon': icon,
      'rarity': rarity,
      'xp': xp,
      'unlocked': unlocked,
      'unlockedAt': unlockedAt?.toIso8601String(),
    };
  }
}

class LeaderboardModel {
  final String userId;
  final String userName;
  final String? avatar;
  final int rank;
  final int xp;
  final int level;
  final int questsCompleted;

  LeaderboardModel({
    required this.userId,
    required this.userName,
    this.avatar,
    required this.rank,
    required this.xp,
    required this.level,
    required this.questsCompleted,
  });

  factory LeaderboardModel.fromJson(Map<String, dynamic> json) {
    return LeaderboardModel(
      userId: json['userId'] ?? '',
      userName: json['userName'] ?? '',
      avatar: json['avatar'],
      rank: json['rank'] ?? 0,
      xp: json['xp'] ?? 0,
      level: json['level'] ?? 1,
      questsCompleted: json['questsCompleted'] ?? 0,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userId': userId,
      'userName': userName,
      'avatar': avatar,
      'rank': rank,
      'xp': xp,
      'level': level,
      'questsCompleted': questsCompleted,
    };
  }
}

