import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from './src/theme';
import { AuthProvider } from './src/context/AuthContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // Use View for web, GestureHandlerRootView for native
  const RootComponent = Platform.OS === 'web' ? View : GestureHandlerRootView;
  
  return (
    <RootComponent style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <AppNavigator />
            <StatusBar style="auto" />
            <Toast />
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </RootComponent>
  );
}
