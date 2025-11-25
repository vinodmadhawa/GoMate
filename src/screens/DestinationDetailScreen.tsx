import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
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
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { destinationId } = route.params as { destinationId: string };
  const destination = getDestinationById(destinationId);

  if (!destination) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.foreground, textAlign: 'center', marginTop: 50 }}>
          Destination not found
        </Text>
      </SafeAreaView>
    );
  }

  const favorite = isFavorite(destination.id);

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'Popular':
        return { bg: `${colors.secondary}1A`, text: colors.secondary, border: `${colors.secondary}33` };
      case 'Trending':
        return { bg: `${colors.accent}1A`, text: colors.accent, border: `${colors.accent}33` };
      case 'Must Visit':
        return { bg: `${colors.primary}1A`, text: colors.primary, border: `${colors.primary}33` };
      default:
        return { bg: colors.muted, text: colors.foreground, border: colors.border };
    }
  };

  const statusColors = getBadgeColor(destination.status);

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'train': return 'train';
      case 'bus': return 'truck';
      case 'taxi': return 'car';
      case 'tuk-tuk': return 'navigation';
      default: return 'map';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image source={{ uri: destination.image }} style={styles.heroImage} resizeMode="cover" />
          
          {/* Image Overlay */}
          <LinearGradient
            colors={gradients.imageOverlay.colors}
            start={gradients.imageOverlay.start}
            end={gradients.imageOverlay.end}
            style={StyleSheet.absoluteFill}
          />

          {/* Floating Header */}
          <View style={styles.floatingHeader}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={[styles.headerButton, { backgroundColor: `${colors.background}CC` }]}
            >
              <Feather name="chevron-left" size={24} color={colors.foreground} />
            </Pressable>
            <Pressable
              onPress={() => toggleFavorite(destination.id)}
              style={[
                styles.headerButton,
                { backgroundColor: favorite ? colors.primary : `${colors.background}CC` },
              ]}
            >
              <Feather
                name="heart"
                size={24}
                color={favorite ? '#FFFFFF' : colors.foreground}
                fill={favorite ? '#FFFFFF' : 'transparent'}
              />
            </Pressable>
          </View>
        </View>

        {/* Content Container */}
        <View
          style={[
            styles.contentContainer,
            {
              backgroundColor: colors.background,
              borderTopLeftRadius: borderRadius['3xl'],
              borderTopRightRadius: borderRadius['3xl'],
              marginTop: -32,
              padding: spacing[6],
            },
          ]}
        >
          {/* Title */}
          <Text
            style={[
              styles.title,
              {
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                marginBottom: spacing[2],
              },
            ]}
          >
            {destination.name}
          </Text>

          {/* Location */}
          <View style={[styles.locationRow, { marginBottom: spacing[4] }]}>
            <Feather name="map-pin" size={20} color={colors.primary} />
            <Text
              style={[
                styles.location,
                {
                  fontSize: typography.fontSize.base,
                  color: colors.mutedForeground,
                  marginLeft: spacing[2],
                },
              ]}
            >
              {destination.location}
            </Text>
          </View>

          {/* Rating & Badges Row */}
          <View style={[styles.ratingBadgesRow, { marginBottom: spacing[6] }]}>
            <View style={styles.rating}>
              <Feather name="star" size={20} color={colors.accent} fill={colors.accent} />
              <Text
                style={[
                  styles.ratingText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginLeft: spacing[2],
                  },
                ]}
              >
                {destination.rating} Rating
              </Text>
            </View>
            <View style={styles.badges}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: statusColors.bg,
                    borderColor: statusColors.border,
                    borderRadius: borderRadius.sm,
                    paddingHorizontal: spacing[2],
                    paddingVertical: spacing[1],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: statusColors.text,
                    },
                  ]}
                >
                  {destination.status}
                </Text>
              </View>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: colors.muted,
                    borderRadius: borderRadius.sm,
                    paddingHorizontal: spacing[2],
                    paddingVertical: spacing[1],
                    marginLeft: spacing[2],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    {
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.foreground,
                    },
                  ]}
                >
                  {destination.category}
                </Text>
              </View>
            </View>
          </View>

          {/* Section Divider */}
          <View style={[styles.divider, { backgroundColor: colors.border, marginVertical: spacing[6] }]} />

          {/* About Section */}
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                marginBottom: spacing[3],
              },
            ]}
          >
            About
          </Text>
          <Text
            style={[
              styles.fullDescription,
              {
                fontSize: typography.fontSize.base,
                color: colors.foreground,
                lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
                marginBottom: spacing[6],
              },
            ]}
          >
            {destination.fullDescription}
          </Text>

          {/* Transport Options Section */}
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                marginBottom: spacing[3],
              },
            ]}
          >
            Transport Options
          </Text>
          {destination.transport.map((transport, index) => (
            <View
              key={index}
              style={[
                styles.transportCard,
                {
                  borderColor: colors.border,
                  borderRadius: borderRadius.lg,
                  padding: spacing[4],
                  marginBottom: spacing[2],
                },
              ]}
            >
              <View style={styles.transportRow}>
                <View
                  style={[
                    styles.transportIconContainer,
                    {
                      backgroundColor: `${colors.primary}1A`,
                      borderRadius: borderRadius.full,
                      width: 40,
                      height: 40,
                    },
                  ]}
                >
                  <Feather name={getTransportIcon(transport.type) as any} size={24} color={colors.primary} />
                </View>
                <View style={styles.transportInfo}>
                  <Text
                    style={[
                      styles.transportTitle,
                      {
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.foreground,
                      },
                    ]}
                  >
                    {transport.type.charAt(0).toUpperCase() + transport.type.slice(1)} from {transport.from}
                  </Text>
                  <Text
                    style={[
                      styles.transportDetails,
                      {
                        fontSize: typography.fontSize.sm,
                        color: colors.mutedForeground,
                        marginTop: spacing[1],
                      },
                    ]}
                  >
                    {transport.price} • {transport.duration}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Best Time to Visit Section */}
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                marginTop: spacing[6],
                marginBottom: spacing[3],
              },
            ]}
          >
            Best Time to Visit
          </Text>
          <Text
            style={[
              styles.bestTime,
              {
                fontSize: typography.fontSize.base,
                color: colors.foreground,
                marginBottom: spacing[8],
              },
            ]}
          >
            {destination.bestTimeToVisit}
          </Text>

          {/* Book Now Button */}
          <Pressable
            style={[
              styles.bookButton,
              {
                backgroundColor: colors.primary,
                borderRadius: borderRadius.lg,
                height: 48,
              },
            ]}
            onPress={() => {
              // Handle booking
            }}
          >
            <Text
              style={[
                styles.bookButtonText,
                {
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                },
              ]}
            >
              Book Now
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImageContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  floatingHeader: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    position: 'relative',
  },
  title: {},
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {},
  ratingBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {},
  badges: {
    flexDirection: 'row',
  },
  badge: {
    borderWidth: 1,
  },
  badgeText: {},
  divider: {
    height: 1,
  },
  sectionTitle: {},
  fullDescription: {},
  transportCard: {
    borderWidth: 1,
  },
  transportRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transportIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transportTitle: {},
  transportDetails: {},
  bestTime: {},
  bookButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {},
});

export default DestinationDetailScreen;
