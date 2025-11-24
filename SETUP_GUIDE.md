# GoMate Setup Guide

## Quick Start Guide for IN3210 Assignment

### Step 1: Prerequisites Check
Before starting, ensure you have:
- ✅ Node.js installed (v16+): `node --version`
- ✅ npm or yarn: `npm --version`
- ✅ Expo Go app on your phone (iOS/Android)

### Step 2: Install Dependencies
Open PowerShell/Terminal in the project folder:

```powershell
cd d:\GoMate
npm install
```

This will install all required packages (React Native, Redux, Navigation, etc.)

### Step 3: Start Development Server
```powershell
npm start
# or
npx expo start
```

You should see a QR code in the terminal.

### Step 4: Run on Your Device

#### Option A: Physical Device (Recommended)
1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app
3. Wait for the app to load

#### Option B: Emulator/Simulator
Press in terminal:
- `a` for Android emulator
- `i` for iOS simulator (Mac only)
- `w` for web browser

### Step 5: Test the App

#### Login Credentials (Mock Authentication)
- **Email**: any valid email (e.g., `test@gomate.com`)
- **Password**: minimum 6 characters (e.g., `password123`)

#### Test Features:
1. ✅ Register a new account
2. ✅ Browse Sri Lankan destinations
3. ✅ Search for "Ella" or "Beach"
4. ✅ Filter by category (Historical, Nature, etc.)
5. ✅ Tap a destination to view details
6. ✅ View transport options (Bus, Train, Tuk-Tuk)
7. ✅ Add to favorites (heart icon)
8. ✅ Check Favorites tab
9. ✅ Toggle Dark Mode in Profile
10. ✅ Logout

## Common Issues & Solutions

### Issue: "Command not found: expo"
**Solution**: Install Expo CLI globally
```powershell
npm install -g expo-cli
```

### Issue: Dependencies not installing
**Solution**: Clear cache and reinstall
```powershell
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Metro bundler errors
**Solution**: Clear Metro cache
```powershell
npx expo start -c
```

### Issue: "Unable to resolve module"
**Solution**: Restart the development server
```powershell
# Stop the server (Ctrl+C)
# Then start again
npm start
```

## Creating Demo Video

### Recommended Screen Recording Tools:
- **Windows**: Xbox Game Bar (Win + G)
- **Mac**: QuickTime Player
- **Phone**: Built-in screen recorder

### Video Outline (2 minutes):
1. **0:00-0:15** - Login/Registration flow
2. **0:15-0:35** - Browse destinations on Home screen
3. **0:35-0:50** - Search and filter functionality
4. **0:50-1:20** - View destination details + transport options
5. **1:20-1:35** - Add/remove favorites
6. **1:35-1:45** - Toggle dark mode
7. **1:45-2:00** - Profile screen and logout

## Taking Screenshots

### Screens to Capture:
1. Login Screen (Light mode)
2. Login Screen (Dark mode)
3. Home Screen with destinations
4. Destination Details Screen
5. Transport Options section
6. Favorites Screen
7. Profile Screen with Dark Mode toggle
8. Search/Filter in action

### Pro Tips:
- Use clean test data
- Show both light and dark modes
- Capture different features
- Use phone's screenshot tool or emulator

## Project Structure Overview

```
src/
├── screens/        # All screen components
├── navigation/     # Navigation setup
├── redux/          # State management
├── context/        # Theme context
├── data/           # Mock data (tourist places)
├── services/       # API services
├── theme/          # Color themes
├── types/          # TypeScript types
└── utils/          # Helper functions
```

## Assignment Submission Checklist

- [ ] Project runs without errors
- [ ] All features working (auth, navigation, favorites, dark mode)
- [ ] Screenshots taken (8+ images)
- [ ] Demo video recorded (≤2 minutes)
- [ ] README.md updated with your info
- [ ] Code committed to GitHub
- [ ] ZIP file created with:
  - [ ] GitHub repository URL
  - [ ] Screenshots folder
  - [ ] Demo video file
  - [ ] README.md

## Evaluation Points

| Feature | Status | Points |
|---------|--------|--------|
| Authentication with validation | ✅ | 15 |
| Navigation (Stack + Tabs) | ✅ | 10 |
| API Integration | ✅ | 15 |
| State Management (Redux) | ✅ | 15 |
| UI/UX Design | ✅ | 15 |
| Code Quality | ✅ | 20 |
| Demo Video | 📹 To Do | 5 |
| **Bonus: Dark Mode** | ✅ | +5 |
| **Total** | | **100** |

## Key Features Implemented

### ✅ Authentication
- Login & Registration forms
- Yup validation
- Secure AsyncStorage
- Persistent sessions

### ✅ Navigation
- Stack Navigator for screens
- Bottom Tab Navigator
- Smooth transitions

### ✅ Home Screen
- 8 Sri Lankan destinations
- Search functionality
- Category filters
- Pull-to-refresh
- Beautiful cards with images

### ✅ Details Screen
- Full destination info
- Transport options (Bus, Train, Tuk-Tuk, Taxi)
- Entry fees & best times
- Highlights section

### ✅ State Management
- Redux Toolkit
- Auth slice
- Favorites slice
- Persistent storage

### ✅ Favorites
- Add/remove favorites
- Dedicated favorites screen
- AsyncStorage persistence

### ✅ UI/UX
- Feather Icons
- Professional animations (Moti)
- Responsive design
- Light & Dark themes
- Linear gradients

### ✅ BONUS: Dark Mode
- Complete theme system
- Toggle in Profile
- Persistent preference
- Beautiful color schemes

## Tips for Success

1. **Test Thoroughly**: Test all features before recording demo
2. **Clean UI**: Make sure UI looks professional in screenshots
3. **Quality Video**: Record in good lighting with stable phone
4. **Code Comments**: Add comments to explain complex logic
5. **Git Commits**: Make feature-based commits with clear messages

## Need Help?

### Common Questions:

**Q: How do I login?**
A: Use any email (e.g., test@gomate.com) and password with 6+ characters

**Q: Where is the data stored?**
A: Mock data in `src/data/places.ts` and user data in AsyncStorage

**Q: How to toggle dark mode?**
A: Go to Profile tab → Toggle Dark Mode switch

**Q: Can I add more destinations?**
A: Yes! Edit `src/data/places.ts` and add new Place objects

**Q: How to customize colors?**
A: Edit `src/theme/themes.ts` for light and dark themes

## Final Checklist Before Submission

- [ ] Run `npm install` successfully
- [ ] Start app with `npm start`
- [ ] Test login with valid credentials
- [ ] Browse all 8 destinations
- [ ] Test search and filters
- [ ] View destination details
- [ ] Check transport options display
- [ ] Add/remove favorites
- [ ] Toggle dark mode
- [ ] Test logout
- [ ] Take screenshots
- [ ] Record demo video
- [ ] Commit code to GitHub
- [ ] Create submission ZIP

## Good Luck! 🚀

You now have a fully functional, professional mobile app with:
- ✅ All required features
- ✅ Bonus dark mode
- ✅ Beautiful UI/UX
- ✅ Professional animations
- ✅ Clean code structure
- ✅ Best practices

Focus on creating a great demo video and taking quality screenshots to showcase your work!

---

**Questions?** Review the main README.md for detailed documentation.
