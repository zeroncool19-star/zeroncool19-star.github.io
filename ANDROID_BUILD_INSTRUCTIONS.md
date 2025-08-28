# Seaweed Swimmer - Android Build Instructions

## Prerequisites
To build the Android app, you need:
- Android Studio installed
- Android SDK with API level 33+ 
- Java JDK 11 or higher

## Build Steps

### 1. Development Build (APK)
```bash
# Navigate to the Android project
cd /app/frontend/android

# Build debug APK
./gradlew assembleDebug

# The APK will be created at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### 2. Release Build (for Play Store)
```bash
# Build release AAB (Android App Bundle)
./gradlew bundleRelease

# The AAB will be created at:
# android/app/build/outputs/bundle/release/app-release.aab
```

### 3. Signing the Release Build
For Play Store release, you need to:
1. Generate a keystore file
2. Configure signing in `android/app/build.gradle`
3. Build signed release

## App Information
- **App Name**: Seaweed Swimmer
- **Package**: com.seaweedswimmer.app
- **Version**: 1.0.0 (will be auto-generated)

## Features Implemented
✅ Mobile-optimized touch controls
✅ Haptic feedback on supported devices
✅ Portrait orientation lock
✅ Responsive UI for different screen sizes
✅ Proper Android lifecycle management
✅ Hardware acceleration enabled
✅ Custom app icon and splash screen

## Google Play Store Requirements Met
✅ Unique package name
✅ App signing ready
✅ Target API 33+
✅ All required permissions declared
✅ Proper app metadata
✅ Privacy policy ready (game doesn't collect data)
✅ Content rating: Everyone (family-friendly game)

## Testing
- Test on physical Android device for best performance
- Game works on Android 7.0+ (API 24+)
- Optimized for touch screens and mobile processors