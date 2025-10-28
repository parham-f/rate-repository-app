import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.tokenKey = `${this.namespace}:accessToken`;
  }

  async getAccessToken() {
    try {
      return await AsyncStorage.getItem(this.tokenKey);
    } catch (e) {
      console.warn('getAccessToken failed:', e);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    try {
      if (accessToken == null) {
        await AsyncStorage.removeItem(this.tokenKey);
      } else {
        await AsyncStorage.setItem(this.tokenKey, String(accessToken));
      }
    } catch (e) {
      console.warn('setAccessToken failed:', e);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(this.tokenKey);
    } catch (e) {
      console.warn('removeAccessToken failed:', e);
    }
  }
}

export default AuthStorage;
