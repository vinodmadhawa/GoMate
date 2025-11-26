import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  useWindowDimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useLanguage } from '../context/LanguageContext';
import { destinations } from '../data/destinations';
import { Category } from '../types';
import Header from '../components/Header';
import DestinationCard from '../components/DestinationCard';

const HomeScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const { t } = useLanguage();
  const route = useRoute();
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Responsive columns based on screen width
  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;
  const cardWidth = width >= 768 ? (width - spacing[4] * (numColumns + 1)) / numColumns : width - spacing[4] * 2;

  const categories: Category[] = ['all', 'Cultural', 'Nature', 'Adventure', 'Beach', 'Historical'];

  // Handle category navigation from ExploreScreen
  useEffect(() => {
    const params = route.params as { category?: Category } | undefined;
    if (params?.category) {
      setCategoryFilter(params.category);
    }
  }, [route.params]);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(searchText);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchText]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchText('');
    setSearchQuery('');
  }, []);

  const handleCategorySelect = useCallback((category: Category) => {
    setCategoryFilter(category);
    setDropdownVisible(false);
  }, []);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // Enhanced search: search by name, location, description, and category
      const searchLower = searchQuery.toLowerCase().trim();
      
      if (searchLower === '') {
        // No search query, only filter by category
        const matchesCategory = categoryFilter === 'all' || dest.category === categoryFilter;
        return matchesCategory;
      }

      const matchesSearch =
        dest.name.toLowerCase().includes(searchLower) ||
        dest.location.toLowerCase().includes(searchLower) ||
        dest.description.toLowerCase().includes(searchLower) ||
        dest.category.toLowerCase().includes(searchLower);

      const matchesCategory = categoryFilter === 'all' || dest.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const getCategoryLabel = () => {
    return categoryFilter === 'all' ? 'All Destinations' : `${categoryFilter} Destinations`;
  };

  const renderHeader = useMemo(() => (
    <View>
      {/* Hero Section */}
      <LinearGradient
        colors={gradients.primary.colors}
        start={gradients.primary.start}
        end={gradients.primary.end}
        style={[styles.heroSection, { borderRadius: borderRadius['2xl'], padding: spacing[6] }]}
      >
        <Text
          style={[
            styles.heroTitle,
            {
              fontSize: typography.fontSize['2xl'],
              fontWeight: typography.fontWeight.bold,
              color: '#FFFFFF',
              marginBottom: spacing[1],
            },
          ]}
        >
          {t.discoverSriLanka}
        </Text>
        <Text
          style={[
            styles.heroSubtitle,
            {
              fontSize: typography.fontSize.sm,
              color: 'rgba(255, 255, 255, 0.95)',
            },
          ]}
        >
          {t.exploreBeautiful}
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
              borderColor: theme === 'dark' ? '#2a3142' : colors.input,
              backgroundColor: theme === 'dark' ? '#1a1f2e' : colors.background,
              color: colors.foreground,
              fontSize: typography.fontSize.base,
              borderRadius: borderRadius.lg,
              height: 52,
              paddingLeft: 40,
              paddingRight: searchText ? 80 : spacing[3],
              borderWidth: 1,
            },
          ]}
          placeholder={t.searchDestinations}
          placeholderTextColor={colors.mutedForeground}
          value={searchText}
          onChangeText={handleSearchChange}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchText.length > 0 && (
          <Pressable
            onPress={handleClearSearch}
            style={[styles.clearButton, { right: spacing[3] }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="x-circle" size={20} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>

      {/* Filter Dropdown */}
      <Pressable
        onPress={() => setDropdownVisible(!dropdownVisible)}
        style={[
          styles.filterButton,
          {
            backgroundColor: theme === 'dark' ? '#1a1f2e' : colors.muted,
            borderRadius: borderRadius.lg,
            height: 52,
            marginTop: spacing[3],
            paddingHorizontal: spacing[4],
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#2a3142' : colors.input,
          },
        ]}
      >
        <Feather name="filter" size={18} color={colors.foreground} />
        <Text style={[styles.filterText, { fontSize: typography.fontSize.base, color: colors.foreground, marginLeft: spacing[3], flex: 1 }]}>
          {categoryFilter === 'all' ? t.allDestinations : t[categoryFilter.toLowerCase() as keyof typeof t] || categoryFilter}
        </Text>
        <Feather name={dropdownVisible ? "chevron-up" : "chevron-down"} size={20} color={colors.mutedForeground} />
      </Pressable>

      {/* Dropdown List */}
      {dropdownVisible && (
        <View style={[styles.dropdownList, { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: borderRadius.lg,
          marginTop: spacing[2],
          borderWidth: 1,
          overflow: 'hidden',
        }]}>
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => handleCategorySelect(cat)}
              style={[
                styles.dropdownListItem,
                {
                  backgroundColor: categoryFilter === cat ? colors.muted : 'transparent',
                  paddingVertical: spacing[3],
                  paddingHorizontal: spacing[4],
                  borderBottomWidth: cat !== categories[categories.length - 1] ? 1 : 0,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.dropdownListItemText,
                  {
                    fontSize: typography.fontSize.base,
                    color: categoryFilter === cat ? colors.primary : colors.foreground,
                    fontWeight: categoryFilter === cat ? typography.fontWeight.semibold : typography.fontWeight.normal,
                  },
                ]}
              >
                {cat === 'all' ? t.allDestinations : t[cat.toLowerCase() as keyof typeof t] || cat}
              </Text>
              {categoryFilter === cat && (
                <Feather name="check" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      )}

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
                  fontWeight: typography.fontWeight.medium,
                  color: categoryFilter === cat ? '#FFFFFF' : colors.foreground,
                },
              ]}
            >
              {cat === 'all' ? t.allDestinations : t[cat.toLowerCase() as keyof typeof t] || cat}
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
  ), [gradients, borderRadius, spacing, typography, colors, theme, categoryFilter, setCategoryFilter, categories, filteredDestinations.length, searchText, handleSearchChange, handleClearSearch, dropdownVisible, handleCategorySelect]);

  const renderEmptyState = useMemo(() => (
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
  ), [spacing, typography, colors]);

  const renderItem = useCallback(({ item }: { item: typeof destinations[0] }) => (
    <View style={{ flex: 1 / numColumns, paddingHorizontal: spacing[1], marginBottom: spacing[4] }}>
      <DestinationCard destination={item} />
    </View>
  ), [numColumns, spacing]);

  const keyExtractor = useCallback((item: typeof destinations[0]) => item.id, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Header />

      <FlatList
        data={filteredDestinations}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
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
        columnWrapperStyle={numColumns > 1 ? { gap: spacing[4] } : undefined}
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
  clearButton: {
    position: 'absolute',
    top: 14,
    zIndex: 1,
  },
  searchInput: {
    borderWidth: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterText: {},
  dropdownList: {},
  dropdownListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownListItemText: {},
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
