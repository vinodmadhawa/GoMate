import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { destinations } from '../data/destinations';
import { Category } from '../types';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

const ExploreScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const navigation = useNavigation();

  const categories: Array<{ name: Category; icon: string; count: number }> = [
    { name: 'Cultural', icon: '🏛️', count: destinations.filter((d) => d.category === 'Cultural').length },
    { name: 'Nature', icon: '🌿', count: destinations.filter((d) => d.category === 'Nature').length },
    { name: 'Adventure', icon: '⛰️', count: destinations.filter((d) => d.category === 'Adventure').length },
    { name: 'Beach', icon: '🏖️', count: destinations.filter((d) => d.category === 'Beach').length },
    { name: 'Historical', icon: '🏰', count: destinations.filter((d) => d.category === 'Historical').length },
  ];

  const totalRoutes = destinations.reduce((sum, dest) => sum + dest.transport.length, 0);

  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Home' as never, { category } as never);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Header />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: spacing[4],
            paddingTop: spacing[6],
            paddingBottom: spacing[20],
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <LinearGradient
          colors={gradients.primary.colors}
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={[styles.gradientHeader, { borderRadius: borderRadius['3xl'], padding: spacing[8], marginBottom: spacing[6] }]}
        >
          <Text
            style={[
              styles.title,
              {
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: '#FFFFFF',
                marginBottom: spacing[2],
              },
            ]}
          >
            Explore
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: typography.fontSize.base,
                color: 'rgba(255, 255, 255, 0.9)',
              },
            ]}
          >
            Discover by category
          </Text>
        </LinearGradient>

        {/* Categories Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.foreground,
              marginBottom: spacing[4],
            },
          ]}
        >
          Categories
        </Text>

        {categories.map((category) => (
          <Pressable
            key={category.name}
            style={[
              styles.categoryCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing[5],
                marginBottom: spacing[3],
              },
            ]}
            onPress={() => handleCategoryPress(category.name)}
          >
            <View style={styles.categoryLeft}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryName,
                  {
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginLeft: spacing[4],
                  },
                ]}
              >
                {category.name}
              </Text>
            </View>
            <View
              style={[
                styles.categoryCount,
                {
                  backgroundColor: `${colors.primary}1A`,
                  borderRadius: borderRadius.full,
                  paddingHorizontal: spacing[3],
                  paddingVertical: spacing[1],
                },
              ]}
            >
              <Text
                style={[
                  styles.categoryCountText,
                  {
                    fontSize: typography.fontSize.sm,
                    color: colors.primary,
                  },
                ]}
              >
                ({category.count})
              </Text>
            </View>
          </Pressable>
        ))}

        {/* Interactive Map Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.foreground,
              marginTop: spacing[6],
              marginBottom: spacing[4],
            },
          ]}
        >
          Interactive Map
        </Text>
        <View
          style={[
            styles.mapPlaceholder,
            {
              backgroundColor: colors.muted,
              borderColor: colors.border,
              borderRadius: borderRadius.lg,
              height: 300,
              marginBottom: spacing[6],
            },
          ]}
        >
          <Feather name="map" size={48} color={colors.mutedForeground} style={{ marginBottom: spacing[2] }} />
          <Text
            style={[
              styles.mapPlaceholderText,
              {
                fontSize: typography.fontSize.lg,
                color: colors.mutedForeground,
              },
            ]}
          >
            Coming Soon...
          </Text>
        </View>

        {/* Quick Stats Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.foreground,
              marginBottom: spacing[4],
            },
          ]}
        >
          Quick Stats
        </Text>
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing[4],
                flex: 1,
                marginRight: spacing[2],
              },
            ]}
          >
            <Text
              style={[
                styles.statNumber,
                {
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  marginBottom: spacing[1],
                },
              ]}
            >
              {destinations.length}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  fontSize: typography.fontSize.sm,
                  color: colors.mutedForeground,
                },
              ]}
            >
              Destinations
            </Text>
          </View>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing[4],
                flex: 1,
                marginLeft: spacing[2],
              },
            ]}
          >
            <Text
              style={[
                styles.statNumber,
                {
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.primary,
                  marginBottom: spacing[1],
                },
              ]}
            >
              {totalRoutes}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  fontSize: typography.fontSize.sm,
                  color: colors.mutedForeground,
                },
              ]}
            >
              Transport Routes
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {},
  gradientHeader: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  sectionTitle: {},
  categoryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {},
  categoryCount: {},
  categoryCountText: {},
  mapPlaceholder: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {},
  statsContainer: {
    flexDirection: 'row',
  },
  statCard: {
    borderWidth: 1,
    alignItems: 'center',
  },
  statNumber: {},
  statLabel: {},
});

export default ExploreScreen;
