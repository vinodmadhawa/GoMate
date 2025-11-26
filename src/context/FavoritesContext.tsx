import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNotifications } from './NotificationContext';
import { destinations } from '../data/destinations';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'gomate_favorites';

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotifications();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesJson) {
        setFavorites(JSON.parse(favoritesJson));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const isAdding = !favorites.includes(id);
      const destination = destinations.find(d => d.id === id);
      
      const newFavorites = favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id];

      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));

      // Add notification
      if (destination) {
        addNotification({
          type: isAdding ? 'favorite_added' : 'favorite_removed',
          title: isAdding ? 'Added to Favorites' : 'Removed from Favorites',
          message: `${destination.name} has been ${isAdding ? 'added to' : 'removed from'} your favorites`,
          data: { destinationId: id },
        });
      }

      Toast.show({
        type: 'success',
        text1: favorites.includes(id) ? 'Removed from favorites' : 'Added to favorites',
        text2: favorites.includes(id)
          ? 'Destination removed from your favorites'
          : 'Destination added to your favorites',
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update favorites',
      });
    }
  };

  const isFavorite = (id: string): boolean => {
    return favorites.includes(id);
  };

  const value: FavoritesContextType = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  if (isLoading) {
    return null;
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
