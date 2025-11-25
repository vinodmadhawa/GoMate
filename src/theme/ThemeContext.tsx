import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightColors, darkColors, ColorScheme } from './colors';
import { lightShadows, darkShadows, ShadowScheme } from './shadows';
import { gradients } from './gradients';
import { typography, spacing, borderRadius } from './typography';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  colors: ColorScheme;
  shadows: ShadowScheme;
  gradients: typeof gradients;
  typography: typeof typography;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'gomate_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'light' ? lightColors : darkColors;
  const shadows = theme === 'light' ? lightShadows : darkShadows;

  const value: ThemeContextType = {
    theme,
    colors,
    shadows,
    gradients,
    typography,
    spacing,
    borderRadius,
    toggleTheme,
  };

  if (isLoading) {
    return null; // or a loading screen
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Convenience hook for just colors
export const useThemeColors = () => {
  const { colors } = useTheme();
  return colors;
};
