import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class StorageService {
  static StorageService? _instance;
  static SharedPreferences? _preferences;

  StorageService._();

  static Future<StorageService> getInstance() async {
    _instance ??= StorageService._();
    _preferences ??= await SharedPreferences.getInstance();
    return _instance!;
  }

  // Auth token
  Future<void> saveAuthToken(String token) async {
    await _preferences?.setString('auth_token', token);
  }

  String? getAuthToken() {
    return _preferences?.getString('auth_token');
  }

  Future<void> clearAuthToken() async {
    await _preferences?.remove('auth_token');
  }

  // User data
  Future<void> saveUserData(Map<String, dynamic> userData) async {
    await _preferences?.setString('user_data', json.encode(userData));
  }

  Map<String, dynamic>? getUserData() {
    final data = _preferences?.getString('user_data');
    if (data != null) {
      return json.decode(data);
    }
    return null;
  }

  Future<void> clearUserData() async {
    await _preferences?.remove('user_data');
  }

  // Theme preference
  Future<void> saveThemeMode(String mode) async {
    await _preferences?.setString('theme_mode', mode);
  }

  String getThemeMode() {
    return _preferences?.getString('theme_mode') ?? 'system';
  }

  // Onboarding
  Future<void> setOnboardingComplete() async {
    await _preferences?.setBool('onboarding_complete', true);
  }

  bool isOnboardingComplete() {
    return _preferences?.getBool('onboarding_complete') ?? false;
  }

  // Notifications
  Future<void> setNotificationsEnabled(bool enabled) async {
    await _preferences?.setBool('notifications_enabled', enabled);
  }

  bool areNotificationsEnabled() {
    return _preferences?.getBool('notifications_enabled') ?? true;
  }

  // Cache
  Future<void> cacheData(String key, Map<String, dynamic> data) async {
    await _preferences?.setString('cache_$key', json.encode(data));
  }

  Map<String, dynamic>? getCachedData(String key) {
    final data = _preferences?.getString('cache_$key');
    if (data != null) {
      return json.decode(data);
    }
    return null;
  }

  Future<void> clearCache() async {
    final keys = _preferences?.getKeys() ?? {};
    for (final key in keys) {
      if (key.startsWith('cache_')) {
        await _preferences?.remove(key);
      }
    }
  }

  // Clear all data
  Future<void> clearAll() async {
    await _preferences?.clear();
  }
}

