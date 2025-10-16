class AppConstants {
  // App Info
  static const String appName = 'WorkFree';
  static const String appVersion = '1.0.0';
  static const String appDescription = 'VR Training Platform';

  // API
  static const String apiBaseUrl = 'https://api.workfree.com';
  static const String apiVersion = 'v1';

  // Storage Keys
  static const String authTokenKey = 'auth_token';
  static const String userDataKey = 'user_data';
  static const String themeModeKey = 'theme_mode';

  // Quest Categories
  static const List<String> questCategories = [
    'Safety',
    'Technical',
    'Leadership',
    'Communication',
    'Problem Solving',
  ];

  // Difficulty Levels
  static const List<String> difficultyLevels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Expert',
  ];

  // Achievement Rarities
  static const List<String> achievementRarities = [
    'Common',
    'Rare',
    'Epic',
    'Legendary',
  ];

  // XP per Level
  static const int xpPerLevel = 250;

  // Pagination
  static const int defaultPageSize = 20;

  // Timeouts
  static const Duration apiTimeout = Duration(seconds: 30);
  static const Duration cacheTimeout = Duration(hours: 1);

  // Animation Durations
  static const Duration shortAnimation = Duration(milliseconds: 200);
  static const Duration mediumAnimation = Duration(milliseconds: 300);
  static const Duration longAnimation = Duration(milliseconds: 500);

  // URLs
  static const String websiteUrl = 'https://workfree.com';
  static const String supportEmail = 'support@workfree.com';
  static const String privacyPolicyUrl = 'https://workfree.com/privacy';
  static const String termsOfServiceUrl = 'https://workfree.com/terms';

  // Social Media
  static const String twitterUrl = 'https://twitter.com/workfree';
  static const String linkedinUrl = 'https://linkedin.com/company/workfree';
  static const String discordUrl = 'https://discord.gg/workfree';

  // Error Messages
  static const String networkError = 'Network error. Please check your connection.';
  static const String serverError = 'Server error. Please try again later.';
  static const String unknownError = 'An unknown error occurred.';
  static const String authError = 'Authentication failed. Please login again.';

  // Success Messages
  static const String questStarted = 'Quest started successfully!';
  static const String questCompleted = 'Quest completed! You earned {xp} XP.';
  static const String achievementUnlocked = 'Achievement unlocked!';
  static const String profileUpdated = 'Profile updated successfully!';
}

class AppColors {
  static const int primaryValue = 0xFF6366F1;
  static const int secondaryValue = 0xFFEC4899;
  static const int successValue = 0xFF10B981;
  static const int errorValue = 0xFFEF4444;
  static const int warningValue = 0xFFF59E0B;
  static const int infoValue = 0xFF3B82F6;
}

class AppAssets {
  // Images
  static const String logo = 'assets/images/logo.png';
  static const String logoWhite = 'assets/images/logo_white.png';
  static const String placeholder = 'assets/images/placeholder.png';
  static const String emptyState = 'assets/images/empty_state.png';

  // Icons
  static const String questIcon = 'assets/icons/quest.png';
  static const String achievementIcon = 'assets/icons/achievement.png';
  static const String leaderboardIcon = 'assets/icons/leaderboard.png';
  static const String profileIcon = 'assets/icons/profile.png';

  // Animations
  static const String loadingAnimation = 'assets/animations/loading.json';
  static const String successAnimation = 'assets/animations/success.json';
  static const String errorAnimation = 'assets/animations/error.json';
}

