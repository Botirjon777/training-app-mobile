# 🏋️ Training App - Build Instructions

## Quick Start (Testing)

To test the app immediately without building an APK:

```bash
cd training-app
npm start
```

Then scan the QR code with **Expo Go** app on your Android device.

---

## Building Android APK (No Android Studio Required)

### Step 1: Install EAS CLI

```bash
npm install -g eas-cli
```

### Step 2: Login to Expo

```bash
cd training-app
eas login
```

Create a free account at [expo.dev](https://expo.dev) if you don't have one.

### Step 3: Configure Project

```bash
eas build:configure
```

### Step 4: Build APK

```bash
eas build --platform android --profile preview
```

This will:

- Build your app in the cloud (no local Android SDK needed)
- Take approximately 10-15 minutes
- Provide a download link when complete

### Step 5: Install APK

1. Download the APK from the link provided
2. Transfer to your Android device
3. Enable "Install from Unknown Sources" in Android settings
4. Tap the APK file to install

---

## Project Location

```
C:\Users\User\.gemini\antigravity\scratch\training-app
```

**Recommendation:** Set this as your active workspace for easier development.

---

## What's Included

✅ 21 exercises across 7 days  
✅ Professional demonstration images  
✅ Beautiful gradient UI design  
✅ Complete navigation system  
✅ Dark theme optimized for fitness  
✅ Ready for APK build

Enjoy your training app! 💪

npx eas-cli build --platform android --profile preview

$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path += ";$env:JAVA_HOME\bin"
