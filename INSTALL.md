# 🚀 Quick Start - GoMate Installation

## Prerequisites Installation (If Not Already Installed)

### 1. Install Node.js
Download and install from: https://nodejs.org/
- Choose LTS version (v18 or v20)
- Verify installation:
```powershell
node --version
npm --version
```

### 2. Install Expo Go App
- **iOS**: Download from App Store
- **Android**: Download from Google Play Store

---

## Project Installation Steps

### Step 1: Open PowerShell in Project Directory
```powershell
cd d:\GoMate
```

### Step 2: Install All Dependencies
```powershell
npm install
```

**Wait for installation to complete** (may take 3-5 minutes for first time)

If you see any errors, try:
```powershell
npm install --legacy-peer-deps
```

### Step 3: Start the Development Server
```powershell
npm start
```

Or alternatively:
```powershell
npx expo start
```

**You should see:**
- QR code in terminal
- Metro bundler starting
- Local URL (e.g., exp://192.168.x.x:8081)

---

## Running the App

### Option A: On Your Physical Phone (Recommended)

#### For Android:
1. Open **Expo Go** app
2. Tap **Scan QR code**
3. Point camera at the QR code in terminal
4. Wait for app to load (first time may take 1-2 minutes)

#### For iOS:
1. Open **Camera** app
2. Point at the QR code
3. Tap the notification banner
4. App opens in Expo Go

### Option B: On Emulator/Simulator

#### Android Emulator:
1. Make sure Android Studio and emulator are installed
2. Start your Android emulator
3. In the terminal, press `a`

#### iOS Simulator (Mac only):
1. Make sure Xcode is installed
2. In the terminal, press `i`

### Option C: Web Browser
1. In the terminal, press `w`
2. App opens in your default browser

---

## First Time Using the App

### Test Login:
- **Email**: test@gomate.com (or any email format)
- **Password**: password123 (or any 6+ characters)

### Or Register New Account:
- Click "Sign Up" on login screen
- Fill in your details
- Password must be 6+ characters
- Confirm password must match

---

## Troubleshooting

### Issue: npm not recognized
**Solution**: Restart PowerShell after installing Node.js

### Issue: "Cannot find module"
**Solution**: 
```powershell
npm install
```

### Issue: Metro bundler errors
**Solution**: Clear cache and restart
```powershell
npx expo start -c
```

### Issue: QR code not working
**Solution**: 
1. Make sure phone and computer are on same WiFi
2. Try typing the URL manually in Expo Go
3. Or use tunnel mode: `npx expo start --tunnel`

### Issue: App loading slowly
**Solution**: First load takes time, subsequent loads are faster

### Issue: White screen or crash
**Solution**: 
1. Shake phone to open developer menu
2. Tap "Reload"
3. Or restart the development server

---

## Development Commands

```powershell
# Start development server
npm start

# Start with clear cache
npx expo start -c

# Start in tunnel mode (for network issues)
npx expo start --tunnel

# Install new package
npm install <package-name>

# Check for errors
npm run check
```

---

## Testing Checklist

Once app is running, test these features:

- [ ] Login screen loads
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Home screen shows 8 destinations
- [ ] Can search destinations
- [ ] Can filter by category
- [ ] Can view destination details
- [ ] Transport options display correctly
- [ ] Can add to favorites
- [ ] Favorites screen shows saved items
- [ ] Can toggle dark mode in Profile
- [ ] Dark mode persists after app restart
- [ ] Can logout

---

## Creating Demo Video & Screenshots

### Screenshots (Use Phone/Emulator Screenshot):
1. Login Screen (Light Mode)
2. Login Screen (Dark Mode)
3. Home Screen - Destinations List
4. Home Screen - Search Feature
5. Destination Details Screen
6. Transport Options Section
7. Favorites Screen
8. Profile Screen with Dark Mode Toggle

### Demo Video (2 minutes):
**Recording Options:**
- Phone: Use built-in screen recorder
- Windows: Win + G (Xbox Game Bar)
- Mac: QuickTime Player
- Android Emulator: Built-in recorder

**Video Structure:**
1. Start at login screen
2. Login or register
3. Browse destinations
4. Search for a place
5. Open destination details
6. Scroll through transport options
7. Add to favorites
8. Go to Favorites tab
9. Go to Profile tab
10. Toggle dark mode
11. Navigate back to Home (in dark mode)
12. Logout

---

## Submission Package

Create a ZIP file with:

### 1. GitHub Repository
- Create GitHub account if needed
- Create new repository: "GoMate"
- Push your code:
```powershell
git init
git add .
git commit -m "Complete GoMate application"
git branch -M main
git remote add origin <your-github-url>
git push -u origin main
```

### 2. Screenshots Folder
- Create folder named "Screenshots"
- Add 8+ screenshots showing all features
- Name them clearly (e.g., "01-Login-Light.png")

### 3. Demo Video
- Name: "GoMate_Demo.mp4" (or .mov)
- Length: Maximum 2 minutes
- Show all main features

### 4. Documentation
- Include README.md
- Include SETUP_GUIDE.md
- Include IMPLEMENTATION_SUMMARY.md

---

## Support & Help

### If something doesn't work:

1. **Check Node.js version**: Should be v16+
2. **Reinstall dependencies**:
   ```powershell
   rm -rf node_modules
   npm install
   ```
3. **Clear Expo cache**:
   ```powershell
   npx expo start -c
   ```
4. **Check network**: Phone and PC on same WiFi
5. **Restart everything**: Server, phone, terminal

### Common Commands Reference:

```powershell
# Check versions
node --version
npm --version

# Install dependencies
npm install

# Start server
npm start

# Clear cache
npx expo start -c

# Tunnel mode (for network issues)
npx expo start --tunnel

# View in browser
npm run web
```

---

## Success Criteria

You'll know everything is working when:
- ✅ No errors in terminal
- ✅ QR code appears
- ✅ App loads on phone/emulator
- ✅ Can login successfully
- ✅ All 8 destinations visible
- ✅ Search works
- ✅ Can view details
- ✅ Favorites work
- ✅ Dark mode toggles
- ✅ Theme persists after reload

---

## Final Tips

1. **Test on real device** - Better performance than emulator
2. **Test both themes** - Light and Dark mode
3. **Test persistence** - Close and reopen app
4. **Take clear screenshots** - Good lighting, clean UI
5. **Record smooth video** - No shaky camera, show features clearly
6. **Check audio** - Explain features if adding narration

---

## You're All Set! 🎉

Your GoMate application is:
- ✅ Fully functional
- ✅ Professionally designed
- ✅ Meets all requirements
- ✅ Includes bonus features
- ✅ Ready for submission

**Good luck with your assignment!**

---

**Need help?** Review the detailed documentation in:
- `README.md` - Full project documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `IMPLEMENTATION_SUMMARY.md` - Feature breakdown

