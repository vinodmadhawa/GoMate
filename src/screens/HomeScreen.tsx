import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme';
import { destinations } from '../data/destinations';
import { Category } from '../types';
import Header from '../components/Header';
import DestinationCard from '../components/DestinationCard';

const HomeScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');

  const categories: Category[] = ['all', 'Cultural', 'Nature', 'Adventure', 'Beach', 'Historical'];

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || dest.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const getCategoryLabel = () => {
    return categoryFilter === 'all' ? 'All Destinations' : `${categoryFilter} Destinations`;
  };

  const renderHeader = () => (
    <View>
      {/* Hero Section */}
      <LinearGradient
        colors={gradients.primary.colors}
        start={gradients.primary.start}
        end={gradients.primary.end}
        style={[styles.heroSection, { borderRadius: borderRadius['3xl'], padding: spacing[8] }]}
      >
        {/* Decorative Blobs */}
        <View style={[styles.blob, styles.blob1]} />
        <View style={[styles.blob, styles.blob2]} />

        <Text
          style={[
            styles.heroTitle,
            {
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: '#FFFFFF',
              marginBottom: spacing[2],
            },
          ]}
        >
          Discover Sri Lanka
        </Text>
        <Text
          style={[
            styles.heroSubtitle,
            {
              fontSize: typography.fontSize.base,
              color: 'rgba(255, 255, 255, 0.9)',
            },
          ]}
        >
          Explore breathtaking destinations with convenient transport options
        </Text>
      </LinearGradient>

      {/* Search Input */}
      <View style={[styles.searchContainer, { marginTop: spacing[3] }]}>
        <Feather
          name="search"
          size={20}
          color={colors.mutedForeground}
          style={styles.searchIcon}
        />
        <TextInput
          style={[
            styles.searchInput,
            {
              borderColor: colors.input,
              backgroundColor: colors.background,
              color: colors.foreground,
              fontSize: typography.fontSize.base,
              borderRadius: borderRadius.md,
              height: 48,
              paddingLeft: 40,
              paddingRight: spacing[3],
            },
          ]}
          placeholder="Search destinations..."
          placeholderTextColor={colors.mutedForeground}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Dropdown */}
      <View style={[styles.filterContainer, { marginTop: spacing[3] }]}>
        <Feather name="filter" size={16} color={colors.foreground} style={{ marginRight: 8 }} />
        <Pressable
          style={[
            styles.filterButton,
            {
              borderColor: colors.input,
              backgroundColor: colors.background,
              borderRadius: borderRadius.md,
              height: 48,
              flex: 1,
              paddingHorizontal: spacing[3],
            },
          ]}
        >
          <Text style={[styles.filterText, { fontSize: typography.fontSize.base, color: colors.foreground }]}>
            {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
          </Text>
          <Feather name="chevron-down" size={20} color={colors.foreground} />
        </Pressable>
      </View>

      {/* Category Pills */}
      <View style={[styles.categoryPills, { marginTop: spacing[3], marginBottom: spacing[6] }]}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoryFilter(cat)}
            style={[
              styles.categoryPill,
              {
                backgroundColor: categoryFilter === cat ? colors.primary : colors.muted,
                borderRadius: borderRadius.full,
                paddingHorizontal: spacing[4],
                paddingVertical: spacing[2],
              },
            ]}
          >
            <Text
              style={[
                styles.categoryPillText,
                {
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  color: categoryFilter === cat ? '#FFFFFF' : colors.foreground,
                },
              ]}
            >
              {cat === 'all' ? 'All' : cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: colors.foreground,
            },
          ]}
        >
          {getCategoryLabel()}
        </Text>
        <Text
          style={[
            styles.sectionCount,
            {
              fontSize: typography.fontSize.sm,
              color: colors.mutedForeground,
            },
          ]}
        >
          {filteredDestinations.length} places
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyState, { paddingVertical: spacing[12] }]}>
      <Text
        style={[
          styles.emptyText,
          {
            fontSize: typography.fontSize.base,
            color: colors.mutedForeground,
            textAlign: 'center',
          },
        ]}
      >
        No destinations found
      </Text>
    </View>
  );

  const numColumns = Dimensions.get('window').width > 768 ? 3 : Dimensions.get('window').width > 480 ? 2 : 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Header />
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DestinationCard destination={item} />}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: spacing[4],
            paddingTop: spacing[6],
            paddingBottom: spacing[20],
          },
        ]}
        columnWrapperStyle={numColumns > 1 ? { gap: spacing[6] } : undefined}
        ItemSeparatorComponent={() => <View style={{ height: spacing[6] }} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={6}
        initialNumToRender={6}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  heroSection: {
    position: 'relative',
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    width: 192,
    height: 192,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 96,
  },
  blob1: {
    bottom: -40,
    right: -40,
  },
  blob2: {
    top: -40,
    left: -40,
  },
  heroTitle: {
    position: 'relative',
    zIndex: 1,
  },
  heroSubtitle: {
    position: 'relative',
    zIndex: 1,
  },
  searchContainer: {
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    borderWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  filterText: {},
  categoryPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {},
  categoryPillText: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {},
  sectionCount: {},
  emptyState: {
    alignItems: 'center',
  },
  emptyText: {},
});

export default HomeScreen;
