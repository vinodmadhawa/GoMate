import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  showUserBadge?: boolean;
  showActions?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  showUserBadge = true,
  showActions = true,
}) => {
  const { colors, typography, spacing, borderRadius, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
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
          onPress: async () => {
            await logout();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { borderBottomColor: `${colors.border}66` }]}>
      <BlurView
        intensity={80}
        tint={theme === 'light' ? 'light' : 'dark'}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.content, { paddingHorizontal: spacing[4] }]}>
        {/* Logo and Title Section */}
        <View style={styles.leftSection}>
          <LinearGradient
            colors={['#34D399', '#0EA5E9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.logo, { borderRadius: borderRadius.sm }]}
          >
            <Text style={[styles.logoText, { fontSize: typography.fontSize.xl }]}>
              GM
            </Text>
          </LinearGradient>
          <View style={styles.titleContainer}>
            <Text
              style={[
                styles.title,
                {
                  fontSize: typography.fontSize.xl,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.foreground,
                },
              ]}
            >
              GoMate
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  fontSize: typography.fontSize.xs,
                  color: colors.mutedForeground,
                },
              ]}
            >
              Explore Sri Lanka
            </Text>
          </View>
        </View>

        {/* Right Section - User Badge and Actions */}
        <View style={styles.rightSection}>
          {/* User Badge (hidden on small screens in production) */}
          {showUserBadge && user && (
            <View
              style={[
                styles.userBadge,
                {
                  backgroundColor: colors.muted,
                  paddingHorizontal: spacing[3],
                  paddingVertical: spacing[1] + 2,
                  borderRadius: borderRadius.md,
                },
              ]}
            >
              <Feather name="user" size={16} color={colors.primary} />
              <Text
                style={[
                  styles.userName,
                  {
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.foreground,
                    marginLeft: spacing[2],
                  },
                ]}
              >
                {user.name}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          {showActions && (
            <>
              {/* Theme Toggle Button */}
              <Pressable
                style={styles.actionButton}
                onPress={toggleTheme}
              >
                <Feather
                  name={theme === 'light' ? 'moon' : 'sun'}
                  size={20}
                  color={colors.foreground}
                />
              </Pressable>

              {/* Logout Button (if logged in) */}
              {user && (
                <Pressable
                  style={styles.actionButton}
                  onPress={handleLogout}
                >
                  <Feather name="log-out" size={20} color={colors.foreground} />
                </Pressable>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 8 : 0,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  titleContainer: {
    marginLeft: 12,
  },
  title: {
    lineHeight: 24,
  },
  subtitle: {
    lineHeight: 14,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    maxWidth: 100,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
