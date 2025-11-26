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
  Modal,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { notifications, unreadCount, markAsRead, clearNotification } = useNotifications();
  const { language, setLanguage, t } = useLanguage();
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showHelpModal, setShowHelpModal] = React.useState(false);
  const [showAboutModal, setShowAboutModal] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);

  const handleLanguagePress = () => {
    if (Platform.OS === 'web') {
      const newLang = language === 'English' ? 'Sinhala' : 'English';
      setLanguage(newLang);
    } else {
      Alert.alert(
        t.selectLanguage,
        t.chooseLanguage,
        [
          {
            text: 'English',
            onPress: () => setLanguage('English'),
          },
          {
            text: 'සිංහල',
            onPress: () => setLanguage('Sinhala'),
          },
          {
            text: t.cancel,
            style: 'cancel',
          },
        ]
      );
    }
  };

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = (global as any).confirm?.(t.logoutConfirm);
      if (confirmed) {
        logout();
      }
    } else {
      Alert.alert(
        t.logout,
        t.logoutConfirm,
        [
          {
            text: t.cancel,
            style: 'cancel',
          },
          {
            text: t.logout,
            onPress: () => logout(),
            style: 'destructive',
          },
        ]
      );
    }
  };

  const menuItems = [
    { icon: 'user', label: t.accountSettings, onPress: () => navigation.navigate('AccountSettings' as never) },
    { icon: 'heart', label: `${t.favorites} (${favorites.length})`, onPress: () => navigation.navigate('Favorites' as never) },
  ];

  const preferenceItems = [
    { icon: 'moon', label: t.darkMode, subtitle: theme === 'dark' ? t.enabled : t.disabled, onPress: () => {}, isToggle: true, isThemeToggle: true },
    { icon: 'bell', label: t.notifications, subtitle: notificationsEnabled ? t.enabled : t.disabled, onPress: () => setShowNotifications(true), isToggle: true, isNotificationToggle: true },
    { icon: 'globe', label: t.language, subtitle: language, onPress: handleLanguagePress },
  ];

  const supportItems = [
    { icon: 'help-circle', label: t.helpSupport, subtitle: t.getHelp, onPress: () => setShowHelpModal(true) },
    { icon: 'info', label: t.about, subtitle: t.version, onPress: () => setShowAboutModal(true) },
    { icon: 'file-text', label: t.termsPrivacy, subtitle: t.readPolicies, onPress: () => setShowTermsModal(true) },
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
          {t.account}
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
          {t.preferences}
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
                value={item.isThemeToggle ? theme === 'dark' : item.isNotificationToggle ? notificationsEnabled : false}
                onValueChange={item.isThemeToggle ? toggleTheme : item.isNotificationToggle ? setNotificationsEnabled : () => {}}
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
          {t.support}
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
              backgroundColor: '#DC2626',
              borderRadius: borderRadius.lg,
              padding: spacing[4],
              marginTop: spacing[6],
              marginBottom: spacing[4],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#DC2626',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            },
          ]}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text
            style={[
              styles.logoutText,
              {
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.bold,
                color: '#FFFFFF',
                marginLeft: spacing[3],
              },
            ]}
          >
            {t.logout}
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

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.card,
                borderRadius: borderRadius.xl,
                maxHeight: '80%',
              },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  borderBottomColor: colors.border,
                  paddingBottom: spacing[4],
                  marginBottom: spacing[4],
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  {
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.foreground,
                  },
                ]}
              >
                {t.notifications} {unreadCount > 0 && `(${unreadCount})`}
              </Text>
              <Pressable onPress={() => setShowNotifications(false)}>
                <Feather name="x" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <ScrollView
              style={styles.notificationsList}
              showsVerticalScrollIndicator={false}
            >
              {notifications.length === 0 ? (
                <Text
                  style={[
                    styles.emptyText,
                    {
                      fontSize: typography.fontSize.base,
                      color: colors.mutedForeground,
                      textAlign: 'center',
                      marginTop: spacing[8],
                    },
                  ]}
                >
                  {t.noNotifications}
                </Text>
              ) : (
                notifications.map((notification) => (
                  <View
                    key={notification.id}
                    style={[
                      styles.notificationItem,
                      {
                        backgroundColor: notification.read
                          ? colors.background
                          : colors.muted,
                        borderRadius: borderRadius.lg,
                        padding: spacing[4],
                        marginBottom: spacing[2],
                      },
                    ]}
                  >
                    <View style={styles.notificationHeader}>
                      <Text
                        style={[
                          styles.notificationTitle,
                          {
                            fontSize: typography.fontSize.base,
                            fontWeight: typography.fontWeight.semibold,
                            color: colors.foreground,
                            flex: 1,
                          },
                        ]}
                      >
                        {notification.title}
                      </Text>
                      <View style={styles.notificationActions}>
                        {!notification.read && (
                          <Pressable
                            onPress={() => markAsRead(notification.id)}
                            style={{ marginRight: spacing[2] }}
                          >
                            <Feather
                              name="check"
                              size={18}
                              color={colors.primary}
                            />
                          </Pressable>
                        )}
                        <Pressable
                          onPress={() => clearNotification(notification.id)}
                        >
                          <Feather
                            name="trash-2"
                            size={18}
                            color={colors.destructive}
                          />
                        </Pressable>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.notificationMessage,
                        {
                          fontSize: typography.fontSize.sm,
                          color: colors.mutedForeground,
                          marginTop: spacing[1],
                        },
                      ]}
                    >
                      {notification.message}
                    </Text>
                    <Text
                      style={[
                        styles.notificationTime,
                        {
                          fontSize: typography.fontSize.xs,
                          color: colors.mutedForeground,
                          marginTop: spacing[2],
                        },
                      ]}
                    >
                      {new Date(notification.timestamp).toLocaleString()}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        visible={showHelpModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.card,
                borderRadius: borderRadius.xl,
                maxHeight: '80%',
              },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  borderBottomColor: colors.border,
                  paddingBottom: spacing[4],
                  marginBottom: spacing[4],
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  {
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.foreground,
                  },
                ]}
              >
                {t.helpSupport}
              </Text>
              <Pressable onPress={() => setShowHelpModal(false)}>
                <Feather name="x" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingBottom: spacing[4] }}>
                <Text
                  style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginBottom: spacing[3],
                  }}
                >
                  {language === 'English' ? 'Contact Us' : 'අප අමතන්න'}
                </Text>
                <Text
                  style={{
                    fontSize: typography.fontSize.base,
                    color: colors.mutedForeground,
                    marginBottom: spacing[4],
                    lineHeight: 24,
                  }}
                >
                  {language === 'English' 
                    ? 'Need help? Our support team is here to assist you with any questions or issues.'
                    : 'උපකාර අවශ්‍යද? ඕනෑම ප්‍රශ්නයක් හෝ ගැටලුවක් සඳහා ඔබට සහාය වීමට අපගේ සහාය කණ්ඩායම මෙහි සිටී.'}
                </Text>

                <View style={{ marginBottom: spacing[4] }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing[2] }}>
                    <Feather name="mail" size={20} color={colors.primary} style={{ marginRight: spacing[2] }} />
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground }}>
                      support@gomate.lk
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing[2] }}>
                    <Feather name="phone" size={20} color={colors.primary} style={{ marginRight: spacing[2] }} />
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground }}>
                      +94 70 122 5 188
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="clock" size={20} color={colors.primary} style={{ marginRight: spacing[2] }} />
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground }}>
                      {language === 'English' ? 'Mon-Fri, 9AM-6PM' : 'සඳුදා-සිකුරාදා, පෙ.ව. 9-ප.ව. 6'}
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginTop: spacing[4],
                    marginBottom: spacing[3],
                  }}
                >
                  {language === 'English' ? 'FAQs' : 'නිතර අසන ප්‍රශ්න'}
                </Text>
                
                <View style={{ marginBottom: spacing[3] }}>
                  <Text style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, color: colors.foreground, marginBottom: spacing[1] }}>
                    {language === 'English' ? 'How do I book a destination?' : 'මම ගමනාන්තයක් වෙන්කරවා ගන්නේ කෙසේද?'}
                  </Text>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, lineHeight: 20 }}>
                    {language === 'English' 
                      ? 'Browse destinations, select your preferred location, and follow the booking process. You can save favorites for quick access.'
                      : 'ගමනාන්ත බ්‍රව්ස් කරන්න, ඔබගේ කැමති ස්ථානය තෝරන්න, සහ වෙන්කරවා ගැනීමේ ක්‍රියාවලිය අනුගමනය කරන්න. ඉක්මන් ප්‍රවේශය සඳහා ඔබට ප්‍රියතම සුරැකිය හැක.'}
                  </Text>
                </View>

                <View style={{ marginBottom: spacing[3] }}>
                  <Text style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, color: colors.foreground, marginBottom: spacing[1] }}>
                    {language === 'English' ? 'How do I change my profile settings?' : 'මගේ පැතිකඩ සැකසීම් වෙනස් කරන්නේ කෙසේද?'}
                  </Text>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, lineHeight: 20 }}>
                    {language === 'English' 
                      ? 'Go to Profile > Account Settings to update your name, email, password, and profile picture.'
                      : 'ඔබගේ නම, විද්‍යුත් තැපෑල, මුරපදය සහ පැතිකඩ පින්තූරය යාවත්කාලීන කිරීමට පැතිකඩ > ගිණුම් සැකසීම් වෙත යන්න.'}
                  </Text>
                </View>

                <View style={{ marginBottom: spacing[3] }}>
                  <Text style={{ fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.semibold, color: colors.foreground, marginBottom: spacing[1] }}>
                    {language === 'English' ? 'Is my data secure?' : 'මගේ දත්ත ආරක්ෂිතද?'}
                  </Text>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, lineHeight: 20 }}>
                    {language === 'English' 
                      ? 'Yes, we use industry-standard encryption to protect your personal information and payment details.'
                      : 'ඔව්, ඔබගේ පුද්ගලික තොරතුරු සහ ගෙවීම් විස්තර ආරක්ෂා කිරීම සඳහා අපි කර්මාන්ත ප්‍රමිති සංකේතනය භාවිතා කරමු.'}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.card,
                borderRadius: borderRadius.xl,
                maxHeight: '80%',
              },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  borderBottomColor: colors.border,
                  paddingBottom: spacing[4],
                  marginBottom: spacing[4],
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  {
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.foreground,
                  },
                ]}
              >
                {t.about}
              </Text>
              <Pressable onPress={() => setShowAboutModal(false)}>
                <Feather name="x" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingBottom: spacing[4] }}>
                <View style={{ alignItems: 'center', marginBottom: spacing[6] }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: colors.primary,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing[3],
                    }}
                  >
                    <Feather name="map-pin" size={40} color="#FFFFFF" />
                  </View>
                  <Text
                    style={{
                      fontSize: typography.fontSize['2xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: colors.foreground,
                      marginBottom: spacing[1],
                    }}
                  >
                    GoMate
                  </Text>
                  <Text
                    style={{
                      fontSize: typography.fontSize.base,
                      color: colors.mutedForeground,
                    }}
                  >
                    {t.version}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: typography.fontSize.base,
                    color: colors.mutedForeground,
                    lineHeight: 24,
                    marginBottom: spacing[4],
                    textAlign: 'center',
                  }}
                >
                  {language === 'English'
                    ? 'GoMate is your ultimate travel companion for exploring the beautiful island of Sri Lanka. Discover hidden gems, plan your perfect itinerary, and experience the rich culture and natural beauty of this tropical paradise.'
                    : 'GoMate යනු ශ්‍රී ලංකාවේ අලංකාර දිවයින ගවේෂණය කිරීම සඳහා ඔබගේ අවසාන සංචාරක සහචරයා වේ. සැඟවුණු මැණික් සොයා ගන්න, ඔබගේ පරිපූර්ණ ගමන් මාර්ගය සැලසුම් කරන්න, සහ මෙම නිවර්තන පාරාදීසයේ පොහොසත් සංස්කෘතිය සහ ස්වාභාවික සුන්දරත්වය අත්විඳින්න.'}
                </Text>

                <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing[4], marginTop: spacing[4] }}>
                  <Text
                    style={{
                      fontSize: typography.fontSize.lg,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.foreground,
                      marginBottom: spacing[3],
                    }}
                  >
                    {language === 'English' ? 'Features' : 'විශේෂාංග'}
                  </Text>
                  <View style={{ marginBottom: spacing[2] }}>
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground, marginBottom: spacing[1] }}>
                      • {language === 'English' ? 'Explore 100+ destinations' : 'ගමනාන්ත 100+ ගවේෂණය කරන්න'}
                    </Text>
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground, marginBottom: spacing[1] }}>
                      • {language === 'English' ? 'Interactive maps and navigation' : 'අන්තර්ක්‍රියාකාරී සිතියම් සහ සංචලනය'}
                    </Text>
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground, marginBottom: spacing[1] }}>
                      • {language === 'English' ? 'Save your favorite places' : 'ඔබගේ ප්‍රියතම ස්ථාන සුරකින්න'}
                    </Text>
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground, marginBottom: spacing[1] }}>
                      • {language === 'English' ? 'Real-time travel updates' : 'තත්‍ය කාලීන සංචාරක යාවත්කාලීන'}
                    </Text>
                    <Text style={{ fontSize: typography.fontSize.base, color: colors.foreground }}>
                      • {language === 'English' ? 'Bilingual support (English & Sinhala)' : 'ද්විභාෂා සහාය (ඉංග්‍රීසි සහ සිංහල)'}
                    </Text>
                  </View>
                </View>

                <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing[4], marginTop: spacing[4] }}>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, textAlign: 'center' }}>
                    © 2025 GoMate. {language === 'English' ? 'All rights reserved.' : 'සියලු හිමිකම් ඇවිරිණි.'}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Terms & Privacy Modal */}
      <Modal
        visible={showTermsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowTermsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.card,
                borderRadius: borderRadius.xl,
                maxHeight: '80%',
              },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  borderBottomColor: colors.border,
                  paddingBottom: spacing[4],
                  marginBottom: spacing[4],
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitle,
                  {
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.foreground,
                  },
                ]}
              >
                {t.termsPrivacy}
              </Text>
              <Pressable onPress={() => setShowTermsModal(false)}>
                <Feather name="x" size={24} color={colors.foreground} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ paddingBottom: spacing[4] }}>
                <Text
                  style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginBottom: spacing[3],
                  }}
                >
                  {language === 'English' ? 'Terms of Service' : 'සේවා කොන්දේසි'}
                </Text>
                <Text
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.mutedForeground,
                    lineHeight: 22,
                    marginBottom: spacing[4],
                  }}
                >
                  {language === 'English'
                    ? 'By using GoMate, you agree to our terms of service. The app is provided "as is" for informational and booking purposes. Users are responsible for verifying destination details and travel requirements before making any bookings.'
                    : 'GoMate භාවිතා කිරීමෙන්, ඔබ අපගේ සේවා කොන්දේසි වලට එකඟ වේ. මෙම යෙදුම තොරතුරු සහ වෙන්කරවා ගැනීමේ අරමුණු සඳහා "පවතින ආකාරයටම" සපයනු ලැබේ. කිසියම් වෙන්කරවා ගැනීමක් කිරීමට පෙර ගමනාන්ත විස්තර සහ සංචාරක අවශ්‍යතා සත්‍යාපනය කිරීම සඳහා පරිශීලකයින් වගකිව යුතුය.'}
                </Text>

                <Text
                  style={{
                    fontSize: typography.fontSize.lg,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.foreground,
                    marginTop: spacing[4],
                    marginBottom: spacing[3],
                  }}
                >
                  {language === 'English' ? 'Privacy Policy' : 'රහස්‍යතා ප්‍රතිපත්තිය'}
                </Text>
                <Text
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.mutedForeground,
                    lineHeight: 22,
                    marginBottom: spacing[2],
                  }}
                >
                  {language === 'English'
                    ? 'Your privacy is important to us. GoMate collects and uses your data as follows:'
                    : 'ඔබේ රහස්‍යතාව අපට වැදගත් වේ. GoMate පහත පරිදි ඔබේ දත්ත එකතු කර භාවිතා කරයි:'}
                </Text>

                <View style={{ marginLeft: spacing[3], marginBottom: spacing[3] }}>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, marginBottom: spacing[2], lineHeight: 22 }}>
                    • {language === 'English'
                      ? 'Personal Information: Name, email, and profile data for account management'
                      : 'පුද්ගලික තොරතුරු: ගිණුම් කළමනාකරණය සඳහා නම, විද්‍යුත් තැපෑල සහ පැතිකඩ දත්ත'}
                  </Text>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, marginBottom: spacing[2], lineHeight: 22 }}>
                    • {language === 'English'
                      ? 'Usage Data: App interactions and preferences to improve your experience'
                      : 'භාවිත දත්ත: ඔබේ අත්දැකීම වැඩිදියුණු කිරීම සඳහා යෙදුම් අන්තර්ක්‍රියා සහ මනාපයන්'}
                  </Text>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, marginBottom: spacing[2], lineHeight: 22 }}>
                    • {language === 'English'
                      ? 'Location Data: To provide destination recommendations and navigation'
                      : 'ස්ථාන දත්ත: ගමනාන්ත නිර්දේශ සහ සංචලනය ලබා දීමට'}
                  </Text>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, lineHeight: 22 }}>
                    • {language === 'English'
                      ? 'Payment Information: Securely encrypted for transactions'
                      : 'ගෙවීම් තොරතුරු: ගනුදෙනු සඳහා ආරක්ෂිතව සංකේතනය කර ඇත'}
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.mutedForeground,
                    lineHeight: 22,
                    marginTop: spacing[2],
                  }}
                >
                  {language === 'English'
                    ? 'We do not sell your personal data to third parties. Data is stored securely and only used to enhance your GoMate experience. You can request data deletion at any time by contacting our support team.'
                    : 'අපි ඔබගේ පුද්ගලික දත්ත තෙවන පාර්ශ්වයන්ට විකුණන්නේ නැත. දත්ත ආරක්ෂිතව ගබඩා කර ඇති අතර ඔබගේ GoMate අත්දැකීම වැඩිදියුණු කිරීමට පමණක් භාවිතා කරයි. ඔබට අපගේ සහාය කණ්ඩායම අමතා ඕනෑම වේලාවක දත්ත මකා දැමීම ඉල්ලා සිටිය හැක.'}
                </Text>

                <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing[4], marginTop: spacing[4] }}>
                  <Text style={{ fontSize: typography.fontSize.sm, color: colors.mutedForeground, textAlign: 'center' }}>
                    {language === 'English' ? 'Last updated: November 2025' : 'අවසන් වරට යාවත්කාලීන කළේ: නොවැම්බර් 2025'}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  modalTitle: {},
  notificationsList: {
    maxHeight: 500,
  },
  emptyText: {},
  notificationItem: {},
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationTitle: {},
  notificationActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationMessage: {},
  notificationTime: {},
});

export default ProfileScreen;
