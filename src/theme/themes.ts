import { Theme } from '../types';

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#20B2AA',
    secondary: '#4DB8E8',
    background: '#F0F9FF',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#4DB8E8',
    overlay: 'rgba(0, 0, 0, 0.5)',
    tabBarActive: '#20B2AA',
    tabBarInactive: '#94A3B8',
    inputBackground: '#F1F5F9',
    shadow: '#000000',
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#20B2AA',
    secondary: '#4DB8E8',
    background: '#0F172A',
    card: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#4DB8E8',
    overlay: 'rgba(0, 0, 0, 0.7)',
    tabBarActive: '#20B2AA',
    tabBarInactive: '#64748B',
    inputBackground: '#334155',
    shadow: '#000000',
  },
};
