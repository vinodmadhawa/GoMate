import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { useAuth } from '../context/AuthContext';

const AuthScreen = () => {
  const { colors, typography, spacing, borderRadius, gradients, theme } = useTheme();
  const { login, register } = useAuth();
  const navigation = useNavigation();
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        navigation.navigate('Main' as never);
      }
    } else {
      const success = await register(name, email, password);
      if (success) {
        navigation.navigate('Main' as never);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={theme === 'light' ? 'dark-content' : 'light-content'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={[styles.scrollContent, { padding: spacing[6] }]}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <LinearGradient
              colors={gradients.primary.colors}
              start={gradients.primary.start}
              end={gradients.primary.end}
              style={[styles.logo, { borderRadius: spacing[5] }]}
            >
              <Text style={[styles.logoText, { fontSize: typography.fontSize['3xl'] }]}>
                GM
              </Text>
            </LinearGradient>
            
            <Text
              style={[
                styles.appTitle,
                {
                  fontSize: typography.fontSize['3xl'],
                  fontWeight: typography.fontWeight.bold,
                  color: colors.foreground,
                  marginTop: spacing[4],
                },
              ]}
            >
              GoMate
            </Text>
            
            <Text
              style={[
                styles.appSubtitle,
                {
                  fontSize: typography.fontSize.base,
                  color: colors.mutedForeground,
                  marginTop: spacing[1],
                },
              ]}
            >
              Explore Sri Lanka
            </Text>
          </View>

          {/* Tab Switcher */}
          <View style={[styles.tabSwitcher, { marginVertical: spacing[8] }]}>
            <Pressable onPress={() => setIsLogin(true)} style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: isLogin ? colors.primary : colors.mutedForeground,
                    paddingHorizontal: spacing[6],
                    paddingVertical: spacing[3],
                    borderBottomWidth: 2,
                    borderBottomColor: isLogin ? colors.primary : 'transparent',
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
            <Pressable onPress={() => setIsLogin(false)} style={styles.tab}>
              <Text
                style={[
                  styles.tabText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.semibold,
                    color: !isLogin ? colors.primary : colors.mutedForeground,
                    paddingHorizontal: spacing[6],
                    paddingVertical: spacing[3],
                    borderBottomWidth: 2,
                    borderBottomColor: !isLogin ? colors.primary : 'transparent',
                  },
                ]}
              >
                Register
              </Text>
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {!isLogin && (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: colors.input,
                    backgroundColor: colors.background,
                    color: colors.foreground,
                    fontSize: typography.fontSize.base,
                    borderRadius: borderRadius.md,
                    paddingHorizontal: spacing[3],
                    height: 48,
                    marginBottom: spacing[4],
                  },
                ]}
                placeholder="Name"
                placeholderTextColor={colors.mutedForeground}
                value={name}
                onChangeText={setName}
              />
            )}
            
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.input,
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  fontSize: typography.fontSize.base,
                  borderRadius: borderRadius.md,
                  paddingHorizontal: spacing[3],
                  height: 48,
                  marginBottom: spacing[4],
                },
              ]}
              placeholder="Email"
              placeholderTextColor={colors.mutedForeground}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.input,
                  backgroundColor: colors.background,
                  color: colors.foreground,
                  fontSize: typography.fontSize.base,
                  borderRadius: borderRadius.md,
                  paddingHorizontal: spacing[3],
                  height: 48,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={colors.mutedForeground}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <Pressable
              style={[
                styles.submitButton,
                {
                  backgroundColor: colors.primary,
                  borderRadius: borderRadius.md,
                  height: 48,
                  marginTop: spacing[6],
                },
              ]}
              onPress={handleSubmit}
            >
              <Text
                style={[
                  styles.submitText,
                  {
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.bold,
                    color: '#FFFFFF',
                  },
                ]}
              >
                {isLogin ? 'Login' : 'Register'}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  appTitle: {
    textAlign: 'center',
  },
  appSubtitle: {
    textAlign: 'center',
  },
  tabSwitcher: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  tab: {},
  tabText: {},
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {},
});

export default AuthScreen;
