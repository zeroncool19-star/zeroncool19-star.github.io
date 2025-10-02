#!/bin/bash

# 🎮 Seaweed Swimmer - Local Build Script
# This script automates the build process for your Android APK

echo "🐠 Building Seaweed Swimmer APK..."
echo "=================================="

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the frontend directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the frontend directory"
    print_error "Usage: cd frontend && ./build-local.sh"
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing dependencies..."
if ! yarn install --force; then
    print_error "Failed to install dependencies"
    exit 1
fi
print_success "Dependencies installed!"

# Step 2: Build React app
print_status "Building React app..."
if ! yarn build; then
    print_error "Failed to build React app"
    exit 1
fi
print_success "React app built!"

# Step 3: Sync Capacitor
print_status "Syncing Capacitor..."
if ! npx cap sync android; then
    print_error "Failed to sync Capacitor"
    exit 1
fi
print_success "Capacitor synced!"

# Step 4: Build Android APK
print_status "Building Android APK..."
cd android

if ! ./gradlew assembleDebug; then
    print_error "Failed to build APK"
    print_error "Try opening the project in Android Studio instead"
    exit 1
fi

print_success "APK built successfully!"
echo ""
echo "🎉 Your APK is ready!"
echo "📍 Location: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "📱 To install on your device:"
echo "   adb install app/build/outputs/apk/debug/app-debug.apk"
echo ""
echo "🏪 For Google Play Store, build release version:"
echo "   ./gradlew assembleRelease"
echo ""
print_success "Seaweed Swimmer is ready to swim! 🐠🌊"