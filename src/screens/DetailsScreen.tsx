import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { Place, TransportOption } from '../types';

const { width } = Dimensions.get('window');

export default function DetailsScreen({ route, navigation }: any) {
  const { place }: { place: Place } = route.params;
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.items);
  const isFavorite = favorites.includes(place.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(place.id));
    } else {
      dispatch(addFavorite(place.id));
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'Bus': return 'truck';
      case 'Train': return 'truck';
      case 'Taxi': return 'truck';
      case 'Tuk-Tuk': return 'truck';
      case 'Private Vehicle': return 'truck';
      default: return 'map-pin';
    }
  };

  const renderTransportCard = (transport: TransportOption, index: number) => (
    <MotiView
      key={transport.id}
      from={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: 'timing', duration: 500, delay: index * 100 }}
      style={[styles.transportCard, { backgroundColor: theme.colors.card }]}
    >
      <View style={[styles.transportIcon, { backgroundColor: theme.colors.primary + '20' }]}>
        <Feather name={getTransportIcon(transport.type)} size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.transportInfo}>
        <Text style={[styles.transportType, { color: theme.colors.text }]}>
          {transport.type}
        </Text>
        <Text style={[styles.transportRoute, { color: theme.colors.textSecondary }]}>
          {transport.from} → {transport.to}
        </Text>
        <Text style={[styles.transportDescription, { color: theme.colors.textSecondary }]}>
          {transport.description}
        </Text>
        <View style={styles.transportDetails}>
          <View style={styles.detailItem}>
            <Feather name="clock" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {transport.duration}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="dollar-sign" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {transport.cost}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="repeat" size={14} color={theme.colors.textSecondary} />
            <Text style={[styles.detailText, { color: theme.colors.text }]}>
              {transport.frequency}
            </Text>
          </View>
        </View>
      </View>
    </MotiView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: place.image }} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButtonTop, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
            onPress={toggleFavorite}
          >
            <Feather
              name="heart"
              size={24}
              color={isFavorite ? '#EF4444' : '#fff'}
              fill={isFavorite ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={[styles.content, { backgroundColor: theme.colors.background }]}
        >
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.colors.text }]}>{place.name}</Text>
              <View style={styles.ratingContainer}>
                <Feather name="star" size={20} color="#F59E0B" fill="#F59E0B" />
                <Text style={[styles.rating, { color: theme.colors.text }]}>{place.rating}</Text>
              </View>
            </View>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.province, { color: theme.colors.textSecondary }]}>
                {place.province}
              </Text>
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              {place.description}
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Information</Text>
            <View style={styles.infoRow}>
              <Feather name="calendar" size={18} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                  Best Time to Visit
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {place.bestTime}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Feather name="credit-card" size={18} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                  Entry Fee
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {place.entryFee}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Feather name="tag" size={18} color={theme.colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                  Category
                </Text>
                <Text style={[styles.infoValue, { color: theme.colors.text }]}>
                  {place.category}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Highlights</Text>
            <View style={styles.highlightsContainer}>
              {place.highlights.map((highlight, index) => (
                <MotiView
                  key={index}
                  from={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'timing', duration: 400, delay: index * 80 }}
                  style={[styles.highlightChip, { backgroundColor: theme.colors.primary + '15' }]}
                >
                  <Feather name="check-circle" size={14} color={theme.colors.primary} />
                  <Text style={[styles.highlightText, { color: theme.colors.text }]}>
                    {highlight}
                  </Text>
                </MotiView>
              ))}
            </View>
          </View>

          <View style={styles.transportSection}>
            <View style={styles.transportHeader}>
              <Feather name="navigation" size={24} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text, marginLeft: 10 }]}>
                Transport Options
              </Text>
            </View>
            {place.transportOptions.map((transport, index) =>
              renderTransportCard(transport, index)
            )}
          </View>
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 350,
    position: 'relative',
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
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderRadius: 20,
    padding: 10,
  },
  favoriteButtonTop: {
    position: 'absolute',
    top: 50,
    right: 20,
    borderRadius: 20,
    padding: 10,
  },
  content: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingBottom: 30,
  },
  header: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  province: {
    fontSize: 15,
    marginLeft: 5,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  highlightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '500',
  },
  transportSection: {
    paddingHorizontal: 20,
  },
  transportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  transportCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  transportIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  transportInfo: {
    flex: 1,
  },
  transportType: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  transportRoute: {
    fontSize: 13,
    marginBottom: 6,
  },
  transportDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
  },
  transportDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
