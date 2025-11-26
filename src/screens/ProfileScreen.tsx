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
  Image,
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
    { icon: 'user', label: 'Account Settings', onPress: () => navigation.navigate('AccountSettings' as never) },
    { icon: 'heart', label: `Favorites (${favorites.length})`, onPress: () => navigation.navigate('Favorites' as never) },
  ];

  const preferenceItems = [
    { icon: 'moon', label: 'Dark Mode', subtitle: theme === 'dark' ? 'Enabled' : 'Disabled', onPress: () => {}, isToggle: true },
    { icon: 'bell', label: 'Notifications', subtitle: 'Manage your notifications', onPress: () => {} },
    { icon: 'globe', label: 'Language', subtitle: 'English', onPress: () => {} },
  ];

  const supportItems = [
    { icon: 'help-circle', label: 'Help & Support', subtitle: 'Get help with the app', onPress: () => {} },
    { icon: 'info', label: 'About', subtitle: 'Version 1.0.0', onPress: () => {} },
    { icon: 'file-text', label: 'Terms & Privacy', subtitle: 'Read our policies', onPress: () => {} },
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
        <View
          style={[
            styles.profileHeader,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: borderRadius['2xl'],
              padding: spacing[6],
              marginBottom: spacing[6],
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                marginRight: spacing[4],
              }}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                {
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#14B8A6',
                  marginRight: spacing[4],
                },
              ]}
            >
              <Text
                style={[
                  styles.avatarText,
                  {
                    fontSize: typography.fontSize['3xl'],
                    fontWeight: typography.fontWeight.bold,
                    color: '#FFFFFF',
                  },
                ]}
              >
                {user ? getInitials(user.name) : 'U'}
              </Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text
              style={[
                styles.userName,
                {
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.foreground,
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
                  fontSize: typography.fontSize.base,
                  color: colors.mutedForeground,
                },
              ]}
            >
              {user?.email || 'guest@gomate.com'}
            </Text>
          </View>
        </View>

        {/* Account Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              color: colors.mutedForeground,
              marginBottom: spacing[3],
              marginTop: spacing[2],
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            },
          ]}
        >
          Account
        </Text>
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
                color={colors.foreground}
              />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.foreground,
                    marginLeft: spacing[3],
                  },
                ]}
              >
                {item.label}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.mutedForeground} />
          </Pressable>
        ))}

        {/* Preferences Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              color: colors.mutedForeground,
              marginBottom: spacing[3],
              marginTop: spacing[6],
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            },
          ]}
        >
          Preferences
        </Text>
        {preferenceItems.map((item, index) => (
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
                color={colors.foreground}
              />
              <View style={{ marginLeft: spacing[3] }}>
                <Text
                  style={[
                    styles.menuItemText,
                    {
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.medium,
                      color: colors.foreground,
                    },
                  ]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.menuItemSubtitle,
                    {
                      fontSize: typography.fontSize.sm,
                      color: colors.mutedForeground,
                      marginTop: spacing[1],
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>
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

        {/* Support Section */}
        <Text
          style={[
            styles.sectionTitle,
            {
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.bold,
              color: colors.mutedForeground,
              marginBottom: spacing[3],
              marginTop: spacing[6],
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            },
          ]}
        >
          Support
        </Text>
        {supportItems.map((item, index) => (
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
                color={colors.foreground}
              />
              <View style={{ marginLeft: spacing[3] }}>
                <Text
                  style={[
                    styles.menuItemText,
                    {
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.medium,
                      color: colors.foreground,
                    },
                  ]}
                >
                  {item.label}
                </Text>
                <Text
                  style={[
                    styles.menuItemSubtitle,
                    {
                      fontSize: typography.fontSize.sm,
                      color: colors.mutedForeground,
                      marginTop: spacing[1],
                    },
                  ]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color={colors.mutedForeground} />
          </Pressable>
        ))}

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          style={[
            styles.logoutButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.destructive,
              borderWidth: 1,
              borderRadius: borderRadius.lg,
              padding: spacing[4],
              marginTop: spacing[6],
              marginBottom: spacing[4],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <Feather name="log-out" size={20} color={colors.destructive} />
          <Text
            style={[
              styles.logoutText,
              {
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                color: colors.destructive,
                marginLeft: spacing[3],
              },
            ]}
          >
            Logout
          </Text>
        </Pressable>

        {/* App Version */}
        <Text
          style={[
            styles.appVersion,
            {
              fontSize: typography.fontSize.xs,
              color: colors.mutedForeground,
              textAlign: 'center',
              marginTop: spacing[4],
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
  profileHeader: {},
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {},
  userInfo: {
    flex: 1,
  },
  userName: {},
  userEmail: {},
  sectionTitle: {},
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
  menuItemSubtitle: {},
  logoutButton: {},
  logoutText: {},
  appVersion: {},
});

export default ProfileScreen;
