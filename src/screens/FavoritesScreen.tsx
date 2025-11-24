import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { removeFavorite, setFavorites } from '../redux/slices/favoritesSlice';
import { storageService } from '../utils/storage';
import { sriLankanPlaces } from '../data/places';
import { Place } from '../types';

export default function FavoritesScreen({ navigation }: any) {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    const savedFavorites = await storageService.getFavorites();
    dispatch(setFavorites(savedFavorites));
  };

  const saveFavorites = async () => {
    await storageService.saveFavorites(favorites);
  };

  const favoritePlaces = sriLankanPlaces.filter(place => favorites.includes(place.id));

  const handleRemoveFavorite = (placeId: string) => {
    dispatch(removeFavorite(placeId));
  };

  const renderFavoriteCard = ({ item, index }: { item: Place; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500, delay: index * 100 }}
      style={[styles.card, { backgroundColor: theme.colors.card }]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate('Details', { place: item })}
        style={styles.cardContent}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={12} color={theme.colors.textSecondary} />
            <Text style={[styles.province, { color: theme.colors.textSecondary }]} numberOfLines={1}>
              {item.province}
            </Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>{item.rating}</Text>
            </View>
            <View style={[styles.categoryBadge, { backgroundColor: theme.colors.primary + '20' }]}>
              <Text style={[styles.category, { color: theme.colors.primary }]}>
                {item.category}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <Feather name="x" size={20} color="#EF4444" />
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['#10B981', '#0EA5E9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Feather name="heart" size={32} color="#fff" />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>My Favorites</Text>
            <Text style={styles.subtitle}>
              {favoritePlaces.length} {favoritePlaces.length === 1 ? 'place' : 'places'} saved
            </Text>
          </View>
        </View>
      </LinearGradient>

      {favoritePlaces.length === 0 ? (
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.emptyContainer}
        >
          <Feather name="heart" size={80} color={theme.colors.textSecondary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            No Favorites Yet
          </Text>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            Start exploring and save your favorite destinations
          </Text>
          <TouchableOpacity
            style={[styles.exploreButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreButtonText}>Explore Destinations</Text>
          </TouchableOpacity>
        </MotiView>
      ) : (
        <FlatList
          data={favoritePlaces}
          renderItem={renderFavoriteCard}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.95,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  province: {
    fontSize: 12,
    marginLeft: 4,
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
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  exploreButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
