import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const features = [
    {
      icon: 'map-pin',
      title: '8+',
      subtitle: 'Destinations',
    },
    {
      icon: 'truck',
      title: 'Transport Info',
      subtitle: '',
    },
    {
      icon: 'heart',
      title: 'Save Favorites',
      subtitle: '',
    },
    {
      icon: 'compass',
      title: 'Easy',
      subtitle: 'Navigation',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <MotiView
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.header}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>GM</Text>
        </View>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Welcome to GoMate
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Your ultimate companion for exploring the beautiful destinations of Sri Lanka with convenient transport options
        </Text>
      </MotiView>

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'timing',
              duration: 500,
              delay: 200 + index * 100,
            }}
            style={[styles.featureCard, { backgroundColor: theme.colors.card }]}
          >
            <Feather name={feature.icon as any} size={32} color={theme.colors.primary} />
            <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
              {feature.title}
            </Text>
            {feature.subtitle ? (
              <Text style={[styles.featureSubtitle, { color: theme.colors.text }]}>
                {feature.subtitle}
              </Text>
            ) : null}
          </MotiView>
        ))}
      </View>

      <MotiView
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800, delay: 600 }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#20B2AA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: (width - 72) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WelcomeScreen;
