class UserModel {
  final String id;
  final String email;
  final String name;
  final String? avatar;
  final int xp;
  final int level;
  final int questsCompleted;
  final int achievementsUnlocked;
  final DateTime createdAt;
  final DateTime? lastLoginAt;

  UserModel({
    required this.id,
    required this.email,
    required this.name,
    this.avatar,
    this.xp = 0,
    this.level = 1,
    this.questsCompleted = 0,
    this.achievementsUnlocked = 0,
    required this.createdAt,
    this.lastLoginAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      name: json['name'] ?? '',
      avatar: json['avatar'],
      xp: json['xp'] ?? 0,
      level: json['level'] ?? 1,
      questsCompleted: json['questsCompleted'] ?? 0,
      achievementsUnlocked: json['achievementsUnlocked'] ?? 0,
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toIso8601String()),
      lastLoginAt: json['lastLoginAt'] != null ? DateTime.parse(json['lastLoginAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'avatar': avatar,
      'xp': xp,
      'level': level,
      'questsCompleted': questsCompleted,
      'achievementsUnlocked': achievementsUnlocked,
      'createdAt': createdAt.toIso8601String(),
      'lastLoginAt': lastLoginAt?.toIso8601String(),
    };
  }

  UserModel copyWith({
    String? id,
    String? email,
    String? name,
    String? avatar,
    int? xp,
    int? level,
    int? questsCompleted,
    int? achievementsUnlocked,
    DateTime? createdAt,
    DateTime? lastLoginAt,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      name: name ?? this.name,
      avatar: avatar ?? this.avatar,
      xp: xp ?? this.xp,
      level: level ?? this.level,
      questsCompleted: questsCompleted ?? this.questsCompleted,
      achievementsUnlocked: achievementsUnlocked ?? this.achievementsUnlocked,
      createdAt: createdAt ?? this.createdAt,
      lastLoginAt: lastLoginAt ?? this.lastLoginAt,
    );
  }
}

