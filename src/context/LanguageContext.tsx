import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'English' | 'Sinhala';

interface Translations {
  // Common
  cancel: string;
  save: string;
  delete: string;
  search: string;
  filter: string;
  
  // Home Screen
  discoverSriLanka: string;
  exploreBeautiful: string;
  searchDestinations: string;
  allDestinations: string;
  cultural: string;
  nature: string;
  beach: string;
  historical: string;
  adventure: string;
  
  // Explore Screen
  exploreCategories: string;
  interactiveMap: string;
  discoverMore: string;
  destinations: string;
  
  // Favorites Screen
  myFavorites: string;
  noFavorites: string;
  startExploring: string;
  
  // Profile Screen
  account: string;
  accountSettings: string;
  favorites: string;
  preferences: string;
  darkMode: string;
  notifications: string;
  language: string;
  support: string;
  helpSupport: string;
  about: string;
  termsPrivacy: string;
  logout: string;
  enabled: string;
  disabled: string;
  getHelp: string;
  version: string;
  readPolicies: string;
  logoutConfirm: string;
  selectLanguage: string;
  chooseLanguage: string;
  noNotifications: string;
  markAsRead: string;
  
  // Account Settings
  editProfile: string;
  fullName: string;
  email: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  changeProfilePicture: string;
  
  // Destination Details
  overview: string;
  attractions: string;
  transportation: string;
  reviews: string;
  addToFavorites: string;
  removeFromFavorites: string;
  duration: string;
  rating: string;
  
  // Navigation
  home: string;
  explore: string;
  profile: string;
}

