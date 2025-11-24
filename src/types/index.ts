export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  status: 'Popular' | 'Trending' | 'Featured' | 'Hidden Gem';
  rating: number;
  province: string;
  bestTime: string;
  entryFee: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transportOptions: TransportOption[];
  highlights: string[];
}

export interface TransportOption {
  id: string;
  type: 'Bus' | 'Train' | 'Taxi' | 'Tuk-Tuk' | 'Private Vehicle';
  from: string;
  to: string;
  duration: string;
  cost: string;
  frequency: string;
  description: string;
  icon: string;
}

export interface FavoritesState {
  items: string[];
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  overlay: string;
  tabBarActive: string;
  tabBarInactive: string;
  inputBackground: string;
  shadow: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
}
