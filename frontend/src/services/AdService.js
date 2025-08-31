import { AdMob, BannerAdSize, BannerAdPosition, AdmobConsentStatus, AdmobConsentDebugGeography } from '@capacitor-community/admob';

class AdService {
  constructor() {
    this.isAdMobInitialized = false;
    this.isTestMode = false; // Set to false for production with real ads
    
    // Test IDs (use in development)
    this.testBannerAdId = 'ca-app-pub-3940256099942544/6300978111';
    this.testInterstitialAdId = 'ca-app-pub-3940256099942544/1033173712';

    // Production IDs (replace with your actual AdMob IDs)
    this.prodBannerAdId = 'ca-app-pub-9069068945892968/1870840975';
    this.prodInterstitialAdId = 'ca-app-pub-9069068945892968/1870840975'; // Using banner ID for now

    this.bannerAdId = this.isTestMode ? this.testBannerAdId : this.prodBannerAdId;
    this.interstitialAdId = this.isTestMode ? this.testInterstitialAdId : this.prodInterstitialAdId;
  }

  async initialize() {
    try {
      console.log('🎯 Initializing AdMob...');
      
      // Initialize AdMob
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: this.isTestMode ? ['YOUR_DEVICE_ID'] : [],
        initializeForTesting: this.isTestMode,
      });

      // Handle consent (GDPR compliance)
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
    // Show interstitial ad after game over (every 3rd game)
    const gameCount = parseInt(localStorage.getItem('gameCount') || '0') + 1;
    localStorage.setItem('gameCount', gameCount.toString());
    
    if (gameCount % 3 === 0) {
      await this.showInterstitialAd();
    }
  }

  async showMenuBannerAd() {
    // Show banner ad on menu screen
    await this.showBannerAd(BannerAdPosition.BOTTOM_CENTER);
  }

  async hideGameplayAds() {
    // Hide banner during gameplay for better UX
    await this.hideBannerAd();
  }
}

export default AdService;