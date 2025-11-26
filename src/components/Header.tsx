import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
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
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const navigation = useNavigation();
  const [showNotifications, setShowNotifications] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'favorite_added':
        return { name: 'heart', color: colors.primary };
      case 'favorite_removed':
        return { name: 'heart', color: colors.mutedForeground };
      case 'account_updated':
      case 'profile_updated':
        return { name: 'user', color: colors.secondary };
      default:
        return { name: 'bell', color: colors.accent };
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

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
            <Pressable
              onPress={() => navigation.navigate('Profile' as never)}
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
              {user.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    marginRight: spacing[2],
                  }}
                />
              ) : (
                <Feather name="user" size={16} color={colors.primary} />
              )}
              <Text
                style={[
                  styles.userName,
                  {
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.foreground,
                    marginLeft: user.profileImage ? 0 : spacing[2],
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {user.name}
              </Text>
            </Pressable>
          )}

          {/* Action Buttons */}
          {showActions && (
            <>
              {/* Notification Button */}
              {user && (
                <Pressable
                  style={styles.actionButton}
                  onPress={() => setShowNotifications(!showNotifications)}
                >
                  <Feather name="bell" size={20} color={colors.foreground} />
                  {unreadCount > 0 && (
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor: colors.primary,
                          minWidth: unreadCount > 9 ? 20 : 16,
                          height: 16,
                          borderRadius: 8,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          {
                            fontSize: typography.fontSize.xs,
                            color: '#FFFFFF',
                          },
                        ]}
                      >
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </Text>
                    </View>
                  )}
                </Pressable>
              )}

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

      {/* Notifications Dropdown */}
      <Modal
        visible={showNotifications}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowNotifications(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.notificationDropdown,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: borderRadius.lg,
                  },
                ]}
              >
                {/* Dropdown Header */}
                <View
                  style={[
                    styles.dropdownHeader,
                    {
                      borderBottomColor: colors.border,
                      paddingHorizontal: spacing[4],
                      paddingVertical: spacing[3],
                    },
                  ]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="bell" size={20} color={colors.primary} />
                    <Text
                      style={[
                        styles.dropdownTitle,
                        {
                          fontSize: typography.fontSize.lg,
                          fontWeight: typography.fontWeight.bold,
                          color: colors.foreground,
                          marginLeft: spacing[2],
                        },
                      ]}
                    >
                      Notifications
                    </Text>
                    {unreadCount > 0 && (
                      <View
                        style={[
                          styles.dropdownBadge,
                          {
                            backgroundColor: colors.primary,
                            marginLeft: spacing[2],
                            paddingHorizontal: spacing[2],
                            paddingVertical: 2,
                            borderRadius: borderRadius.sm,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.dropdownBadgeText,
                            {
                              fontSize: typography.fontSize.xs,
                              fontWeight: typography.fontWeight.bold,
                              color: '#FFFFFF',
                            },
                          ]}
                        >
                          {unreadCount}
                        </Text>
                      </View>
                    )}
                  </View>
                  {notifications.length > 0 && (
                    <Pressable
                      onPress={markAllAsRead}
                      style={{
                        paddingVertical: spacing[1],
                        paddingHorizontal: spacing[2],
                      }}
                    >
                      <Text
                        style={[
                          {
                            fontSize: typography.fontSize.sm,
                            fontWeight: typography.fontWeight.medium,
                            color: colors.primary,
                          },
                        ]}
                      >
                        Mark all read
                      </Text>
                    </Pressable>
                  )}
                </View>

                {/* Notifications List */}
                <ScrollView
                  style={styles.notificationsList}
                  showsVerticalScrollIndicator={false}
                >
                  {notifications.length === 0 ? (
                    <View
                      style={[
                        styles.emptyState,
                        { paddingVertical: spacing[8], alignItems: 'center' },
                      ]}
                    >
                      <Feather name="bell-off" size={48} color={colors.mutedForeground} />
                      <Text
                        style={[
                          styles.emptyText,
                          {
                            fontSize: typography.fontSize.base,
                            color: colors.mutedForeground,
                            marginTop: spacing[3],
                            textAlign: 'center',
                          },
                        ]}
                      >
                        No notifications yet
                      </Text>
                    </View>
                  ) : (
                    notifications.map((notification) => {
                      const icon = getNotificationIcon(notification.type);
                      return (
                        <Pressable
                          key={notification.id}
                          onPress={() => {
                            if (!notification.read) {
                              markAsRead(notification.id);
                            }
                          }}
                          style={[
                            styles.notificationItem,
                            {
                              backgroundColor: notification.read
                                ? 'transparent'
                                : `${colors.primary}10`,
                              borderBottomColor: colors.border,
                              paddingHorizontal: spacing[4],
                              paddingVertical: spacing[3],
                            },
                          ]}
                        >
                          <View style={styles.notificationContent}>
                            <View
                              style={[
                                styles.notificationIcon,
                                {
                                  backgroundColor: `${icon.color}20`,
                                  borderRadius: borderRadius.sm,
                                },
                              ]}
                            >
                              <Feather name={icon.name as any} size={20} color={icon.color} />
                            </View>

                            <View style={styles.notificationText}>
                              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text
                                  style={[
                                    styles.notificationTitle,
                                    {
                                      fontSize: typography.fontSize.sm,
                                      fontWeight: typography.fontWeight.semibold,
                                      color: colors.foreground,
                                      flex: 1,
                                    },
                                  ]}
                                  numberOfLines={1}
                                >
                                  {notification.title}
                                </Text>
                                {!notification.read && (
                                  <View
                                    style={[
                                      styles.unreadDot,
                                      {
                                        backgroundColor: colors.primary,
                                        marginLeft: spacing[2],
                                      },
                                    ]}
                                  />
                                )}
                              </View>
                              <Text
                                style={[
                                  styles.notificationMessage,
                                  {
                                    fontSize: typography.fontSize.xs,
                                    color: colors.mutedForeground,
                                    marginTop: 2,
                                  },
                                ]}
                                numberOfLines={2}
                              >
                                {notification.message}
                              </Text>
                              <Text
                                style={[
                                  styles.notificationTime,
                                  {
                                    fontSize: typography.fontSize.xs,
                                    color: colors.mutedForeground,
                                    marginTop: 4,
                                  },
                                ]}
                              >
                                {formatTimestamp(notification.timestamp)}
                              </Text>
                            </View>

                            <Pressable
                              onPress={() => clearNotification(notification.id)}
                              style={{ padding: spacing[1] }}
                            >
                              <Feather name="x" size={16} color={colors.mutedForeground} />
                            </Pressable>
                          </View>
                        </Pressable>
                      );
                    })
                  )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    maxWidth: 150,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontWeight: '700',
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 64,
  },
  notificationDropdown: {
    position: 'absolute',
    top: 72,
    right: 16,
    width: Math.min(Dimensions.get('window').width - 32, 400),
    maxHeight: 500,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  dropdownTitle: {},
  dropdownBadge: {},
  dropdownBadgeText: {},
  notificationsList: {
    maxHeight: 400,
  },
  emptyState: {},
  emptyText: {},
  notificationItem: {
    borderBottomWidth: 1,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    flex: 1,
    marginLeft: 12,
  },
  notificationTitle: {},
  notificationMessage: {},
  notificationTime: {},
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default Header;
