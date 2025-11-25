import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';

const LandingScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, shadows, theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();

  // Auto-redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Main' as never);
    }
  }, [isAuthenticated]);

  const handleGetStarted = () => {
    navigation.navigate('Auth' as never);
  };

  const features = [
    { icon: 'map', label: 'Discover Places' },
    { icon: 'package', label: 'Transport Info' },
    { icon: 'heart', label: 'Save Favorites' },
    { icon: 'moon', label: 'Dark Mode' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <LinearGradient
        colors={gradients.hero.colors}
        start={gradients.hero.start}
        end={gradients.hero.end}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.content, { padding: spacing[6] }]}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <LinearGradient
            colors={gradients.primary.colors}
            start={gradients.primary.start}
            end={gradients.primary.end}
            style={[styles.largeLogo, { borderRadius: spacing[6] }]}
          >
            <Text style={[styles.largeLogoText, { fontSize: typography.fontSize['4xl'] }]}>
              GM
            </Text>
          </LinearGradient>
          
          <Text
            style={[
              styles.appTitle,
              {
                fontSize: typography.fontSize['4xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                marginTop: spacing[6],
              },
            ]}
          >
            GoMate
          </Text>
          
          <Text
            style={[
              styles.appSubtitle,
              {
                fontSize: typography.fontSize.xl,
                color: colors.mutedForeground,
                marginTop: spacing[2],
              },
            ]}
          >
            Explore Sri Lanka
          </Text>
        </View>

        {/* Description */}
        <Text
          style={[
            styles.description,
            {
              fontSize: typography.fontSize.base,
              color: colors.foreground,
              textAlign: 'center',
              marginVertical: spacing[8],
              lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
            },
          ]}
        >
          Welcome to your ultimate travel companion for Sri Lankan destinations
        </Text>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Feather name={feature.icon as any} size={24} color={colors.primary} />
              <Text
                style={[
                  styles.featureText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginLeft: spacing[3],
                  },
                ]}
              >
                {feature.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Get Started Button */}
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              borderRadius: borderRadius.lg,
              height: 56,
              marginTop: spacing[8],
              ...shadows.hover,
            },
          ]}
          onPress={handleGetStarted}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: '#FFFFFF',
              },
            ]}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
  },
  largeLogo: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeLogoText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  appTitle: {
    textAlign: 'center',
  },
  appSubtitle: {
    textAlign: 'center',
  },
  description: {
    maxWidth: 400,
  },
  featuresGrid: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {},
  button: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {},
});

export default LandingScreen;
