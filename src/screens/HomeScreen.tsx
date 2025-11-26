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
  Modal,
  TouchableOpacity,
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
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const categories: Category[] = ['all', 'Cultural', 'Nature', 'Adventure', 'Beach', 'Historical'];

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
          Discover Sri Lanka
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
          Explore breathtaking destinations
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
          placeholder="Search by name, location, or category..."
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
        onPress={() => setDropdownVisible(true)}
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
          {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
        </Text>
        <Feather name="chevron-down" size={20} color={colors.mutedForeground} />
      </Pressable>

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
  ), [gradients, borderRadius, spacing, typography, colors, theme, categoryFilter, setCategoryFilter, categories, filteredDestinations.length, searchText, handleSearchChange, handleClearSearch]);

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

  const numColumns = Dimensions.get('window').width > 768 ? 3 : Dimensions.get('window').width > 480 ? 2 : 1;

  const renderItem = useCallback(({ item }: { item: typeof destinations[0] }) => (
    <View style={{ flex: 1 / numColumns, paddingHorizontal: spacing[1] }}>
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

      {/* Category Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={[styles.dropdownModal, { backgroundColor: colors.card }]}>
            <View style={[styles.dropdownHeader, { borderBottomColor: colors.border, paddingVertical: spacing[3], paddingHorizontal: spacing[4] }]}>
              <Text style={[styles.dropdownTitle, { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: colors.foreground }]}>
                Select Category
              </Text>
              <Pressable onPress={() => setDropdownVisible(false)}>
                <Feather name="x" size={24} color={colors.foreground} />
              </Pressable>
            </View>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => handleCategorySelect(cat)}
                style={[
                  styles.dropdownItem,
                  {
                    backgroundColor: categoryFilter === cat ? colors.muted : 'transparent',
                    paddingVertical: spacing[3],
                    paddingHorizontal: spacing[4],
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      fontSize: typography.fontSize.base,
                      color: categoryFilter === cat ? colors.primary : colors.foreground,
                      fontWeight: categoryFilter === cat ? typography.fontWeight.semibold : typography.fontWeight.normal,
                    },
                  ]}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </Text>
                {categoryFilter === cat && (
                  <Feather name="check" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownModal: {
    width: '80%',
    maxWidth: 400,
    borderRadius: 12,
    overflow: 'hidden',
    maxHeight: '70%',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  dropdownTitle: {},
  dropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  dropdownItemText: {},
});

export default HomeScreen;
