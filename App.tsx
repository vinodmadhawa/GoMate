import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Platform, View } from 'react-native';
import { store } from './src/redux/store';
import { ThemeProvider } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // Use View for web, GestureHandlerRootView for native
  const RootComponent = Platform.OS === 'web' ? View : GestureHandlerRootView;
  
  return (
    <RootComponent style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </Provider>
    </RootComponent>
  );
}
