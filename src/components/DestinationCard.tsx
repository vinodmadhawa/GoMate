import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Animated,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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
  const shimmerAnim = React.useRef(new Animated.Value(0)).current;
  const translateYAnim = React.useRef(new Animated.Value(0)).current;
  const shadowAnim = React.useRef(new Animated.Value(0)).current;
  const useNativeDriver = Platform.OS !== 'web';

  const favorite = isFavorite(destination.id);

  // Shimmer animation effect
  React.useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, []);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  const shadowOpacity = shadowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 0.3],
  });

  const shadowRadius = shadowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 20],
  });

  const handleHoverIn = () => {
    Animated.parallel([
      Animated.spring(translateYAnim, {
        toValue: -8,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.02,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
      Animated.timing(shadowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleHoverOut = () => {
    Animated.parallel([
      Animated.spring(translateYAnim, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
      Animated.timing(shadowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver,
      }),
      Animated.spring(translateYAnim, {
        toValue: -4,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.02,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
      Animated.timing(imageScaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver,
      }),
      Animated.spring(translateYAnim, {
        toValue: -8,
        friction: 5,
        tension: 40,
        useNativeDriver,
      }),
    ]).start();
  };

  const handleCardPress = () => {
    // @ts-ignore - Navigation typing
    navigation.navigate('DestinationDetail', { destinationId: destination.id });
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

  // Get transport icons (max 3) with proper icons for each transport type
  const getTransportIcon = (type: string): { library: 'ionicons' | 'feather'; icon: string } => {
    const transportType = type.toLowerCase().trim();
    switch (transportType) {
      case 'train':
        return { library: 'ionicons', icon: 'train' };
      case 'bus':
        return { library: 'ionicons', icon: 'bus' };
      case 'taxi':
      case 'car':
        return { library: 'ionicons', icon: 'car' };
      case 'tuk-tuk':
        return { library: 'ionicons', icon: 'car' };
      case 'boat':
      case 'ferry':
        return { library: 'ionicons', icon: 'boat' };
      case 'plane':
      case 'flight':
        return { library: 'ionicons', icon: 'airplane' };
      default:
        return { library: 'ionicons', icon: 'car' };
    }
  };

  const transportIcons = destination.transport.slice(0, 3).map((t) => ({
    ...getTransportIcon(t.type),
    type: t.type,
  }));

  return (
    <Animated.View 
      style={{ 
        transform: [
          { scale: scaleAnim },
          { translateY: translateYAnim }
        ],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: shadowRadius },
        shadowOpacity: shadowOpacity,
        shadowRadius: shadowRadius,
        elevation: shadowAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [2, 8],
        }),
      }}
    >
      <Pressable
        onPress={handleCardPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: borderRadius.lg,
            ...shadows.card,
            overflow: 'hidden',
          },
        ]}
      >
        {/* Shimmer Effect Overlay */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: [{ translateX: shimmerTranslate }],
            zIndex: 10,
          }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 100,
              height: '100%',
            }}
          />
        </Animated.View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Animated.View style={{ transform: [{ scale: imageScaleAnim }], width: '100%', height: '100%' }}>
            <Image
              source={
                typeof destination.image === 'string'
                  ? { uri: destination.image }
                  : destination.image
              }
              style={styles.image}
              resizeMode="cover"
              onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
            />
          </Animated.View>
          
          {/* Image Overlay Gradient */}
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
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
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                  marginBottom: spacing[1],
                },
              ]}
              numberOfLines={1}
            >
              {destination.name}
            </Text>
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={14} color="rgba(255, 255, 255, 0.9)" />
              <Text
                style={[
                  styles.location,
                  {
                    fontSize: typography.fontSize.sm,
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginLeft: 4,
                  },
                ]}
                numberOfLines={1}
              >
                {destination.location}
              </Text>
            </View>
            
            {/* Description */}
            <Text
              style={[
                styles.description,
                {
                  fontSize: typography.fontSize.sm,
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginTop: spacing[2],
                  lineHeight: 20,
                },
              ]}
              numberOfLines={2}
            >
              {destination.description}
            </Text>

            {/* Bottom Row: Rating & Transport Icons */}
            <View style={[styles.bottomRow, { marginTop: spacing[3] }]}>
              {/* Rating */}
              <View style={styles.rating}>
                <Feather name="star" size={18} color="#F59E0B" fill="#F59E0B" />
                <Text
                  style={[
                    styles.ratingText,
                    {
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.bold,
                      color: '#FFFFFF',
                      marginLeft: spacing[1],
                    },
                  ]}
                >
                  {destination.rating}
                </Text>
              </View>

              {/* Transport Icons */}
              <View style={styles.transportIcons}>
                {transportIcons.map((transport, index) => (
                  <View
                    key={index}
                    style={[
                      styles.transportIcon,
                      {
                        backgroundColor: 'rgba(20, 184, 166, 0.15)',
                        borderRadius: 6,
                      },
                    ]}
                  >
                    {transport.library === 'ionicons' ? (
                      <Ionicons name={transport.icon as any} size={16} color="#14B8A6" />
                    ) : (
                      <Feather name={transport.icon as any} size={16} color="#14B8A6" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 0,
    overflow: 'hidden',
    height: 280,
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 0,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 60,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  name: {},
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flex: 1,
  },
  description: {},
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
    gap: 6,
  },
  transportIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {},
});

export default React.memo(DestinationCard);
