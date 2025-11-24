import { Theme } from '../types';

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#10B981',
    secondary: '#0EA5E9',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0EA5E9',
    overlay: 'rgba(0, 0, 0, 0.5)',
    tabBarActive: '#10B981',
    tabBarInactive: '#94A3B8',
    inputBackground: '#F1F5F9',
    shadow: '#000000',
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#10B981',
    secondary: '#0EA5E9',
    background: '#1C2333',
    card: '#283142',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#3E4A61',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#0EA5E9',
    overlay: 'rgba(0, 0, 0, 0.7)',
    tabBarActive: '#10B981',
    tabBarInactive: '#64748B',
    inputBackground: '#3E4A61',
    shadow: '#000000',
  },
};
