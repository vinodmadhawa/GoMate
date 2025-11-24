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
} from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { sriLankanPlaces } from '../data/places';
import { Place } from '../types';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const favorites = useAppSelector(state => state.favorites.items);
  const [places, setPlaces] = useState<Place[]>(sriLankanPlaces);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

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
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          >
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </LinearGradient>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Feather
              name={favorites.includes(item.id) ? 'heart' : 'heart'}
              size={24}
              color={favorites.includes(item.id) ? '#EF4444' : '#fff'}
              fill={favorites.includes(item.id) ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <Text style={[styles.placeName, { color: theme.colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.province, { color: theme.colors.textSecondary }]}>
              {item.province}
            </Text>
          </View>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>{item.rating}</Text>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={[styles.categoryText, { color: theme.colors.primary }]}>
                {item.category}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['#20B2AA', '#4DB8E8']}
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
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Feather name="user" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <Feather name="moon" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <Feather name="log-out" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.headerTitle}>Discover Sri Lanka</Text>
        <Text style={styles.headerSubtitle}>
          Explore breathtaking destinations with convenient transport options
        </Text>
      </LinearGradient>

      <View style={styles.contentContainer}>
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

        <View style={[styles.filterRow, { backgroundColor: theme.colors.card }]}>
          <Feather name="filter" size={18} color={theme.colors.text} />
          <Text style={[styles.filterText, { color: theme.colors.text }]}>
            {selectedCategory}
          </Text>
          <Feather name="chevron-down" size={18} color={theme.colors.text} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            All Destinations
          </Text>
          <Text style={[styles.placeCount, { color: theme.colors.textSecondary }]}>
            {places.length} places
          </Text>
        </View>
      </View>

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
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather name="map" size={64} color={theme.colors.textSecondary} />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No destinations found
            </Text>
          </View>
        }
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
    paddingBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  appSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 22,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
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
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeCount: {
    fontSize: 14,
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
  listContainer: {
    padding: 20,
    paddingTop: 12,
  },
  card: {
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'flex-end',
    padding: 15,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 8,
  },
  cardContent: {
    padding: 15,
  },
  placeName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  province: {
    fontSize: 13,
    marginLeft: 5,
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
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
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
