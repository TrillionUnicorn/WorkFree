import 'package:flutter/material.dart';

class AppRoutes {
  // Route names
  static const String splash = '/';
  static const String login = '/login';
  static const String register = '/register';
  static const String home = '/home';
  static const String dashboard = '/dashboard';
  static const String profile = '/profile';
  static const String quests = '/quests';
  static const String questDetail = '/quest-detail';
  static const String questCompletion = '/quest-completion';
  static const String achievements = '/achievements';
  static const String achievementDetail = '/achievement-detail';
  static const String leaderboard = '/leaderboard';
  static const String adminDashboard = '/admin-dashboard';
  static const String questManagement = '/quest-management';
  static const String userManagement = '/user-management';

  // Routes map
  static Map<String, WidgetBuilder> get routes {
    return {
      login: (context) => const LoginScreen(),
      register: (context) => const RegisterScreen(),
      home: (context) => const HomeScreen(),
      dashboard: (context) => const DashboardScreen(),
      profile: (context) => const ProfileScreen(),
      quests: (context) => const QuestsScreen(),
      achievements: (context) => const AchievementsScreen(),
      leaderboard: (context) => const LeaderboardScreen(),
      adminDashboard: (context) => const AdminDashboardScreen(),
      questManagement: (context) => const QuestManagementScreen(),
      userManagement: (context) => const UserManagementScreen(),
    };
  }

  // Route generator
  static Route<dynamic>? onGenerateRoute(RouteSettings settings) {
    switch (settings.name) {
      case questDetail:
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(
          builder: (context) => QuestDetailScreen(
            questId: args?['questId'] ?? '',
          ),
        );
      case achievementDetail:
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(
          builder: (context) => AchievementDetailScreen(
            achievementId: args?['achievementId'] ?? '',
          ),
        );
      case questCompletion:
        final args = settings.arguments as Map<String, dynamic>?;
        return MaterialPageRoute(
          builder: (context) => QuestCompletionScreen(
            questId: args?['questId'] ?? '',
          ),
        );
      default:
        return null;
    }
  }
}

// Placeholder screens (to be implemented)
class LoginScreen extends StatelessWidget {
  const LoginScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Login Screen')));
}

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Register Screen')));
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Home Screen')));
}

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Dashboard Screen')));
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Profile Screen')));
}

class QuestsScreen extends StatelessWidget {
  const QuestsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Quests Screen')));
}

class QuestDetailScreen extends StatelessWidget {
  final String questId;
  const QuestDetailScreen({Key? key, required this.questId}) : super(key: key);
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Quest Detail: $questId')));
}

class QuestCompletionScreen extends StatelessWidget {
  final String questId;
  const QuestCompletionScreen({Key? key, required this.questId}) : super(key: key);
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Quest Completion: $questId')));
}

class AchievementsScreen extends StatelessWidget {
  const AchievementsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Achievements Screen')));
}

class AchievementDetailScreen extends StatelessWidget {
  final String achievementId;
  const AchievementDetailScreen({Key? key, required this.achievementId}) : super(key: key);
  @override
  Widget build(BuildContext context) => Scaffold(body: Center(child: Text('Achievement Detail: $achievementId')));
}

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Leaderboard Screen')));
}

class AdminDashboardScreen extends StatelessWidget {
  const AdminDashboardScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Admin Dashboard')));
}

class QuestManagementScreen extends StatelessWidget {
  const QuestManagementScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Quest Management')));
}

class UserManagementScreen extends StatelessWidget {
  const UserManagementScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('User Management')));
}

