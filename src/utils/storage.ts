import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USER_KEY = '@gomate_user';
const TOKEN_KEY = '@gomate_token';
const FAVORITES_KEY = '@gomate_favorites';

export const storageService = {
  // User storage
  saveUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
      const token = (user as any).token;
      if (typeof token === 'string') {
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  },

  getUser: async (): Promise<User | null> => {
    try {
      const userString = await AsyncStorage.getItem(USER_KEY);
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  removeUser: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([USER_KEY, TOKEN_KEY]);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  },

  // Favorites storage
  saveFavorites: async (favorites: string[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  getFavorites: async (): Promise<string[]> => {
    try {
      const favoritesString = await AsyncStorage.getItem(FAVORITES_KEY);
      return favoritesString ? JSON.parse(favoritesString) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },
};
