import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'gomate_user';
const USERS_STORAGE_KEY = 'gomate_users';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address',
        });
        return false;
      }

      // Validate password length
      if (password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Password',
          text2: 'Password must be at least 6 characters',
        });
        return false;
      }

      // Get all users
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Find user with matching email and password
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid email or password',
        });
        return false;
      }

      // Save current user
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(foundUser));
      setUser(foundUser);

      Toast.show({
        type: 'success',
        text1: 'Welcome Back!',
        text2: `Logged in as ${foundUser.name}`,
      });

      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to log in. Please try again.',
      });
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      // Validate name
      if (name.length < 2) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Name',
          text2: 'Name must be at least 2 characters',
        });
        return false;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address',
        });
        return false;
      }

      // Validate password length
      if (password.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Password',
          text2: 'Password must be at least 6 characters',
        });
        return false;
      }

      // Get all users
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Check if email already exists
      if (users.some((u) => u.email === email)) {
        Toast.show({
          type: 'error',
          text1: 'Email Already Exists',
          text2: 'Please use a different email or login',
        });
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };

      // Add to users array
      users.push(newUser);
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

      // Save as current user
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);

      Toast.show({
        type: 'success',
        text1: 'Account Created!',
        text2: `Welcome to GoMate, ${newUser.name}`,
      });

      return true;
    } catch (error) {
      console.error('Error registering:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create account. Please try again.',
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);

      Toast.show({
        type: 'success',
        text1: 'Logged Out Successfully',
        text2: 'See you next time!',
        position: 'top',
        visibilityTime: 3000,
      });
    } catch (error) {
      console.error('Error logging out:', error);
      Toast.show({
        type: 'error',
        text1: 'Logout Error',
        text2: 'Failed to logout. Please try again.',
        position: 'top',
      });
    }
  };

  const updateUser = async (updatedUser: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user in context:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  if (isLoading) {
    return null; // or a loading screen
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
