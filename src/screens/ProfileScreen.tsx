import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  StatusBar,
  Switch,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigation = useNavigation();

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) {
        logout();
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: () => logout(),
            style: 'destructive',
          },
        ]
      );
    }
  };

  const menuItems = [
    { icon: 'user', label: 'Account Settings', onPress: () => {} },
    { icon: 'heart', label: `Favorites (${favorites.length})`, onPress: () => navigation.navigate('Favorites' as never) },
    { icon: 'moon', label: 'Dark Mode', onPress: () => {}, isToggle: true },
    { icon: 'info', label: 'About', onPress: () => {} },
    { icon: 'log-out', label: 'Logout', onPress: handleLogout, isDestructive: true },
  ];

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Header />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: spacing[4],
            paddingTop: spacing[6],
            paddingBottom: spacing[20],
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header Section */}
        <LinearGradient
          colors={gradients.primary.colors}
          start={gradients.primary.start}
          end={gradients.primary.end}
          style={[
            styles.profileHeader,
            {
              borderRadius: borderRadius['3xl'],
              padding: spacing[8],
              marginBottom: spacing[6],
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              {
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                marginBottom: spacing[4],
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                {
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: '#FFFFFF',
                },
              ]}
            >
              {user ? getInitials(user.name) : 'U'}
            </Text>
          </View>
          <Text
            style={[
              styles.userName,
              {
                fontSize: typography.fontSize['2xl'],
                fontWeight: typography.fontWeight.bold,
                color: '#FFFFFF',
                marginBottom: spacing[1],
              },
            ]}
          >
            {user?.name || 'Guest'}
          </Text>
          <Text
            style={[
              styles.userEmail,
              {
                fontSize: typography.fontSize.sm,
                color: 'rgba(255, 255, 255, 0.9)',
              },
            ]}
          >
            {user?.email || 'guest@gomate.com'}
          </Text>
        </LinearGradient>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: borderRadius.lg,
                padding: spacing[4],
                marginBottom: spacing[2],
              },
            ]}
          >
            <View style={styles.menuItemLeft}>
              <Feather
                name={item.icon as any}
                size={20}
                color={item.isDestructive ? colors.destructive : colors.foreground}
              />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: item.isDestructive ? colors.destructive : colors.foreground,
                    marginLeft: spacing[3],
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>
            {item.isToggle ? (
              <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.muted, true: colors.primary }}
                thumbColor="#FFFFFF"
              />
            ) : (
              <Feather name="chevron-right" size={20} color={colors.mutedForeground} />
            )}
          </Pressable>
        ))}

        {/* App Version */}
        <Text
          style={[
            styles.appVersion,
            {
              fontSize: typography.fontSize.xs,
              color: colors.mutedForeground,
              textAlign: 'center',
              marginTop: spacing[8],
            },
          ]}
        >
          GoMate v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {},
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {},
  userName: {
    textAlign: 'center',
  },
  userEmail: {
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {},
  appVersion: {},
});

export default ProfileScreen;
