import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { storageService } from '../utils/storage';

export default function ProfileScreen({ navigation }: any) {
  const { theme, isDark, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const favorites = useAppSelector(state => state.favorites.items);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await storageService.removeUser();
            dispatch(logout());
          },
        },
      ]
    );
  };

  const ProfileOption = ({ icon, title, subtitle, onPress, showArrow = true }: any) => (
    <TouchableOpacity
      style={[styles.optionCard, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
    >
      <View style={[styles.optionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
        <Feather name={icon} size={22} color={theme.colors.primary} />
      </View>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color: theme.colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.optionSubtitle, { color: theme.colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && <Feather name="chevron-right" size={20} color={theme.colors.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['#10B981', '#0EA5E9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.avatarContainer}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || 'T'}
            </Text>
          </View>
        </MotiView>
        <Text style={styles.userName}>{user?.name || 'Traveler'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'traveler@gomate.com'}</Text>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <Feather name="heart" size={24} color="#EF4444" />
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>
                {favorites.length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Favorites
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <Feather name="map-pin" size={24} color="#10B981" />
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>8</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Visited
              </Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
              <Feather name="award" size={24} color="#F59E0B" />
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>12</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Badges
              </Text>
            </View>
          </View>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600, delay: 200 }}
        >
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Preferences
            </Text>

            <View style={[styles.optionCard, { backgroundColor: theme.colors.card }]}>
              <View style={[styles.optionIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <Feather
                  name={isDark ? 'moon' : 'sun'}
                  size={22}
                  color={theme.colors.primary}
                />
              </View>
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: theme.colors.text }]}>
                  Dark Mode
                </Text>
                <Text style={[styles.optionSubtitle, { color: theme.colors.textSecondary }]}>
                  {isDark ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#cbd5e1', true: theme.colors.primary }}
                thumbColor="#ffffff"
              />
            </View>

            <ProfileOption
              icon="bell"
              title="Notifications"
              subtitle="Manage your notifications"
              onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon!')}
            />

            <ProfileOption
              icon="globe"
              title="Language"
              subtitle="English"
              onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon!')}
            />
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Support
            </Text>

            <ProfileOption
              icon="help-circle"
              title="Help & Support"
              subtitle="Get help with the app"
              onPress={() => Alert.alert('Help', 'Contact us at support@gomate.com')}
            />

            <ProfileOption
              icon="info"
              title="About"
              subtitle="Version 1.0.0"
              onPress={() => Alert.alert('About', 'GoMate - Explore Sri Lanka\nVersion 1.0.0')}
            />

            <ProfileOption
              icon="file-text"
              title="Terms & Privacy"
              subtitle="Read our policies"
              onPress={() => Alert.alert('Coming Soon', 'This feature is coming soon!')}
            />
          </View>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#FEE2E2' }]}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 50,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainer: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 13,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});
