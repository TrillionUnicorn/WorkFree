import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'https://api.workfree.com'; // Replace with actual API URL
  
  final http.Client _client;
  String? _authToken;

  ApiService({http.Client? client}) : _client = client ?? http.Client();

  void setAuthToken(String token) {
    _authToken = token;
  }

  void clearAuthToken() {
    _authToken = null;
  }

  Map<String, String> get _headers {
    final headers = {
      'Content-Type': 'application/json',
    };
    if (_authToken != null) {
      headers['Authorization'] = 'Bearer $_authToken';
    }
    return headers;
  }

  // User endpoints
  Future<Map<String, dynamic>> getUserProfile(String userId) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/users/$userId'),
      headers: _headers,
    );
    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> updateUserProfile(String userId, Map<String, dynamic> data) async {
    final response = await _client.put(
      Uri.parse('$baseUrl/users/$userId'),
      headers: _headers,
      body: json.encode(data),
    );
    return _handleResponse(response);
  }

  // Quest endpoints
  Future<List<dynamic>> getQuests({String? category, String? difficulty}) async {
    var url = '$baseUrl/quests';
    final queryParams = <String, String>{};
    if (category != null) queryParams['category'] = category;
    if (difficulty != null) queryParams['difficulty'] = difficulty;
    
    if (queryParams.isNotEmpty) {
      url += '?${Uri(queryParameters: queryParams).query}';
    }

    final response = await _client.get(
      Uri.parse(url),
      headers: _headers,
    );
    final data = _handleResponse(response);
    return data['quests'] ?? [];
  }

  Future<Map<String, dynamic>> getQuest(String questId) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/quests/$questId'),
      headers: _headers,
    );
    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> startQuest(String questId) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/quests/$questId/start'),
      headers: _headers,
    );
    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> completeQuest(String questId, Map<String, dynamic> data) async {
    final response = await _client.post(
      Uri.parse('$baseUrl/quests/$questId/complete'),
      headers: _headers,
      body: json.encode(data),
    );
    return _handleResponse(response);
  }

  // Achievement endpoints
  Future<List<dynamic>> getAchievements() async {
    final response = await _client.get(
      Uri.parse('$baseUrl/achievements'),
      headers: _headers,
    );
    final data = _handleResponse(response);
    return data['achievements'] ?? [];
  }

  Future<List<dynamic>> getUserAchievements(String userId) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/users/$userId/achievements'),
      headers: _headers,
    );
    final data = _handleResponse(response);
    return data['achievements'] ?? [];
  }

  // Leaderboard endpoints
  Future<List<dynamic>> getLeaderboard({String period = 'all_time'}) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/leaderboard?period=$period'),
      headers: _headers,
    );
    final data = _handleResponse(response);
    return data['leaderboard'] ?? [];
  }

  // Progress endpoints
  Future<Map<String, dynamic>> getUserProgress(String userId) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/users/$userId/progress'),
      headers: _headers,
    );
    return _handleResponse(response);
  }

  Future<Map<String, dynamic>> updateProgress(String questId, Map<String, dynamic> data) async {
    final response = await _client.put(
      Uri.parse('$baseUrl/progress/$questId'),
      headers: _headers,
      body: json.encode(data),
    );
    return _handleResponse(response);
  }

  // Analytics endpoints
  Future<Map<String, dynamic>> getUserStats(String userId) async {
    final response = await _client.get(
      Uri.parse('$baseUrl/users/$userId/stats'),
      headers: _headers,
    );
    return _handleResponse(response);
  }

  // Helper method to handle responses
  Map<String, dynamic> _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return json.decode(response.body);
    } else if (response.statusCode == 401) {
      throw Exception('Unauthorized - Please login again');
    } else if (response.statusCode == 404) {
      throw Exception('Resource not found');
    } else if (response.statusCode >= 500) {
      throw Exception('Server error - Please try again later');
    } else {
      final error = json.decode(response.body);
      throw Exception(error['message'] ?? 'Request failed');
    }
  }

  void dispose() {
    _client.close();
  }
}

