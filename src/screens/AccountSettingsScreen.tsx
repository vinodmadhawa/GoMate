import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { User } from '../types';

const USER_STORAGE_KEY = 'gomate_user';
const USERS_STORAGE_KEY = 'gomate_users';

const AccountSettingsScreen = () => {
  const { colors, typography, spacing, borderRadius, theme } = useTheme();
  const { user, logout } = useAuth();
  const { addNotification } = useNotifications();
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getInitials = (name: string) => {
    const names = name.split(' ');
    return names.map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Required',
          text2: 'Please grant permission to access photos',
          position: 'top',
        });
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setProfileImage(result.assets[0].uri);
        Toast.show({
          type: 'success',
          text1: 'Profile Photo Selected',
          text2: 'Save changes to update your profile',
          position: 'top',
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to pick image',
        position: 'top',
      });
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Validate name
      if (name.length < 2) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Name',
          text2: 'Name must be at least 2 characters',
          position: 'top',
        });
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address',
          position: 'top',
        });
        return;
      }

      // Get all users
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Check if email is taken by another user
      const emailTaken = users.some((u) => u.email === email && u.id !== user?.id);
      if (emailTaken) {
        Toast.show({
          type: 'error',
          text1: 'Email Taken',
          text2: 'This email is already in use',
          position: 'top',
        });
        return;
      }

      // Update user
      const updatedUser: User = {
        ...user!,
        name,
        email,
        profileImage: profileImage || undefined,
      };

      // Update in users array
      const updatedUsers = users.map((u) => 
        u.id === user?.id ? updatedUser : u
      );
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

      // Update current user
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

      // Add notification
      addNotification({
        type: 'profile_updated',
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated',
      });

      // Update context (force re-render by logging out and back in)
      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your changes have been saved. Please login again.',
        position: 'top',
        visibilityTime: 3000,
      });

      setIsEditing(false);

      // Logout after delay to show toast
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      console.error('Error saving profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save changes',
        position: 'top',
      });
    }
  };

  const handleChangePassword = async () => {
    try {
      // Validate current password
      if (user?.password !== currentPassword) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Password',
          text2: 'Current password is incorrect',
          position: 'top',
        });
        return;
      }

      // Validate new password
      if (newPassword.length < 6) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Password',
          text2: 'Password must be at least 6 characters',
          position: 'top',
        });
        return;
      }

      // Validate password match
      if (newPassword !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'Passwords Don\'t Match',
          text2: 'New password and confirm password must match',
          position: 'top',
        });
        return;
      }

      // Get all users
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Update user password
      const updatedUser: User = {
        ...user!,
        password: newPassword,
      };

      // Update in users array
      const updatedUsers = users.map((u) => 
        u.id === user?.id ? updatedUser : u
      );
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

      // Update current user
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));

      Toast.show({
        type: 'success',
        text1: 'Password Changed',
        text2: 'Your password has been updated successfully',
        position: 'top',
        visibilityTime: 3000,
      });

      // Reset form
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to change password',
        position: 'top',
      });
    }
  };

  const handleDeleteAccount = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      );
      if (confirmed) {
        deleteAccount();
      }
    } else {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            onPress: deleteAccount,
            style: 'destructive',
          },
        ]
      );
    }
  };

  const deleteAccount = async () => {
    try {
      // Get all users
      const usersJson = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Remove current user
      const updatedUsers = users.filter((u) => u.id !== user?.id);
      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));

      Toast.show({
        type: 'success',
        text1: 'Account Deleted',
        text2: 'Your account has been permanently deleted',
        position: 'top',
        visibilityTime: 3000,
      });

      // Logout
      setTimeout(() => {
        logout();
      }, 1500);
    } catch (error) {
      console.error('Error deleting account:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to delete account',
        position: 'top',
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      
      {/* Fixed Header */}
      <View
        style={{
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[4],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ padding: spacing[2] }}
        >
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </Pressable>
        <Text
          style={{
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.foreground,
          }}
        >
          Account Settings
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing[4],
          paddingTop: spacing[6],
          paddingBottom: spacing[20],
        }}
      >
        {/* Profile Photo Section */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: borderRadius.xl,
              padding: spacing[6],
              marginBottom: spacing[4],
              alignItems: 'center',
            },
          ]}
        >
          <Pressable onPress={pickImage} style={styles.avatarContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View
                style={[
                  styles.avatar,
                  {
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: '#14B8A6',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.avatarText,
                    {
                      fontSize: typography.fontSize['4xl'],
                      fontWeight: typography.fontWeight.bold,
                      color: '#FFFFFF',
                    },
                  ]}
                >
                  {user ? getInitials(user.name) : 'U'}
                </Text>
              </View>
            )}
            <View
              style={[
                styles.cameraIcon,
                {
                  backgroundColor: colors.primary,
                  borderRadius: 20,
                  padding: spacing[2],
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                },
              ]}
            >
              <Feather name="camera" size={20} color="#FFFFFF" />
            </View>
          </Pressable>
          <Text
            style={[
              styles.photoHint,
              {
                fontSize: typography.fontSize.sm,
                color: colors.mutedForeground,
                marginTop: spacing[3],
                textAlign: 'center',
              },
            ]}
          >
            Tap to change profile photo
          </Text>
        </View>

        {/* Profile Information */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: borderRadius.xl,
              padding: spacing[4],
              marginBottom: spacing[4],
            },
          ]}
        >
          <View style={[styles.sectionHeader, { marginBottom: spacing[4] }]}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.foreground,
                },
              ]}
            >
              Profile Information
            </Text>
            {!isEditing ? (
              <Pressable onPress={() => setIsEditing(true)}>
                <Feather name="edit-2" size={20} color={colors.primary} />
              </Pressable>
            ) : null}
          </View>

          {/* Name Field */}
          <View style={[styles.inputGroup, { marginBottom: spacing[4] }]}>
            <Text
              style={[
                styles.label,
                {
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.foreground,
                  marginBottom: spacing[2],
                },
              ]}
            >
              Full Name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              editable={isEditing}
              style={[
                styles.input,
                {
                  backgroundColor: isEditing ? colors.background : colors.muted,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: borderRadius.md,
                  paddingHorizontal: spacing[4],
                  paddingVertical: spacing[3],
                  fontSize: typography.fontSize.base,
                  color: colors.foreground,
                },
              ]}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          {/* Email Field */}
          <View style={[styles.inputGroup, { marginBottom: spacing[4] }]}>
            <Text
              style={[
                styles.label,
                {
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.foreground,
                  marginBottom: spacing[2],
                },
              ]}
            >
              Email Address
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[
                styles.input,
                {
                  backgroundColor: isEditing ? colors.background : colors.muted,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: borderRadius.md,
                  paddingHorizontal: spacing[4],
                  paddingVertical: spacing[3],
                  fontSize: typography.fontSize.base,
                  color: colors.foreground,
                },
              ]}
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <View style={[styles.buttonRow, { marginTop: spacing[2] }]}>
              <Pressable
                onPress={() => {
                  setIsEditing(false);
                  setName(user?.name || '');
                  setEmail(user?.email || '');
                }}
                style={[
                  styles.button,
                  styles.cancelButton,
                  {
                    flex: 1,
                    backgroundColor: colors.muted,
                    borderRadius: borderRadius.md,
                    paddingVertical: spacing[3],
                    marginRight: spacing[2],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.foreground,
                      textAlign: 'center',
                    },
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={handleSaveProfile}
                style={[
                  styles.button,
                  styles.saveButton,
                  {
                    flex: 1,
                    backgroundColor: colors.primary,
                    borderRadius: borderRadius.md,
                    paddingVertical: spacing[3],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.semibold,
                      color: '#FFFFFF',
                      textAlign: 'center',
                    },
                  ]}
                >
                  Save Changes
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Security Section */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              borderRadius: borderRadius.xl,
              padding: spacing[4],
              marginBottom: spacing[4],
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.foreground,
                marginBottom: spacing[4],
              },
            ]}
          >
            Security
          </Text>

          {!showPasswordModal ? (
            <Pressable
              onPress={() => setShowPasswordModal(true)}
              style={[
                styles.menuItem,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: spacing[3],
                },
              ]}
            >
              <View style={styles.menuItemLeft}>
                <Feather name="lock" size={20} color={colors.foreground} />
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
                  Change Password
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.mutedForeground} />
            </Pressable>
          ) : (
            <View style={styles.passwordForm}>
              {/* Current Password */}
              <View style={[styles.inputGroup, { marginBottom: spacing[4] }]}>
                <Text
                  style={[
                    styles.label,
                    {
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.foreground,
                      marginBottom: spacing[2],
                    },
                  ]}
                >
                  Current Password
                </Text>
                <TextInput
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      borderWidth: 1,
                      borderRadius: borderRadius.md,
                      paddingHorizontal: spacing[4],
                      paddingVertical: spacing[3],
                      fontSize: typography.fontSize.base,
                      color: colors.foreground,
                    },
                  ]}
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>

              {/* New Password */}
              <View style={[styles.inputGroup, { marginBottom: spacing[4] }]}>
                <Text
                  style={[
                    styles.label,
                    {
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.foreground,
                      marginBottom: spacing[2],
                    },
                  ]}
                >
                  New Password
                </Text>
                <TextInput
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      borderWidth: 1,
                      borderRadius: borderRadius.md,
                      paddingHorizontal: spacing[4],
                      paddingVertical: spacing[3],
                      fontSize: typography.fontSize.base,
                      color: colors.foreground,
                    },
                  ]}
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>

              {/* Confirm Password */}
              <View style={[styles.inputGroup, { marginBottom: spacing[4] }]}>
                <Text
                  style={[
                    styles.label,
                    {
                      fontSize: typography.fontSize.sm,
                      fontWeight: typography.fontWeight.semibold,
                      color: colors.foreground,
                      marginBottom: spacing[2],
                    },
                  ]}
                >
                  Confirm New Password
                </Text>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      borderWidth: 1,
                      borderRadius: borderRadius.md,
                      paddingHorizontal: spacing[4],
                      paddingVertical: spacing[3],
                      fontSize: typography.fontSize.base,
                      color: colors.foreground,
                    },
                  ]}
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>

              {/* Password Buttons */}
              <View style={[styles.buttonRow, { marginTop: spacing[2] }]}>
                <Pressable
                  onPress={() => {
                    setShowPasswordModal(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  style={[
                    styles.button,
                    {
                      flex: 1,
                      backgroundColor: colors.muted,
                      borderRadius: borderRadius.md,
                      paddingVertical: spacing[3],
                      marginRight: spacing[2],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.foreground,
                        textAlign: 'center',
                      },
                    ]}
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleChangePassword}
                  style={[
                    styles.button,
                    {
                      flex: 1,
                      backgroundColor: colors.primary,
                      borderRadius: borderRadius.md,
                      paddingVertical: spacing[3],
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        fontSize: typography.fontSize.base,
                        fontWeight: typography.fontWeight.semibold,
                        color: '#FFFFFF',
                        textAlign: 'center',
                      },
                    ]}
                  >
                    Update Password
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {/* Danger Zone */}
        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.card,
              borderColor: colors.destructive,
              borderWidth: 1,
              borderRadius: borderRadius.xl,
              padding: spacing[4],
              marginBottom: spacing[4],
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                color: colors.destructive,
                marginBottom: spacing[2],
              },
            ]}
          >
            Danger Zone
          </Text>
          <Text
            style={[
              styles.dangerDescription,
              {
                fontSize: typography.fontSize.sm,
                color: colors.mutedForeground,
                marginBottom: spacing[4],
              },
            ]}
          >
            Once you delete your account, there is no going back. Please be certain.
          </Text>
          <Pressable
            onPress={handleDeleteAccount}
            style={[
              styles.deleteButton,
              {
                backgroundColor: colors.destructive,
                borderRadius: borderRadius.md,
                paddingVertical: spacing[3],
              },
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  fontSize: typography.fontSize.base,
                  fontWeight: typography.fontWeight.semibold,
                  color: '#FFFFFF',
                  textAlign: 'center',
                },
              ]}
            >
              Delete Account
            </Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View
          style={{
            paddingVertical: spacing[8],
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: typography.fontSize.xs,
              color: colors.mutedForeground,
              textAlign: 'center',
            }}
          >
            GoMate © 2025
          </Text>
          <Text
            style={{
              fontSize: typography.fontSize.xs,
              color: colors.mutedForeground,
              textAlign: 'center',
              marginTop: spacing[1],
            }}
          >
            All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  section: {},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {},
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {},
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {},
  photoHint: {},
  inputGroup: {},
  label: {},
  input: {},
  buttonRow: {
    flexDirection: 'row',
  },
  button: {},
  cancelButton: {},
  saveButton: {},
  buttonText: {},
  menuItem: {},
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {},
  passwordForm: {},
  dangerDescription: {},
  deleteButton: {},
});

export default AccountSettingsScreen;
