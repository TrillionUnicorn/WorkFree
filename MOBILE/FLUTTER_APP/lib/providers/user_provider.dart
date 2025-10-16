import 'package:flutter/foundation.dart';

class UserProfile {
  final String id;
  final String email;
  final String name;
  final String? avatar;
  final int xp;
  final int level;
  final int questsCompleted;
  final int achievementsUnlocked;

  UserProfile({
    required this.id,
    required this.email,
    required this.name,
    this.avatar,
    this.xp = 0,
    this.level = 1,
    this.questsCompleted = 0,
    this.achievementsUnlocked = 0,
  });

  factory UserProfile.fromJson(Map<String, dynamic> json) {
    return UserProfile(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      name: json['name'] ?? '',
      avatar: json['avatar'],
      xp: json['xp'] ?? 0,
      level: json['level'] ?? 1,
      questsCompleted: json['questsCompleted'] ?? 0,
      achievementsUnlocked: json['achievementsUnlocked'] ?? 0,
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
    };
  }
}

class UserProvider with ChangeNotifier {
  UserProfile? _userProfile;
  bool _isLoading = false;
  String? _errorMessage;

  UserProfile? get userProfile => _userProfile;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> fetchUserProfile(String userId) async {
    try {
      _isLoading = true;
      _errorMessage = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      // Mock data
      _userProfile = UserProfile(
        id: userId,
        email: 'user@workfree.com',
        name: 'John Doe',
        xp: 1250,
        level: 5,
        questsCompleted: 12,
        achievementsUnlocked: 8,
      );

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Failed to fetch user profile';
      notifyListeners();
    }
  }

  Future<bool> updateProfile({
    String? name,
    String? avatar,
  }) async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      if (_userProfile != null) {
        _userProfile = UserProfile(
          id: _userProfile!.id,
          email: _userProfile!.email,
          name: name ?? _userProfile!.name,
          avatar: avatar ?? _userProfile!.avatar,
          xp: _userProfile!.xp,
          level: _userProfile!.level,
          questsCompleted: _userProfile!.questsCompleted,
          achievementsUnlocked: _userProfile!.achievementsUnlocked,
        );
      }

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Failed to update profile';
      notifyListeners();
      return false;
    }
  }

  void addXP(int xp) {
    if (_userProfile != null) {
      final newXP = _userProfile!.xp + xp;
      final newLevel = (newXP / 250).floor() + 1;

      _userProfile = UserProfile(
        id: _userProfile!.id,
        email: _userProfile!.email,
        name: _userProfile!.name,
        avatar: _userProfile!.avatar,
        xp: newXP,
        level: newLevel,
        questsCompleted: _userProfile!.questsCompleted,
        achievementsUnlocked: _userProfile!.achievementsUnlocked,
      );

      notifyListeners();
    }
  }

  void incrementQuestsCompleted() {
    if (_userProfile != null) {
      _userProfile = UserProfile(
        id: _userProfile!.id,
        email: _userProfile!.email,
        name: _userProfile!.name,
        avatar: _userProfile!.avatar,
        xp: _userProfile!.xp,
        level: _userProfile!.level,
        questsCompleted: _userProfile!.questsCompleted + 1,
        achievementsUnlocked: _userProfile!.achievementsUnlocked,
      );

      notifyListeners();
    }
  }

  void incrementAchievementsUnlocked() {
    if (_userProfile != null) {
      _userProfile = UserProfile(
        id: _userProfile!.id,
        email: _userProfile!.email,
        name: _userProfile!.name,
        avatar: _userProfile!.avatar,
        xp: _userProfile!.xp,
        level: _userProfile!.level,
        questsCompleted: _userProfile!.questsCompleted,
        achievementsUnlocked: _userProfile!.achievementsUnlocked + 1,
      );

      notifyListeners();
    }
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void clearProfile() {
    _userProfile = null;
    notifyListeners();
  }
}

