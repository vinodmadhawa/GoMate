import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useFavorites } from '../context/FavoritesContext';
import { destinations } from '../data/destinations';
import Header from '../components/Header';
import DestinationCard from '../components/DestinationCard';
import { LinearGradient } from 'expo-linear-gradient';

const FavoritesScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const favoriteDestinations = destinations.filter((dest) => favorites.includes(dest.id));

  const numColumns = Dimensions.get('window').width > 768 ? 3 : Dimensions.get('window').width > 480 ? 2 : 1;

  const renderHeader = () => (
    <View style={[styles.headerSection, { marginBottom: spacing[6] }]}>
      <LinearGradient
        colors={gradients.primary.colors}
        start={gradients.primary.start}
        end={gradients.primary.end}
        style={[styles.gradientHeader, { borderRadius: borderRadius['3xl'], padding: spacing[8] }]}
      >
        <Feather name="heart" size={48} color="#FFFFFF" style={{ marginBottom: spacing[4] }} />
        <Text
          style={[
            styles.title,
            {
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: '#FFFFFF',
              marginBottom: spacing[2],
            },
          ]}
        >
          My Favorites
        </Text>
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: typography.fontSize.base,
              color: 'rgba(255, 255, 255, 0.9)',
            },
          ]}
        >
          Your saved destinations
        </Text>
      </LinearGradient>
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyState, { paddingVertical: spacing[12] }]}>
      <Feather name="heart" size={64} color={colors.mutedForeground} style={{ marginBottom: spacing[4] }} />
      <Text
        style={[
          styles.emptyTitle,
          {
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            color: colors.foreground,
            marginBottom: spacing[2],
          },
        ]}
      >
        No favorites yet
      </Text>
      <Text
        style={[
          styles.emptyDescription,
          {
            fontSize: typography.fontSize.base,
            color: colors.mutedForeground,
            marginBottom: spacing[4],
          },
        ]}
      >
        Start exploring destinations
      </Text>
      <Pressable
        style={[
          styles.exploreButton,
          {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.lg,
            paddingHorizontal: spacing[6],
            paddingVertical: spacing[3],
          },
        ]}
        onPress={() => navigation.navigate('Home' as never)}
      >
        <Text
          style={[
            styles.exploreButtonText,
            {
              fontSize: typography.fontSize.base,
              fontWeight: typography.fontWeight.semibold,
              color: '#FFFFFF',
            },
          ]}
        >
          Explore
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Header />
      <FlatList
        data={favoriteDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DestinationCard destination={item} />}
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
        columnWrapperStyle={numColumns > 1 ? { gap: spacing[6] } : undefined}
        ItemSeparatorComponent={() => <View style={{ height: spacing[6] }} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
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
  headerSection: {},
  gradientHeader: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyDescription: {
    textAlign: 'center',
  },
  exploreButton: {},
  exploreButtonText: {},
});

export default FavoritesScreen;
