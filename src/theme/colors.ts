// HSL to RGB/Hex color conversion for React Native
// Exact colors from design system specification

export const lightColors = {
  // Background & Surfaces
  background: '#FFFFFF',
  foreground: '#020617',
  card: '#FFFFFF',
  cardForeground: '#020617',
  
  // Primary - Emerald Green (Sri Lankan nature inspired)
  primary: '#34D399',
  primaryForeground: '#FFFFFF',
  
  // Secondary - Ocean Blue
  secondary: '#0EA5E9',
  secondaryForeground: '#FFFFFF',
  
  // Accent - Warm Sunset Orange
  accent: '#F97316',
  accentForeground: '#FFFFFF',
  
  // Muted & Borders
  muted: '#F1F5F9',
  mutedForeground: '#64748B',
  border: '#E2E8F0',
  input: '#E2E8F0',
  
  // Destructive
  destructive: '#EF4444',
  destructiveForeground: '#F8FAFC',
  
  // Ring/Focus
  ring: '#34D399',
  
  // Additional semantic colors
  text: '#020617',
  textSecondary: '#64748B',
};

export const darkColors = {
  // Background & Surfaces
  background: '#0F172A',
  foreground: '#F8FAFC',
  card: '#1E293B',
  cardForeground: '#F8FAFC',
  
  // Primary - Emerald Green (same as light)
  primary: '#34D399',
  primaryForeground: '#FFFFFF',
  
  // Secondary - Ocean Blue (same as light)
  secondary: '#0EA5E9',
  secondaryForeground: '#FFFFFF',
  
  // Accent - Warm Sunset Orange (same as light)
  accent: '#F97316',
  accentForeground: '#FFFFFF',
  
  // Muted & Borders
  muted: '#1E293B',
  mutedForeground: '#94A3B8',
  border: '#334155',
  input: '#334155',
  
  // Destructive
  destructive: '#7F1D1D',
  destructiveForeground: '#F8FAFC',
  
  // Ring/Focus
  ring: '#34D399',
  
  // Additional semantic colors
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
};

export type ColorScheme = typeof lightColors;
