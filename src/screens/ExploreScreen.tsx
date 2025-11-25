import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

const ExploreScreen = () => {
  const { theme } = useTheme();

  const categories = [
    { id: '1', name: 'Cultural', icon: 'star', count: '3 places' },
    { id: '2', name: 'Nature', icon: 'sun', count: '2 places' },
    { id: '3', name: 'Beach', icon: 'umbrella', count: '2 places' },
    { id: '4', name: 'Wildlife', icon: 'eye', count: '1 place' },
    { id: '5', name: 'Adventure', icon: 'zap', count: '2 places' },
    { id: '6', name: 'Religious', icon: 'home', count: '1 place' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Header />

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#10B981', '#0EA5E9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <Text style={styles.headerTitle}>Explore Categories</Text>
          <Text style={styles.headerSubtitle}>
            Browse destinations by type and interest
          </Text>
        </LinearGradient>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.mapCardContainer}
        >
          <LinearGradient
            colors={['#10B981', '#0EA5E9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.mapCard}
          >
            <Feather name="map" size={48} color="#fff" />
            <Text style={styles.mapTitle}>Interactive Map</Text>
            <Text style={styles.mapSubtitle}>Coming soon</Text>
          </LinearGradient>
        </MotiView>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Browse by Category
        </Text>

        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <MotiView
              key={category.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'timing',
                duration: 500,
                delay: index * 100,
              }}
            >
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: theme.colors.card }]}
              >
                <View
                  style={[
                    styles.categoryIconContainer,
                    { backgroundColor: `${theme.colors.primary}20` },
                  ]}
                >
                  <Feather name={category.icon as any} size={24} color={theme.colors.primary} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                    {category.name}
                  </Text>
                  <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
                    {category.count}
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.95,
    lineHeight: 20,
  },
  mapCardContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 32,
  },
  mapCard: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  mapTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  mapSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default ExploreScreen;
