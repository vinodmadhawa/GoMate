import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useFavorites } from '../context/FavoritesContext';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { colors, typography, spacing, borderRadius, shadows } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigation = useNavigation();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const imageScaleAnim = React.useRef(new Animated.Value(1)).current;

  const favorite = isFavorite(destination.id);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.98,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCardPress = () => {
    navigation.navigate('DestinationDetail' as never, { destinationId: destination.id } as never);
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(destination.id);
  };

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

  // Get transport icons (max 3)
  const transportIcons = destination.transport.slice(0, 3).map((t) => {
    switch (t.type) {
      case 'train': return 'train' as const;
      case 'bus': return 'truck' as const;
      case 'taxi': return 'car' as const;
      case 'tuk-tuk': return 'navigation' as const;
      default: return 'map' as const;
    }
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handleCardPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: borderRadius.lg,
            ...shadows.card,
          },
        ]}
      >
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Animated.View style={{ transform: [{ scale: imageScaleAnim }] }}>
            <Image
              source={{ uri: destination.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </Animated.View>
          
          {/* Image Overlay Gradient */}
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusColors.bg,
                borderColor: statusColors.border,
                borderRadius: borderRadius.sm,
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

          {/* Category Badge */}
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: `${colors.background}CC`,
                borderRadius: borderRadius.sm,
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

          {/* Favorite Button */}
          <Pressable
            onPress={handleFavoritePress}
            style={[
              styles.favoriteButton,
              {
                backgroundColor: favorite ? colors.primary : `${colors.background}CC`,
              },
            ]}
          >
            <Feather
              name="heart"
              size={20}
              color={favorite ? '#FFFFFF' : colors.foreground}
              fill={favorite ? '#FFFFFF' : 'transparent'}
            />
          </Pressable>

          {/* Destination Name & Location (over image) */}
          <View style={styles.imageOverlay}>
            <Text
              style={[
                styles.name,
                {
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                },
              ]}
              numberOfLines={1}
            >
              {destination.name}
            </Text>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={16} color="rgba(255, 255, 255, 0.9)" />
              <Text
                style={[
                  styles.location,
                  {
                    fontSize: typography.fontSize.sm,
                    color: 'rgba(255, 255, 255, 0.9)',
                  },
                ]}
                numberOfLines={1}
              >
                {destination.location}
              </Text>
            </View>
          </View>
        </View>

        {/* Content Section */}
        <View style={[styles.content, { padding: spacing[4], gap: spacing[3] }]}>
          {/* Description */}
          <Text
            style={[
              styles.description,
              {
                fontSize: typography.fontSize.sm,
                color: colors.mutedForeground,
              },
            ]}
            numberOfLines={2}
          >
            {destination.description}
          </Text>

          {/* Bottom Row: Rating & Transport Icons */}
          <View style={styles.bottomRow}>
            {/* Rating */}
            <View style={styles.rating}>
              <Feather name="star" size={16} color={colors.accent} fill={colors.accent} />
              <Text
                style={[
                  styles.ratingText,
                  {
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginLeft: spacing[1],
                  },
                ]}
              >
                {destination.rating}
              </Text>
            </View>

            {/* Transport Icons */}
            <View style={styles.transportIcons}>
              {transportIcons.map((icon, index) => (
                <View
                  key={index}
                  style={[
                    styles.transportIcon,
                    {
                      backgroundColor: colors.muted,
                      borderRadius: borderRadius.md,
                    },
                  ]}
                >
                  <Feather name={icon} size={16} color={colors.primary} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 192,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 80, // After status badge
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  name: {
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
  },
  description: {
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {},
  transportIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  transportIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {},
});

export default React.memo(DestinationCard);
