import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { logout } from '../redux/slices/authSlice';
import { storageService } from '../utils/storage';
import { sriLankanPlaces } from '../data/places';
import { Place } from '../types';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { theme, toggleTheme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const favorites = useAppSelector(state => state.favorites.items);
  const [places, setPlaces] = useState<Place[]>(sriLankanPlaces);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await storageService.removeUser();
            dispatch(logout());
          },
        },
      ]
    );
  };

  const categories = ['All', 'Historical', 'Nature', 'Beach', 'Wildlife', 'Religious'];

  useEffect(() => {
    filterPlaces();
  }, [searchQuery, selectedCategory]);

  const filterPlaces = () => {
    let filtered = sriLankanPlaces;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        place =>
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setPlaces(filtered);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPlaces(sriLankanPlaces);
      setRefreshing(false);
    }, 1000);
  };

  const toggleFavorite = (placeId: string) => {
    if (favorites.includes(placeId)) {
      dispatch(removeFavorite(placeId));
    } else {
      dispatch(addFavorite(placeId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Popular': return '#EF4444';
      case 'Trending': return '#F59E0B';
      case 'Featured': return '#3B82F6';
      case 'Hidden Gem': return '#10B981';
      default: return theme.colors.primary;
    }
  };

  const renderPlaceCard = ({ item, index }: { item: Place; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: index * 100 }}
      style={[styles.card, { backgroundColor: theme.colors.card }]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Details', { place: item })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          >
            <View style={styles.badgeRow}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
              <View style={[styles.categoryBadgeTop, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
                <Text style={[styles.categoryBadgeTopText, { color: theme.colors.text }]}>
                  {item.category}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Feather
              name="heart"
              size={22}
              color={favorites.includes(item.id) ? '#EF4444' : '#fff'}
              fill={favorites.includes(item.id) ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitleText} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.cardLocationRow}>
              <Feather name="map-pin" size={12} color="#fff" />
              <Text style={styles.cardLocation}>
                {item.province}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>{item.rating}</Text>
            </View>
            <View style={styles.transportIcons}>
              {item.transportOptions?.slice(0, 3).map((transport, idx) => (
                <View
                  key={idx}
                  style={[styles.transportIcon, { backgroundColor: theme.colors.primary + '20' }]}
                >
                  <Feather name="truck" size={14} color={theme.colors.primary} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Fixed Header */}
      <LinearGradient
        colors={['#10B981', '#0EA5E9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>GM</Text>
            </View>
            <View>
              <Text style={styles.appTitle}>GoMate</Text>
              <Text style={styles.appSubtitle}>Explore Sri Lanka</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Feather name="user" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={toggleTheme}
            >
              <Feather name={isDark ? 'sun' : 'moon'} size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.headerTitle}>Discover Sri Lanka</Text>
        <Text style={styles.headerSubtitle}>
          Explore breathtaking destinations with convenient transport options
        </Text>
      </LinearGradient>

      {/* Scrollable Content */}
      <FlatList
        data={places}
        renderItem={renderPlaceCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListHeaderComponent={
          <View>
            <View style={[styles.searchContainer, { backgroundColor: theme.colors.card }]}>
              <Feather name="search" size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search destinations..."
                placeholderTextColor={theme.colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery !== '' && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Feather name="x" size={20} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity style={[styles.filterRow, { backgroundColor: theme.colors.card }]}>
              <Feather name="filter" size={18} color={theme.colors.text} />
              <Text style={[styles.filterText, { color: theme.colors.text }]}>
                All Categories
              </Text>
              <Feather name="chevron-down" size={18} color={theme.colors.text} />
            </TouchableOpacity>

            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                All Destinations
              </Text>
              <Text style={[styles.placeCount, { color: theme.colors.textSecondary }]}>
                {places.length} places
              </Text>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="map" size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No destinations found
            </Text>
          </View>
        }
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  appTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  appSubtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
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
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  filterText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  placeCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  categoriesContainer: {
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  categoryBadgeTop: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  categoryBadgeTopText: {
    fontSize: 11,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  cardTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardLocation: {
    fontSize: 13,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardContent: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 15,
    fontWeight: '700',
  },
  transportIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  transportIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 15,
  },
});
