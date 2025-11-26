import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import LandingScreen from '../screens/LandingScreen';
import AuthScreen from '../screens/AuthScreen';
import MainTabNavigator from './MainTabNavigator';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { colors } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigationRef = useRef<any>(null);

  // Navigate to Landing when logged out
  useEffect(() => {
    if (!isAuthenticated && navigationRef.current) {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: 'Landing' }],
      });
    }
  }, [isAuthenticated]);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        dark: false,
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.card,
          text: colors.foreground,
          border: colors.border,
          notification: colors.primary,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Landing"
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen
          name="DestinationDetail"
          component={DestinationDetailScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettingsScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            cardStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
