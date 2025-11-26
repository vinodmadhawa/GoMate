import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useFavorites } from '../context/FavoritesContext';
import { getDestinationById } from '../data/destinations';

const DestinationDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors, typography, spacing, borderRadius, theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { destinationId } = route.params as { destinationId: string };
  const destination = getDestinationById(destinationId);

  if (!destination) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, textAlign: 'center', marginTop: 50 }}>
          Destination not found
        </Text>
      </View>
    );
  }

  const favorite = isFavorite(destination.id);

  const getBadgeColors = (status: string) => {
    switch (status) {
      case 'Must Visit':
        return { bg: colors.primary, text: '#FFFFFF' };
      case 'Popular':
        return { bg: colors.secondary, text: '#FFFFFF' };
      case 'Trending':
        return { bg: colors.accent, text: '#FFFFFF' };
      default:
        return { bg: colors.muted, text: colors.foreground };
    }
  };

  const statusColors = getBadgeColors(destination.status);
  const categoryBg = theme === 'dark' ? '#374151' : '#1F2937';

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'train': return 'train';
      case 'bus': return 'truck';
      case 'taxi': return 'car';
      case 'tuk-tuk': return 'navigation';
      default: return 'map';
    }
  };

  const capitalizeTransportType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero Image with Overlay */}
        <View style={styles.heroContainer}>
          <Image 
            source={
              typeof destination.image === 'string'
                ? { uri: destination.image }
                : destination.image
            }
            style={styles.heroImage} 
            resizeMode="cover" 
          />
          
          {/* Dark Overlay */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.3)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />

          {/* Back & Favorite Buttons */}
          <View style={styles.headerButtons}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.iconButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
            >
              <Feather name="chevron-left" size={24} color="#FFFFFF" />
              <Text style={[styles.backText, { marginLeft: 4, color: '#FFFFFF', fontSize: 16, fontWeight: '600' }]}>
                Back
              </Text>
            </Pressable>
            <Pressable
              onPress={() => toggleFavorite(destination.id)}
              style={[styles.iconButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
            >
              <Feather
                name="heart"
                size={24}
                color="#FFFFFF"
                fill={favorite ? '#FFFFFF' : 'transparent'}
              />
            </Pressable>
          </View>

          {/* Destination Info Overlay */}
          <View style={styles.heroContent}>
            <View style={styles.badgesRow}>
              <View style={[styles.statusBadge, { backgroundColor: statusColors.bg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 }]}>
                <Text style={[styles.badgeText, { color: statusColors.text, fontSize: 12, fontWeight: '600' }]}>
                  {destination.status}
                </Text>
              </View>
              <View style={[styles.categoryBadge, { backgroundColor: categoryBg, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, marginLeft: 8 }]}>
                <Text style={[styles.badgeText, { color: '#FFFFFF', fontSize: 12, fontWeight: '600' }]}>
                  {destination.category}
                </Text>
              </View>
            </View>

            <Text style={[styles.heroTitle, { fontSize: 32, fontWeight: 'bold', color: '#FFFFFF', marginTop: 12 }]}>
              {destination.name}
            </Text>

            <View style={[styles.locationRow, { marginTop: 8, flexDirection: 'row', alignItems: 'center' }]}>
              <Feather name="map-pin" size={16} color="#FFFFFF" />
              <Text style={[styles.locationText, { color: '#FFFFFF', fontSize: 14, marginLeft: 6 }]}>
                {destination.location}
              </Text>
              <View style={[styles.ratingContainer, { flexDirection: 'row', alignItems: 'center', marginLeft: 16 }]}>
                <Feather name="star" size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={[styles.ratingText, { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginLeft: 4 }]}>
                  {destination.rating}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={[styles.content, { padding: 20 }]}>
          {/* About Section */}
          <Text style={[styles.sectionTitle, { fontSize: 20, fontWeight: 'bold', color: colors.foreground, marginBottom: 12 }]}>
            About
          </Text>
          <Text style={[styles.description, { fontSize: 14, color: colors.mutedForeground, lineHeight: 22, marginBottom: 16 }]}>
            {destination.fullDescription}
          </Text>

          {/* Best Time to Visit */}
          <View style={[styles.bestTimeContainer, { flexDirection: 'row', alignItems: 'center', marginBottom: 24 }]}>
            <Feather name="calendar" size={18} color={colors.primary} />
            <Text style={[styles.bestTimeLabel, { fontSize: 14, fontWeight: '600', color: colors.foreground, marginLeft: 8 }]}>
              Best time to visit:
            </Text>
            <Text style={[styles.bestTimeValue, { fontSize: 14, color: colors.mutedForeground, marginLeft: 8 }]}>
              {destination.bestTimeToVisit}
            </Text>
          </View>

          {/* Highlights Section */}
          {destination.highlights && destination.highlights.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { fontSize: 20, fontWeight: 'bold', color: colors.foreground, marginBottom: 12 }]}>
                Highlights
              </Text>
              <View style={[styles.highlightsGrid, { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }]}>
                {destination.highlights.map((highlight, index) => (
                  <View 
                    key={index} 
                    style={[styles.highlightItem, { 
                      flexDirection: 'row', 
                      alignItems: 'center',
                      width: '48%',
                      marginRight: index % 2 === 0 ? '4%' : 0,
                      marginBottom: 12 
                    }]}
                  >
                    <View style={[styles.bulletPoint, { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, marginRight: 8 }]} />
                    <Text style={[styles.highlightText, { fontSize: 14, color: colors.mutedForeground, flex: 1 }]}>
                      {highlight}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Transport Options */}
          <Text style={[styles.sectionTitle, { fontSize: 20, fontWeight: 'bold', color: colors.foreground, marginBottom: 16 }]}>
            Transport Options
          </Text>
          {destination.transport.map((transport, index) => (
            <View
              key={index}
              style={[styles.transportCard, { 
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: colors.border
              }]}
            >
              <View style={[styles.transportHeader, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[styles.transportIcon, { width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.primary}20`, alignItems: 'center', justifyContent: 'center' }]}>
                    <Feather name={getTransportIcon(transport.type) as any} size={20} color={colors.primary} />
                  </View>
                  <Text style={[styles.transportType, { fontSize: 18, fontWeight: '600', color: colors.foreground, marginLeft: 12 }]}>
                    {capitalizeTransportType(transport.type)}
                  </Text>
                </View>
                <Text style={[styles.transportPrice, { fontSize: 16, fontWeight: '700', color: colors.primary }]}>
                  {transport.price}
                </Text>
              </View>

              <View style={[styles.transportDetails, { marginLeft: 52 }]}>
                <View style={[styles.detailRow, { flexDirection: 'row', alignItems: 'center', marginBottom: 8 }]}>
                  <Feather name="clock" size={16} color={colors.mutedForeground} />
                  <Text style={[styles.detailText, { fontSize: 14, color: colors.mutedForeground, marginLeft: 8 }]}>
                    {transport.duration} from {transport.from}
                  </Text>
                </View>

                {transport.schedule && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={[styles.scheduleText, { fontSize: 14, color: colors.foreground, marginBottom: 4 }]}>
                      {transport.schedule}
                    </Text>
                    {transport.frequency && (
                      <View style={[styles.frequencyBadge, { 
                        backgroundColor: colors.primary,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 4,
                        alignSelf: 'flex-start'
                      }]}>
                        <Text style={[styles.frequencyText, { fontSize: 12, color: '#FFFFFF', fontWeight: '600' }]}>
                          {transport.frequency}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {transport.frequency && !transport.schedule && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={[styles.frequencyInfo, { fontSize: 14, color: colors.foreground }]}>
                      {transport.frequency}
                    </Text>
                    {transport.availability && (
                      <View style={[styles.availabilityBadge, { 
                        backgroundColor: colors.primary,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                        marginTop: 6
                      }]}>
                        <Text style={[styles.availabilityText, { fontSize: 12, color: '#FFFFFF', fontWeight: '600' }]}>
                          {transport.availability}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {transport.availability && !transport.frequency && (
                  <View style={{ marginTop: 8 }}>
                    <Text style={[styles.availabilityInfo, { fontSize: 14, color: colors.foreground }]}>
                      {transport.availability}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backText: {},
  heroContent: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {},
  categoryBadge: {},
  badgeText: {},
  heroTitle: {},
  locationRow: {},
  locationText: {},
  ratingContainer: {},
  ratingText: {},
  content: {},
  sectionTitle: {},
  description: {},
  bestTimeContainer: {},
  bestTimeLabel: {},
  bestTimeValue: {},
  highlightsGrid: {},
  highlightItem: {},
  bulletPoint: {},
  highlightText: {},
  transportCard: {},
  transportHeader: {},
  transportIcon: {},
  transportType: {},
  transportPrice: {},
  transportDetails: {},
  detailRow: {},
  detailText: {},
  scheduleText: {},
  frequencyBadge: {},
  frequencyText: {},
  frequencyInfo: {},
  availabilityBadge: {},
  availabilityText: {},
  availabilityInfo: {},
});

export default DestinationDetailScreen;
