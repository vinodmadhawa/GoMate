import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useNotifications, Notification } from '../context/NotificationContext';
import Header from '../components/Header';

const NotificationsScreen = () => {
  const { colors, typography, spacing, borderRadius, theme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const navigation = useNavigation();

  const getNotificationIcon = (type: Notification['type']) => {
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

  const renderNotification = ({ item }: { item: Notification }) => {
    const icon = getNotificationIcon(item.type);

    return (
      <Pressable
        onPress={() => {
          if (!item.read) {
            markAsRead(item.id);
          }
        }}
        style={[
          styles.notificationItem,
          {
            backgroundColor: item.read ? colors.card : `${colors.primary}10`,
            borderColor: colors.border,
            borderRadius: borderRadius.md,
            padding: spacing[4],
          },
        ]}
      >
        <View style={styles.notificationContent}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: `${icon.color}20`,
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <Feather name={icon.name as any} size={24} color={icon.color} />
          </View>

          <View style={styles.textContainer}>
            <View style={styles.headerRow}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                  },
                ]}
              >
                {item.title}
              </Text>
              {!item.read && (
                <View
                  style={[
                    styles.unreadDot,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.message,
                {
                  fontSize: typography.fontSize.sm,
                  color: colors.mutedForeground,
                  marginTop: spacing[1],
                },
              ]}
            >
              {item.message}
            </Text>
            <Text
              style={[
                styles.timestamp,
                {
                  fontSize: typography.fontSize.xs,
                  color: colors.mutedForeground,
                  marginTop: spacing[2],
                },
              ]}
            >
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>

          <Pressable
            onPress={() => clearNotification(item.id)}
            style={styles.deleteButton}
          >
            <Feather name="x" size={18} color={colors.mutedForeground} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  const renderHeader = () => (
    <View style={[styles.headerSection, { marginBottom: spacing[4] }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="bell" size={32} color={colors.primary} style={{ marginRight: spacing[3] }} />
          <View>
            <Text
              style={[
                styles.headerTitle,
                {
                  fontSize: typography.fontSize['2xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.foreground,
                },
              ]}
            >
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Text
                style={[
                  styles.headerSubtitle,
                  {
                    fontSize: typography.fontSize.sm,
                    color: colors.mutedForeground,
                  },
                ]}
              >
                {unreadCount} unread
              </Text>
            )}
          </View>
        </View>

        {notifications.length > 0 && (
          <Pressable
            onPress={markAllAsRead}
            style={[
              styles.markAllButton,
              {
                backgroundColor: colors.muted,
                paddingHorizontal: spacing[3],
                paddingVertical: spacing[2],
                borderRadius: borderRadius.sm,
              },
            ]}
          >
            <Text
              style={[
                styles.markAllText,
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
    </View>
  );

  const renderEmpty = () => (
    <View style={[styles.emptyState, { paddingVertical: spacing[20] }]}>
      <View
        style={[
          styles.emptyIconContainer,
          {
            backgroundColor: colors.muted,
            borderRadius: 60,
            marginBottom: spacing[6],
          },
        ]}
      >
        <Feather name="bell-off" size={64} color={colors.mutedForeground} />
      </View>
      <Text
        style={[
          styles.emptyTitle,
          {
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.foreground,
            marginBottom: spacing[2],
          },
        ]}
      >
        No notifications yet
      </Text>
      <Text
        style={[
          styles.emptyDescription,
          {
            fontSize: typography.fontSize.base,
            color: colors.mutedForeground,
            textAlign: 'center',
            maxWidth: 300,
          },
        ]}
      >
        When you get notifications, they'll show up here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <Header />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingHorizontal: spacing[4],
            paddingTop: spacing[6],
            paddingBottom: spacing[20],
          },
        ]}
        ItemSeparatorComponent={() => <View style={{ height: spacing[3] }} />}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
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
  headerTitle: {},
  headerSubtitle: {},
  markAllButton: {},
  markAllText: {},
  notificationItem: {
    borderWidth: 1,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {},
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  message: {},
  timestamp: {},
  deleteButton: {
    padding: 4,
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {},
  emptyDescription: {},
});

export default NotificationsScreen;