const translations: Record<Language, Translations> = {
  English: {
    // Common
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    search: 'Search',
    filter: 'Filter',
    
    // Home Screen
    discoverSriLanka: 'Discover Sri Lanka',
    exploreBeautiful: 'Explore the beautiful destinations across the island',
    searchDestinations: 'Search destinations...',
    allDestinations: 'All Destinations',
    cultural: 'Cultural',
    nature: 'Nature',
    beach: 'Beach',
    historical: 'Historical',
    adventure: 'Adventure',
    
    // Explore Screen
    exploreCategories: 'Explore Categories',
    interactiveMap: 'Interactive Map',
    discoverMore: 'Discover More',
    destinations: 'Destinations',
    
    // Favorites Screen
    myFavorites: 'My Favorites',
    noFavorites: 'No favorites yet',
    startExploring: 'Start exploring and add your favorite destinations',
    
    // Profile Screen
    account: 'Account',
    accountSettings: 'Account Settings',
    favorites: 'Favorites',
    preferences: 'Preferences',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    language: 'Language',
    support: 'Support',
    helpSupport: 'Help & Support',
    about: 'About',
    termsPrivacy: 'Terms & Privacy',
    logout: 'Logout',
    enabled: 'Enabled',
    disabled: 'Disabled',
    getHelp: 'Get help with the app',
    version: 'Version 1.0.0',
    readPolicies: 'Read our policies',
    logoutConfirm: 'Are you sure you want to logout?',
    selectLanguage: 'Select Language',
    chooseLanguage: 'Choose your preferred language',
    noNotifications: 'No notifications',
    markAsRead: 'Mark as read',
    
    // Account Settings
    editProfile: 'Edit Profile',
    fullName: 'Full Name',
    email: 'Email',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    changeProfilePicture: 'Change Profile Picture',
    
    // Destination Details
    overview: 'Overview',
    attractions: 'Attractions',
    transportation: 'Transportation',
    reviews: 'Reviews',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    duration: 'Duration',
    rating: 'Rating',
    
    // Navigation
    home: 'Home',
    explore: 'Explore',
    profile: 'Profile',
  },
  Sinhala: {
    // Common
    cancel: 'අවලංගු කරන්න',
    save: 'සුරකින්න',
    delete: 'මකන්න',
    search: 'සොයන්න',
    filter: 'පෙරහන',
    
    // Home Screen
    discoverSriLanka: 'ශ්‍රී ලංකාව සොයා ගන්න',
    exploreBeautiful: 'දිවයින පුරා අලංකාර ගමනාන්ත ගවේෂණය කරන්න',
    searchDestinations: 'ගමනාන්ත සොයන්න...',
    allDestinations: 'සියලුම ගමනාන්ත',
    cultural: 'සංස්කෘතික',
    nature: 'ස්වභාවික',
    beach: 'වෙරළ',
    historical: 'ඓතිහාසික',
    adventure: 'ත්‍රාසජනක',
    
    // Explore Screen
    exploreCategories: 'වර්ග ගවේෂණය කරන්න',
    interactiveMap: 'අන්තර්ක්‍රියාකාරී සිතියම',
    discoverMore: 'තවත් සොයා ගන්න',
    destinations: 'ගමනාන්ත',
    
    // Favorites Screen
    myFavorites: 'මගේ ප්‍රියතම',
    noFavorites: 'තවමත් ප්‍රියතම නැත',
    startExploring: 'ගවේෂණය ආරම්භ කර ඔබේ ප්‍රියතම ගමනාන්ත එකතු කරන්න',
    
    // Profile Screen
    account: 'ගිණුම',
    accountSettings: 'ගිණුම් සැකසීම්',
    favorites: 'ප්‍රියතම',
    preferences: 'මනාපයන්',
    darkMode: 'අඳුරු ප්‍රකාරය',
    notifications: 'දැනුම්දීම්',
    language: 'භාෂාව',
    support: 'සහාය',
    helpSupport: 'උපකාර සහ සහාය',
    about: 'පිළිබඳව',
    termsPrivacy: 'කොන්දේසි සහ රහස්‍යතා',
    logout: 'ඉවත්වන්න',
    enabled: 'සක්‍රීයයි',
    disabled: 'අක්‍රීයයි',
    getHelp: 'යෙදුම සඳහා උපකාර ලබා ගන්න',
    version: 'අනුවාදය 1.0.0',
    readPolicies: 'අපගේ ප්‍රතිපත්ති කියවන්න',
    logoutConfirm: 'ඔබට ඉවත් වීමට අවශ්‍ය බව විශ්වාසද?',
    selectLanguage: 'භාෂාව තෝරන්න',
    chooseLanguage: 'ඔබගේ කැමති භාෂාව තෝරන්න',
    noNotifications: 'දැනුම්දීම් නැත',
    markAsRead: 'කියවූ ලෙස සලකුණු කරන්න',
    
    // Account Settings
    editProfile: 'පැතිකඩ සංස්කරණය කරන්න',
    fullName: 'සම්පූර්ණ නම',
    email: 'විද්‍යුත් තැපෑල',
    changePassword: 'මුරපදය වෙනස් කරන්න',
    currentPassword: 'වත්මන් මුරපදය',
    newPassword: 'නව මුරපදය',
    confirmPassword: 'මුරපදය තහවුරු කරන්න',
    changeProfilePicture: 'පැතිකඩ පින්තූරය වෙනස් කරන්න',
    
    // Destination Details
    overview: 'දළ විශ්ලේෂණය',
    attractions: 'ආකර්ෂණීය ස්ථාන',
    transportation: 'ප්‍රවාහනය',
    reviews: 'සමාලෝචන',
    addToFavorites: 'ප්‍රියතමයන්ට එක් කරන්න',
    removeFromFavorites: 'ප්‍රියතමයන්ගෙන් ඉවත් කරන්න',
    duration: 'කාලසීමාව',
    rating: 'ශ්‍රේණිගත කිරීම',
    
    // Navigation
    home: 'මුල් පිටුව',
    explore: 'ගවේෂණය',
    profile: 'පැතිකඩ',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = '@gomate_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('English');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored && (stored === 'English' || stored === 'Sinhala')) {
        setLanguageState(stored as Language);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
