import { ViewStyle } from 'react-native';

// Light mode shadows
export const lightShadows = {
  card: {
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  } as ViewStyle,
  hover: {
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  } as ViewStyle,
};

// Dark mode shadows
export const darkShadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  } as ViewStyle,
  hover: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  } as ViewStyle,
};

export type ShadowScheme = typeof lightShadows;
