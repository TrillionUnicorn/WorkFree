import 'package:flutter/foundation.dart';

class Quest {
  final String id;
  final String title;
  final String description;
  final String category;
  final String difficulty;
  final int duration;
  final int xp;
  final String status;

  Quest({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.difficulty,
    required this.duration,
    required this.xp,
    this.status = 'not_started',
  });

  factory Quest.fromJson(Map<String, dynamic> json) {
    return Quest(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      category: json['category'] ?? '',
      difficulty: json['difficulty'] ?? '',
      duration: json['duration'] ?? 0,
      xp: json['xp'] ?? 0,
      status: json['status'] ?? 'not_started',
    );
  }
}

class QuestProvider with ChangeNotifier {
  List<Quest> _quests = [];
  List<Quest> _userQuests = [];
  bool _isLoading = false;
  String? _errorMessage;
  String _selectedCategory = 'all';
  String _selectedDifficulty = 'all';

  List<Quest> get quests => _quests;
  List<Quest> get userQuests => _userQuests;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  String get selectedCategory => _selectedCategory;
  String get selectedDifficulty => _selectedDifficulty;

  List<Quest> get filteredQuests {
    return _quests.where((quest) {
      final categoryMatch = _selectedCategory == 'all' || quest.category == _selectedCategory;
      final difficultyMatch = _selectedDifficulty == 'all' || quest.difficulty == _selectedDifficulty;
      return categoryMatch && difficultyMatch;
    }).toList();
  }

  Future<void> fetchQuests() async {
    try {
      _isLoading = true;
      _errorMessage = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      // Mock data
      _quests = [
        Quest(
          id: '1',
          title: 'VR Safety Training',
          description: 'Learn essential VR safety protocols',
          category: 'Safety',
          difficulty: 'Beginner',
          duration: 30,
          xp: 100,
        ),
        Quest(
          id: '2',
          title: 'Advanced Equipment Operation',
          description: 'Master complex machinery in VR',
          category: 'Technical',
          difficulty: 'Advanced',
          duration: 60,
          xp: 300,
        ),
        Quest(
          id: '3',
          title: 'Emergency Response Simulation',
          description: 'Practice emergency procedures',
          category: 'Safety',
          difficulty: 'Intermediate',
          duration: 45,
          xp: 200,
        ),
      ];

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Failed to fetch quests';
      notifyListeners();
    }
  }

  Future<void> fetchUserQuests(String userId) async {
    try {
      _isLoading = true;
      _errorMessage = null;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      // Mock data
      _userQuests = [
        Quest(
          id: '1',
          title: 'VR Safety Training',
          description: 'Learn essential VR safety protocols',
          category: 'Safety',
          difficulty: 'Beginner',
          duration: 30,
          xp: 100,
          status: 'completed',
        ),
      ];

      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Failed to fetch user quests';
      notifyListeners();
    }
  }

  Future<bool> startQuest(String questId) async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Failed to start quest';
      notifyListeners();
      return false;
    }
  }

  Future<bool> completeQuest(String questId) async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate API call
      await Future.delayed(const Duration(seconds: 1));

      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Failed to complete quest';
      notifyListeners();
      return false;
    }
  }

  void setCategory(String category) {
    _selectedCategory = category;
    notifyListeners();
  }

  void setDifficulty(String difficulty) {
    _selectedDifficulty = difficulty;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }
}

