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

const DestinationCard: React.FC<{ destination: any }> = ({ destination }) => {
  return (
    <Pressable
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 12,
        justifyContent: 'center',
      }}
      onPress={() => {}}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#111' }}>
        {destination?.name ?? 'Unknown'}
      </Text>
      {destination?.location ? (
        <Text style={{ color: '#666', marginTop: 4 }}>{destination.location}</Text>
      ) : null}
    </Pressable>
  );
};

import { LinearGradient } from 'expo-linear-gradient';

const FavoritesScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const favoriteDestinations = destinations.filter((dest) => favorites.includes(dest.id));

  const numColumns = Dimensions.get('window').width > 768 ? 3 : Dimensions.get('window').width > 480 ? 2 : 1;

  const renderHeader = () => (
    <View style={[styles.headerSection, { paddingHorizontal: spacing[4], marginBottom: spacing[6] }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing[2] }}>
        <Feather name="heart" size={32} color={colors.primary} style={{ marginRight: spacing[3] }} />
        <Text
          style={[
            styles.title,
            {
              fontSize: typography.fontSize['3xl'],
              fontWeight: typography.fontWeight.bold,
              color: colors.foreground,
            },
          ]}
        >
          My Favorites
        </Text>
      </View>
      <Text
        style={[
          styles.subtitle,
          {
            fontSize: typography.fontSize.base,
            color: colors.mutedForeground,
          },
        ]}
      >
        Your saved destinations for quick access
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={[styles.emptyState, { paddingVertical: spacing[20], alignItems: 'center' }]}>
      <View
        style={[
          styles.emptyIconContainer,
          {
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.muted,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: spacing[6],
          },
        ]}
      >
        <Feather name="heart" size={64} color={colors.mutedForeground} />
      </View>
      <Text
        style={[
          styles.emptyTitle,
          {
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.bold,
            color: colors.foreground,
            marginBottom: spacing[3],
            textAlign: 'center',
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
            textAlign: 'center',
            marginBottom: spacing[8],
            maxWidth: 300,
            lineHeight: 24,
          },
        ]}
      >
        Start exploring destinations and save your favorites by tapping the heart icon
      </Text>
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
  emptyIconContainer: {
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
