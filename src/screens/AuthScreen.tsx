import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch } from '../redux/hooks';
import { loginSuccess } from '../redux/slices/authSlice';
import { mockAuthAPI } from '../services/api';
import { storageService } from '../utils/storage';
import { loginSchema, registerSchema } from '../utils/validation';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register fields
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setErrors({});
      await loginSchema.validate({ email, password }, { abortEarly: false });
      
      setLoading(true);
      const user = await mockAuthAPI.login(email, password);
      await storageService.saveUser(user);
      dispatch(loginSuccess(user));
    } catch (error: any) {
      setLoading(false);
      if (error.name === 'ValidationError') {
        const validationErrors: any = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        Alert.alert('Error', error.message || 'Login failed');
      }
    }
  };

  const handleRegister = async () => {
    try {
      setErrors({});
      await registerSchema.validate(
        { name: registerName, email: registerEmail, password: registerPassword, confirmPassword },
        { abortEarly: false }
      );
      
      setLoading(true);
      const user = await mockAuthAPI.register(registerName, registerEmail, registerPassword);
      await storageService.saveUser(user);
      dispatch(loginSuccess(user));
    } catch (error: any) {
      setLoading(false);
      if (error.name === 'ValidationError') {
        const validationErrors: any = {};
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        Alert.alert('Error', error.message || 'Registration failed');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.header}
        >
          <View style={styles.logo}>
            <Text style={styles.logoText}>GM</Text>
          </View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to GoMate</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Explore the beauty of Sri Lanka
          </Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
          style={[styles.formCard, { backgroundColor: theme.colors.card }]}
        >
          <Text style={[styles.formTitle, { color: theme.colors.text }]}>Get Started</Text>
          <Text style={[styles.formSubtitle, { color: theme.colors.textSecondary }]}>
            Login or create a new account
          </Text>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'login' && { backgroundColor: theme.colors.background },
              ]}
              onPress={() => setActiveTab('login')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'login'
                    ? { color: theme.colors.text, fontWeight: '600' }
                    : { color: theme.colors.textSecondary },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'register' && { backgroundColor: theme.colors.background },
              ]}
              onPress={() => setActiveTab('register')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'register'
                    ? { color: theme.colors.text, fontWeight: '600' }
                    : { color: theme.colors.textSecondary },
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'login' ? (
            <MotiView
              key="login"
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 300 }}
            >
              <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="your@email.com"
                placeholderTextColor={theme.colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Login'}</Text>
              </TouchableOpacity>
            </MotiView>
          ) : (
            <MotiView
              key="register"
              from={{ opacity: 0, translateX: 20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 300 }}
            >
              <Text style={[styles.label, { color: theme.colors.text }]}>Full Name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="John Doe"
                placeholderTextColor={theme.colors.textSecondary}
                value={registerName}
                onChangeText={setRegisterName}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="your@email.com"
                placeholderTextColor={theme.colors.textSecondary}
                value={registerEmail}
                onChangeText={setRegisterEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.textSecondary}
                value={registerPassword}
                onChangeText={setRegisterPassword}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={handleRegister}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </MotiView>
          )}
        </MotiView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#20B2AA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
