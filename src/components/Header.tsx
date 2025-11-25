import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/authSlice';
import { storageService } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  showActions?: boolean;
  showBackButton?: boolean;
  userName?: string;
}

export default function Header({
  showActions = true,
  showBackButton = false,
  userName,
}: HeaderProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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

  return (
    <View style={[styles.header, { 
      paddingTop: insets.top > 0 ? insets.top + 12 : 50,
      backgroundColor: theme.colors.background 
    }]}>
      <View style={styles.headerTop}>
        {showBackButton ? (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>GM</Text>
            </View>
            <View style={styles.logoTextContainer}>
              <Text style={[styles.appTitle, { color: theme.colors.text }]}>GoMate</Text>
              <Text style={[styles.appSubtitle, { color: theme.colors.textSecondary }]}>
                Explore Sri Lanka
              </Text>
            </View>
          </View>
        )}

        {showActions && (
          <View style={styles.headerActions}>
            {userName ? (
              <View style={styles.userInfo}>
                <Feather name="user" size={16} color="#fff" />
                <Text style={styles.userName} numberOfLines={1}>
                  {userName}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.navigate('Profile' as never)}
              >
                <Feather name="user" size={20} color="#fff" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.headerButton}
              onPress={toggleTheme}
            >
              <Feather name={isDark ? 'sun' : 'moon'} size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoTextContainer: {
    flex: 1,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    maxWidth: 140,
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
