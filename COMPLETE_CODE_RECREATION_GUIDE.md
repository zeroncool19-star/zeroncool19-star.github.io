# 🎮 Seaweed Swimmer - Complete Code Recreation Guide

## 🚀 **RECREATE YOUR EXACT GAME ON YOUR COMPUTER**

Follow these steps to build your complete Seaweed Swimmer game with AdMob monetization on your local machine.

---

## **STEP 1: Initial Setup (5 minutes)**

### **Create Project Structure:**
```bash
# Create main project
npx create-react-app seaweed-swimmer
cd seaweed-swimmer

# Install required dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android
npm install @capacitor-community/admob @capacitor/haptics @capacitor/status-bar @capacitor/splash-screen
npm install react-router-dom axios
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge
npm install tailwindcss postcss autoprefixer
npm install @craco/craco

# Install Tailwind and UI components
npx tailwindcss init -p
```

### **Setup Capacitor:**
```bash
npx cap init "Seaweed Swimmer" "com.seaweedswimmer.app"
npx cap add android
```

---

## **STEP 2: Configuration Files**

### **package.json** - Update scripts section:
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

### **craco.config.js** - Create this file:
```javascript
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
```

### **tailwind.config.js** - Replace content:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... (rest of color config)
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
```

### **capacitor.config.json** - Replace content:
```json
{
  "appId": "com.seaweedswimmer.app",
  "appName": "Seaweed Swimmer",
  "webDir": "build",
  "server": {
    "androidScheme": "https"
  },
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 2000,
      "launchAutoHide": true,
      "showSpinner": false
    },
    "StatusBar": {
      "style": "dark"
    },
    "AdMob": {
      "appId": "ca-app-pub-9069068945892968~9222701474",
      "initializeForTesting": false
    }
  }
}
```

---

## **STEP 3: Create UI Components**

### **src/components/ui/button.jsx:**
```javascript
import React from "react"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
        },
        {
          "h-10 px-4 py-2": size === "default",
          "h-9 rounded-md px-3": size === "sm",
          "h-11 rounded-md px-8": size === "lg",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }
```

### **src/components/ui/card.jsx:**
```javascript
import React from "react"
import { cn } from "../../lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}
    {...props}
  />
))
Card.displayName = "Card"

export { Card }
```

### **src/lib/utils.js:**
```javascript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

---

## **STEP 4: AdMob Service**

### **src/services/AdService.js:**
```javascript
import { AdMob, BannerAdSize, BannerAdPosition, AdmobConsentStatus, AdmobConsentDebugGeography } from '@capacitor-community/admob';

class AdService {
  constructor() {
    this.isAdMobInitialized = false;
    this.isTestMode = false; // REAL ADS ENABLED
    
    // Your real AdMob IDs
    this.testBannerAdId = 'ca-app-pub-3940256099942544/6300978111';
    this.testInterstitialAdId = 'ca-app-pub-3940256099942544/1033173712';
    this.prodBannerAdId = 'ca-app-pub-9069068945892968/1870840975';
    this.prodInterstitialAdId = 'ca-app-pub-9069068945892968/3810592690';

    this.bannerAdId = this.isTestMode ? this.testBannerAdId : this.prodBannerAdId;
    this.interstitialAdId = this.isTestMode ? this.testInterstitialAdId : this.prodInterstitialAdId;
  }

  async initialize() {
    try {
      console.log('🎯 Initializing AdMob...');
      
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: this.isTestMode ? ['YOUR_DEVICE_ID'] : [],
        initializeForTesting: this.isTestMode,
      });

      await this.handleConsent();
      
      this.isAdMobInitialized = true;
      console.log('✅ AdMob initialized successfully');
      
    } catch (error) {
      console.error('❌ AdMob initialization failed:', error);
    }
  }

  async handleConsent() {
    try {
      const consentInfo = await AdMob.requestConsentInfo({
        debugGeography: this.isTestMode ? AdmobConsentDebugGeography.EEA : AdmobConsentDebugGeography.DISABLED,
        testDeviceIdentifiers: this.isTestMode ? ['YOUR_DEVICE_ID'] : [],
      });

      if (consentInfo.status === AdmobConsentStatus.REQUIRED) {
        await AdMob.showConsentForm();
      }
    } catch (error) {
      console.error('❌ Consent handling failed:', error);
    }
  }

  async showBannerAd(position = BannerAdPosition.BOTTOM_CENTER) {
    if (!this.isAdMobInitialized) {
      await this.initialize();
    }

    try {
      const options = {
        adId: this.bannerAdId,
        adSize: BannerAdSize.BANNER,
        position: position,
        margin: 0,
        isTesting: this.isTestMode,
      };

      await AdMob.showBanner(options);
      console.log('✅ Banner ad displayed');
      
    } catch (error) {
      console.error('❌ Failed to show banner ad:', error);
    }
  }

  async hideBannerAd() {
    try {
      await AdMob.hideBanner();
      console.log('✅ Banner ad hidden');
    } catch (error) {
      console.error('❌ Failed to hide banner ad:', error);
    }
  }

  async showInterstitialAd() {
    if (!this.isAdMobInitialized) {
      await this.initialize();
    }

    try {
      await AdMob.prepareInterstitial({
        adId: this.interstitialAdId,
        isTesting: this.isTestMode,
      });

      await AdMob.showInterstitial();
      console.log('✅ Interstitial ad displayed');
      
    } catch (error) {
      console.error('❌ Failed to show interstitial ad:', error);
    }
  }

  async removeBannerAd() {
    try {
      await AdMob.removeBanner();
      console.log('✅ Banner ad removed');
    } catch (error) {
      console.error('❌ Failed to remove banner ad:', error);
    }
  }

  // Revenue optimization: Show ads at strategic moments
  async showGameOverAd() {
    // Show interstitial ad immediately when player dies (every time)
    await this.showInterstitialAd();
  }

  async showGameplayBannerAd() {
    // Show banner ad during gameplay only
    await this.showBannerAd(BannerAdPosition.BOTTOM_CENTER);
  }

  async hideAllAds() {
    // Hide all ads when not in gameplay
    await this.hideBannerAd();
  }
}

export default AdService;
```

---

## **STEP 5: Main Game Component**

This is the heart of your game. Due to length, I'll provide the key sections:

### **src/components/FishGame.jsx** (Part 1 - Setup):
```javascript
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import AdService from '../services/AdService';

// Import Capacitor plugins for mobile features
let Haptics, StatusBar, SplashScreen;
if (typeof window !== 'undefined') {
  try {
    import('@capacitor/haptics').then(module => { Haptics = module.Haptics; });
    import('@capacitor/status-bar').then(module => { StatusBar = module.StatusBar; });
    import('@capacitor/splash-screen').then(module => { SplashScreen = module.SplashScreen; });
  } catch (error) {
    console.log('Capacitor plugins not available in web environment');
  }
}

const FishGame = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const adServiceRef = useRef(new AdService());
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('seaweedSwimmerHighScore') || '0'));
  const [countdown, setCountdown] = useState(0);

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const FISH_SIZE = 40;
  const SEAWEED_WIDTH = 80;
  const SEAWEED_GAP = 200;
  const GRAVITY = 0.15;
  const FISH_JUMP = -5.5;
  const BASE_SEAWEED_SPEED = 2;

  // ... rest of game logic
```

**I'll continue with the complete game code in the next parts...**

Would you like me to:

1. **Continue with the complete FishGame.jsx code** (the main game logic)
2. **Provide a GitHub repository link** where you can download everything
3. **Create a ZIP file** with step-by-step instructions

Which option would work best for you to get the code to your computer?