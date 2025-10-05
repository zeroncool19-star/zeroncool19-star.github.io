import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import AdService from '../services/AdService';
import AudioService from '../services/AudioService';

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
  const audioServiceRef = useRef(new AudioService());
  const [gameState, setGameState] = useState('intro'); // intro, menu, howToPlay, highScores, settings, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('seaweedSwimmerHighScore') || '0'));
  const [gameStarted, setGameStarted] = useState(false); // Track if first tap happened
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const FISH_SIZE = 40;
  const SEAWEED_WIDTH = 80;
  const SEAWEED_GAP = 200;
  const GRAVITY = 0.15;
  const FISH_JUMP = -4.5; // Reduced from -5.5 for less rapid movement
  const BASE_SEAWEED_SPEED = 2;

  // Game state
  const gameRef = useRef({
    fish: {
      x: 150,
      y: CANVAS_HEIGHT / 2,
      velocity: 0,
      rotation: 0
    },
    seaweeds: [],
    lastFrameTime: Date.now(),
    bubbles: [],
    startTime: 0,
    lastSeaweedSpawn: 0,
    difficulty: 1
  });

  // Create seaweed obstacle with natural movement parameters
  const createSeaweed = (x) => {
    const minGapY = 120;
    const maxGapY = CANVAS_HEIGHT - SEAWEED_GAP - 120;
    const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
    
    return {
      x: x,
      gapY: gapY,
      // Multiple wave parameters for natural movement with increased amplitude
      primaryWave: {
        offset: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.002, // Much slower base movement
        amplitude: 12 + Math.random() * 10 // Increased primary sway amount
      },
      secondaryWave: {
        offset: Math.random() * Math.PI * 2,
        speed: 0.007 + Math.random() * 0.004, // Faster secondary wave
        amplitude: 5 + Math.random() * 6 // Increased secondary movement
      },
      currentWave: {
        offset: Math.random() * Math.PI * 2,
        speed: 0.001 + Math.random() * 0.001, // Very slow current effect
        amplitude: 18 + Math.random() * 12 // Increased gentle current sway
      }
    };
  };

  // Create bubble effect
  const createBubble = () => {
    return {
      x: Math.random() * CANVAS_WIDTH,
      y: CANVAS_HEIGHT + 20,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2
    };
  };

  // Initialize game with performance optimizations
  const initGame = useCallback(() => {
    const game = gameRef.current;
    game.fish = {
      x: 150,
      y: CANVAS_HEIGHT / 2,
      velocity: 0,
      rotation: 0
    };
    game.seaweeds = [createSeaweed(CANVAS_WIDTH)];
    game.bubbles = Array.from({ length: 8 }, () => createBubble());
    game.startTime = Date.now();
    game.lastSeaweedSpawn = 0;
    setGameStarted(false); // Reset gameStarted flag
    game.difficulty = 1;
    // Clear cached gradient for new game
    game.backgroundGradient = null;
    setScore(0);
  }, []);

  // Handle fish jump with haptic feedback and speed scaling
  const jumpFish = useCallback(async () => {
    if (gameState === 'playing') {
      // First tap starts the game
      if (!gameStarted) {
        setGameStarted(true);
        gameRef.current.startTime = Date.now(); // Reset start time on first tap
      }
      
      // Scale jump force with difficulty for consistent feel (max difficulty 30)
      const currentDifficulty = Math.min(Math.floor(score / 20) + 1, 30);
      const fishSpeedMultiplier = 1 + (currentDifficulty - 1) * 0.05;
      const adjustedJump = FISH_JUMP * fishSpeedMultiplier;
      
      gameRef.current.fish.velocity = adjustedJump;
      
      // Play swim sound effect
      audioServiceRef.current.playSwimSound();
      
      // Add haptic feedback on mobile (if enabled)
      if (hapticsEnabled) {
        try {
          if (Haptics) {
            await Haptics.impact({ style: 'light' });
          }
        } catch (error) {
          // Haptics not available, continue without feedback
        }
      }
    } else if (gameState === 'gameOver') {
      initGame();
      setGameState('playing');
      // Restart music
      audioServiceRef.current.initialize();
      audioServiceRef.current.startMusic();
      // Add haptic feedback for menu interaction (if enabled)
      if (hapticsEnabled) {
        try {
          if (Haptics) {
            await Haptics.impact({ style: 'medium' });
          }
        } catch (error) {
          // Haptics not available, continue without feedback
        }
      }
    }
  }, [gameState, initGame, score, gameStarted, hapticsEnabled]);

  // Navigation handlers with updated ad integration
  const goToMenu = useCallback(async () => {
    setGameState('menu');
    // Hide all ads on menu screens
    await adServiceRef.current.hideAllAds();
    // Stop game music
    audioServiceRef.current.stopMusic();
  }, []);
  
  const goToHowToPlay = useCallback(async () => {
    setGameState('howToPlay');
    // Hide all ads on instruction screens
    await adServiceRef.current.hideAllAds();
  }, []);
  
  const goToHighScores = useCallback(async () => {
    setGameState('highScores');
    // Hide all ads on high score screens
    await adServiceRef.current.hideAllAds();
  }, []);
  
  const goToSettings = useCallback(async () => {
    setGameState('settings');
    // Hide all ads on settings screens
    await adServiceRef.current.hideAllAds();
  }, []);
  
  const startGame = useCallback(async () => {
    initGame();
    setGameState('playing');
    // Initialize and start audio
    audioServiceRef.current.initialize();
    audioServiceRef.current.startMusic();
    // Show banner ad after a short delay
    setTimeout(() => {
      adServiceRef.current.showGameplayBannerAd();
    }, 3000); // Show after 3 seconds
  }, [initGame]);

  // Check collision
  const checkCollision = (fish, seaweed) => {
    const fishLeft = fish.x - FISH_SIZE / 2;
    const fishRight = fish.x + FISH_SIZE / 2;
    const fishTop = fish.y - FISH_SIZE / 2;
    const fishBottom = fish.y + FISH_SIZE / 2;

    // More generous collision detection accounting for seaweed sway
    const seaweedLeft = seaweed.x - SEAWEED_WIDTH / 3; // More generous hitbox
    const seaweedRight = seaweed.x + SEAWEED_WIDTH / 3;
    
    const topSeaweedBottom = seaweed.gapY;
    const bottomSeaweedTop = seaweed.gapY + SEAWEED_GAP;

    if (fishRight > seaweedLeft && fishLeft < seaweedRight) {
      if (fishTop < topSeaweedBottom || fishBottom > bottomSeaweedTop) {
        return true;
      }
    }
    return false;
  };

  // Game loop with performance optimizations
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Calculate delta time for frame-rate independent movement
    const currentTime = Date.now();
    const deltaTime = (currentTime - game.lastFrameTime) / 16.67; // Normalize to 60fps
    game.lastFrameTime = currentTime;
    
    // Cap delta time to prevent huge jumps (e.g., when tab loses focus)
    const clampedDelta = Math.min(deltaTime, 3);
    
    // Clear canvas with brighter underwater gradient (optimize by caching gradient)
    if (!gameRef.current.backgroundGradient) {
      const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      gradient.addColorStop(0, '#1e40af');    // Brighter top blue
      gradient.addColorStop(0.5, '#1d4ed8');  // Brighter mid blue  
      gradient.addColorStop(1, '#2563eb');    // Brighter bottom blue
      gameRef.current.backgroundGradient = gradient;
    }
    ctx.fillStyle = gameRef.current.backgroundGradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState !== 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Only apply physics and score updates after first tap
    if (gameStarted) {
      // Update score based on time (only after first tap)
      const gameRunningTime = currentTime - game.startTime;
      const newScore = Math.floor(gameRunningTime / 1000);
      if (newScore !== score) {
        setScore(newScore);
      }

      // Update difficulty every 20 points and increase fish speed (max difficulty 30)
      game.difficulty = Math.min(Math.floor(newScore / 20) + 1, 30);
      const currentSpeed = (BASE_SEAWEED_SPEED + (game.difficulty - 1) * 0.6) * clampedDelta;
      
      // Increase fish movement speed slightly with difficulty
      const fishSpeedMultiplier = 1 + (game.difficulty - 1) * 0.05;
      
      // Update fish physics with speed multiplier and delta time
      game.fish.velocity += GRAVITY * fishSpeedMultiplier * clampedDelta;
      game.fish.y += game.fish.velocity * clampedDelta;
      game.fish.rotation = Math.max(-30, Math.min(30, game.fish.velocity * 3));

      // Check bounds
      if (game.fish.y < 0 || game.fish.y > CANVAS_HEIGHT) {
        setGameState('gameOver');
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('seaweedSwimmerHighScore', newScore.toString());
        }
        // Play collision sound and stop music
        audioServiceRef.current.playCollisionSound();
        audioServiceRef.current.stopMusic();
        // Show interstitial ad when player dies
        adServiceRef.current.showGameOverAd();
        return;
      }

      // Update seaweeds (performance optimized)
      for (let i = game.seaweeds.length - 1; i >= 0; i--) {
        const seaweed = game.seaweeds[i];
        seaweed.x -= currentSpeed;
        
        // Check collision (optimized collision detection)
        if (checkCollision(game.fish, seaweed)) {
          setGameState('gameOver');
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('seaweedSwimmerHighScore', newScore.toString());
          }
          // Play collision sound and stop music
          audioServiceRef.current.playCollisionSound();
          audioServiceRef.current.stopMusic();
          // Show interstitial ad when player dies
          adServiceRef.current.showGameOverAd();
          return;
        }
        
        // Remove off-screen seaweeds
        if (seaweed.x < -SEAWEED_WIDTH) {
          game.seaweeds.splice(i, 1);
        }
      }
      
      // Add new seaweeds with unpredictable spacing
      const randomSpacing = 350 + Math.random() * 200;
      const lastSeaweed = game.seaweeds[game.seaweeds.length - 1];
      
      if (game.seaweeds.length === 0 || (lastSeaweed && lastSeaweed.x < CANVAS_WIDTH - randomSpacing)) {
        game.seaweeds.push(createSeaweed(CANVAS_WIDTH + SEAWEED_WIDTH));
      }

      // Update bubbles (performance optimized)
      for (let i = 0; i < game.bubbles.length; i++) {
        const bubble = game.bubbles[i];
        bubble.y -= bubble.speed;
        if (bubble.y < -20) {
          bubble.y = CANVAS_HEIGHT + 20;
          bubble.x = Math.random() * CANVAS_WIDTH;
        }
      }
    } else {
      // Before first tap: keep fish centered and stationary
      game.fish.y = CANVAS_HEIGHT / 2;
      game.fish.velocity = 0;
      game.fish.rotation = 0;
    }

    // Draw bubbles (batch rendering)
    ctx.save();
    ctx.fillStyle = '#87ceeb';
    for (let i = 0; i < game.bubbles.length; i++) {
      const bubble = game.bubbles[i];
      ctx.globalAlpha = bubble.opacity;
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Draw seaweeds with natural underwater movement
    game.seaweeds.forEach(seaweed => {
      // Calculate natural underwater sway using multiple sine waves
      const timeInSeconds = currentTime * 0.001;
      
      // Primary gentle current (like ocean current)
      const primarySway = Math.sin(timeInSeconds * seaweed.primaryWave.speed + seaweed.primaryWave.offset) * seaweed.primaryWave.amplitude;
      
      // Secondary wave motion (like water turbulence)
      const secondarySway = Math.sin(timeInSeconds * seaweed.secondaryWave.speed + seaweed.secondaryWave.offset) * seaweed.secondaryWave.amplitude;
      
      // Very slow current drift
      const currentDrift = Math.sin(timeInSeconds * seaweed.currentWave.speed + seaweed.currentWave.offset) * seaweed.currentWave.amplitude;
      
      // Combine waves for natural movement
      const totalSway = primarySway + secondarySway * 0.6 + currentDrift * 0.3;
      
      // Function to draw realistic seaweed fronds
      const drawSeaweedFrond = (x, y, height, isTop) => {
        const frondWidth = SEAWEED_WIDTH / 4;
        const segments = Math.floor(height / 12);
        
        for (let i = 0; i < 3; i++) { // 3 fronds per seaweed
          const frondX = x + (i - 1) * frondWidth;
          const swayMultiplier = (i === 1) ? 1 : 0.8; // Center frond sways more
          
          ctx.save();
          ctx.strokeStyle = i === 1 ? '#22c55e' : '#16a34a'; // Much brighter greens
          ctx.lineWidth = Math.max(2, 6 - i);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          ctx.beginPath();
          ctx.moveTo(frondX, y);
          
          // Draw seaweed with natural segmented movement
          for (let j = 1; j <= segments; j++) {
            const segmentRatio = j / segments;
            const segmentY = isTop ? y - (j * 12) : y + (j * 12);
            
            // Each segment responds to sway differently (more movement toward tips)
            const segmentSway = totalSway * swayMultiplier * segmentRatio;
            
            // Add natural curve that varies along the length
            const naturalCurve = Math.sin(j * 0.4 + timeInSeconds * 0.5) * 4 * segmentRatio;
            
            // Small random variation per segment for organic look
            const segmentVariation = Math.sin(j * 1.2 + timeInSeconds * 0.3 + i) * 2;
            
            ctx.lineTo(frondX + segmentSway + naturalCurve + segmentVariation, segmentY);
          }
          
          ctx.stroke();
          
          // Add small leaves along the frond (less frequent for performance)
          if (segments > 4) {
            for (let j = 3; j <= segments; j += 3) {
              const segmentRatio = j / segments;
              const leafY = isTop ? y - (j * 12) : y + (j * 12);
              const leafSway = totalSway * swayMultiplier * segmentRatio;
              const leafCurve = Math.sin(j * 0.4 + timeInSeconds * 0.5) * 4 * segmentRatio;
              const leafVariation = Math.sin(j * 1.2 + timeInSeconds * 0.3 + i) * 2;
              
              ctx.fillStyle = '#4ade80'; // Bright green for leaves
              ctx.save();
              ctx.translate(frondX + leafSway + leafCurve + leafVariation, leafY);
              ctx.rotate((leafSway + leafCurve) * 0.01);
              
              // Small organic leaf shapes
              ctx.beginPath();
              ctx.ellipse(-6, 0, 6, 2.5, 0, 0, Math.PI * 2);
              ctx.fill();
              ctx.beginPath();
              ctx.ellipse(6, 0, 6, 2.5, 0, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.restore();
            }
          }
          
          ctx.restore();
        }
      };
      
      // Draw top seaweed (growing downward from ceiling)
      drawSeaweedFrond(seaweed.x, seaweed.gapY, seaweed.gapY, true);
      
      // Draw bottom seaweed (growing upward from floor)
      const bottomHeight = CANVAS_HEIGHT - (seaweed.gapY + SEAWEED_GAP);
      drawSeaweedFrond(seaweed.x, seaweed.gapY + SEAWEED_GAP, bottomHeight, false);
    });

    // Draw fish (optimized rendering)
    ctx.save();
    ctx.translate(game.fish.x, game.fish.y);
    ctx.rotate(game.fish.rotation * Math.PI / 180);
    
    // Fish body (main shape)
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.ellipse(0, 0, FISH_SIZE / 2, FISH_SIZE / 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Fish stripes (batch render for performance)
    ctx.fillStyle = '#ff8c5a';
    ctx.fillRect(-FISH_SIZE / 4, -FISH_SIZE / 6, 3, FISH_SIZE / 3);
    ctx.fillRect(0, -FISH_SIZE / 6, 3, FISH_SIZE / 3);
    
    // Fish tail
    ctx.fillStyle = '#ff4500';
    ctx.beginPath();
    ctx.moveTo(-FISH_SIZE / 2, 0);
    ctx.lineTo(-FISH_SIZE, -FISH_SIZE / 4);
    ctx.lineTo(-FISH_SIZE, FISH_SIZE / 4);
    ctx.closePath();
    ctx.fill();
    
    // Fish eye (simplified for performance)
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(FISH_SIZE / 6, -FISH_SIZE / 8, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(FISH_SIZE / 6 + 2, -FISH_SIZE / 8, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Fish fins
    ctx.fillStyle = '#ff8c5a';
    ctx.beginPath();
    ctx.ellipse(0, FISH_SIZE / 4, 8, 4, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, highScore, score, gameStarted]);

  // Event listeners with performance optimizations
  useEffect(() => {
    let lastTapTime = 0;
    const tapCooldown = 50; // Prevent excessive tapping lag
    
    const handleClick = (e) => {
      const now = Date.now();
      if (now - lastTapTime < tapCooldown) return; // Throttle taps
      
      e.preventDefault();
      e.stopPropagation();
      lastTapTime = now;
      jumpFish();
    };

    const handleTouch = (e) => {
      const now = Date.now();
      if (now - lastTapTime < tapCooldown) return; // Throttle taps
      
      e.preventDefault();
      e.stopPropagation();
      lastTapTime = now;
      jumpFish();
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jumpFish();
      }
    };

    // Prevent context menu on long press
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Prevent default touch behaviors to avoid scrolling (passive: false for performance)
    const handleTouchMove = (e) => {
      e.preventDefault();
    };

    const canvas = canvasRef.current;
    if (canvas) {
      // Use passive: false only where needed
      canvas.addEventListener('click', handleClick, { passive: false });
      canvas.addEventListener('touchstart', handleTouch, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('contextmenu', handleContextMenu, { passive: false });
      document.addEventListener('keydown', handleKeyPress);
      
      // Optimize canvas for performance
      canvas.style.touchAction = 'none';
      canvas.style.userSelect = 'none';
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('touchstart', handleTouch);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('contextmenu', handleContextMenu);
      }
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [jumpFish]);

  // Start game loop
  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop]);

  // Initialize AdMob and Audio when component mounts
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await adServiceRef.current.initialize();
        // Show initial banner ad on menu
        if (gameState === 'menu') {
          await adServiceRef.current.showMenuBannerAd();
        }
      } catch (error) {
        console.log('Ad initialization skipped in web environment');
      }
    };
    
    // Load audio preferences
    const loadAudioPreferences = () => {
      const savedMusic = localStorage.getItem('seaweedSwimmerMusic');
      const savedSfx = localStorage.getItem('seaweedSwimmerSfx');
      const savedHaptics = localStorage.getItem('seaweedSwimmerHaptics');
      
      setMusicEnabled(savedMusic !== null ? savedMusic === 'true' : true);
      setSfxEnabled(savedSfx !== null ? savedSfx === 'true' : true);
      setHapticsEnabled(savedHaptics !== null ? savedHaptics === 'true' : true);
    };
    
    initializeAds();
    loadAudioPreferences();
    
    // Cleanup ads and audio on unmount
    return () => {
      if (adServiceRef.current) {
        adServiceRef.current.removeBannerAd();
      }
      if (audioServiceRef.current) {
        audioServiceRef.current.stopMusic();
      }
    };
  }, []);

  // Handle intro screen transition
  useEffect(() => {
    if (gameState === 'intro') {
      const timer = setTimeout(() => {
        setGameState('menu');
      }, 4000); // Show intro for 4 seconds
      
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Handle ad display based on game state
  useEffect(() => {
    const handleAdDisplay = async () => {
      try {
        if (gameState === 'intro' || gameState === 'menu' || gameState === 'howToPlay' || gameState === 'highScores' || gameState === 'settings' || gameState === 'gameOver') {
          // Hide all ads on non-gameplay screens
          await adServiceRef.current.hideAllAds();
        }
        // Banner ads are handled in startGame function for gameplay only
      } catch (error) {
        console.log('Ad management skipped in web environment');
      }
    };

    handleAdDisplay();
  }, [gameState]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-600 to-blue-800 overflow-hidden">
      {/* Intro Screen */}
      {gameState === 'intro' && (
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
          {/* Animated water waves in background */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700 to-blue-500">
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-950 to-transparent opacity-80"></div>
          </div>
          
          {/* Rising text container */}
          <div className="relative z-10 text-center">
            {/* Game title - rises from sea */}
            <div 
              className="text-5xl sm:text-7xl font-bold text-white mb-4 opacity-0"
              style={{
                animation: 'riseFromSea 2s ease-out forwards',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)'
              }}
            >
              🐠 Seaweed Swimmer
            </div>
            
            {/* Created by text - rises with delay */}
            <div 
              className="text-2xl sm:text-4xl text-blue-200 opacity-0"
              style={{
                animation: 'riseFromSea 2s ease-out 0.8s forwards',
                textShadow: '0 0 10px rgba(147, 197, 253, 0.6)'
              }}
            >
              Created by <span className="font-bold text-white">Zeron</span>
            </div>
          </div>
          
          {/* Bubble effects */}
          <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white opacity-20"
                style={{
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 20 + 10}px`,
                  left: `${Math.random() * 100}%`,
                  animation: `bubble ${3 + Math.random() * 4}s ease-in ${Math.random() * 2}s infinite`,
                  bottom: '-50px'
                }}
              />
            ))}
          </div>
          
          {/* CSS animations */}
          <style>{`
            @keyframes riseFromSea {
              0% {
                transform: translateY(100vh);
                opacity: 0;
              }
              50% {
                opacity: 0.5;
              }
              100% {
                transform: translateY(0);
                opacity: 1;
              }
            }
            
            @keyframes bubble {
              0% {
                transform: translateY(0) scale(1);
                opacity: 0;
              }
              10% {
                opacity: 0.3;
              }
              90% {
                opacity: 0.3;
              }
              100% {
                transform: translateY(-100vh) scale(0.5);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      )}
      
      {/* Only show game canvas when playing or game over */}
      {(gameState === 'playing' || gameState === 'gameOver') && (
        <div 
          className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 cursor-pointer"
          onClick={jumpFish}
          onTouchStart={(e) => {
            e.preventDefault();
            jumpFish();
          }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="pointer-events-none select-none"
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
          
          {/* Game UI Overlay */}
          {gameState === 'playing' && (
            <div className="absolute top-12 left-4 text-white text-sm sm:text-base sm:top-16 sm:left-6 z-10 bg-black bg-opacity-40 rounded-lg p-3">
              <div className="text-xl sm:text-2xl font-bold mb-1">Score: {score}</div>
              <div className="text-base sm:text-lg">High Score: {highScore}</div>
              <div className="text-xs sm:text-sm opacity-75">Difficulty: {Math.floor(score / 30) + 1}</div>
            </div>
          )}

          {/* Tap to Start Overlay */}
          {gameState === 'playing' && !gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-black bg-opacity-50 rounded-lg p-8 animate-pulse">
                <div className="text-6xl font-bold text-white mb-4">👆</div>
                <div className="text-4xl text-white font-bold mb-2">Tap to Start!</div>
                <div className="text-xl text-blue-200">Tap screen to swim up</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Menu */}
      {gameState === 'menu' && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <Card className="p-6 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-md w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              🐠 Seaweed Swimmer
            </h1>
            <p className="text-blue-200 mb-8 text-sm sm:text-base">
              Navigate your fish through the underwater seaweed forest
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={startGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold w-full"
              >
                🏊 Start Game
              </Button>
              
              <Button 
                onClick={goToHowToPlay}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold w-full"
              >
                📖 How to Play
              </Button>
              
              <Button 
                onClick={goToHighScores}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold w-full"
              >
                🏆 High Scores
              </Button>
              
              <Button 
                onClick={goToSettings}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg font-semibold w-full"
              >
                ⚙️ Settings
              </Button>
            </div>
          </Card>
        </div>
      )}

        {/* How to Play Screen */}
        {gameState === 'howToPlay' && (
          <div className="flex items-center justify-center w-full h-full p-4">
            <Card className="p-6 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-lg w-full">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                📖 How to Play
              </h1>

              <div className="space-y-5 text-white mb-8">
                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-4xl">👆</span>
                    <h2 className="text-2xl font-bold">Tap to Swim</h2>
                  </div>
                  <p className="text-blue-200">Tap anywhere to make your fish swim upward</p>
                </div>

                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-4xl">🌿</span>
                    <h2 className="text-2xl font-bold">Avoid Seaweed</h2>
                  </div>
                  <p className="text-blue-200">Navigate through the swaying obstacles</p>
                </div>

                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-4xl">⏱️</span>
                    <h2 className="text-2xl font-bold">Survive Longer</h2>
                  </div>
                  <p className="text-blue-200">Your score = time survived in seconds</p>
                </div>

                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-4xl">⚡</span>
                    <h2 className="text-2xl font-bold">Difficulty Rises</h2>
                  </div>
                  <p className="text-blue-200">Game speeds up every 30 seconds</p>
                </div>
              </div>
                
              <Button 
                onClick={goToMenu}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg w-full"
              >
                ← Back to Menu
              </Button>
            </Card>
        </div>
      )}

      {/* High Scores Screen */}
      {gameState === 'highScores' && (
        <div className="flex items-start justify-center w-full h-full p-4 pt-12 pb-4 overflow-y-auto">
            <Card className="p-6 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-md w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                🏆 High Scores
              </h1>
              
              <div className="space-y-4">
                <div className="bg-blue-800 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-blue-300 mb-3">Your Best Score</h2>
                  <div className="text-4xl font-bold text-white mb-2">{highScore}</div>
                  <div className="text-blue-200 text-sm">
                    {highScore === 0 ? 'No games played yet!' : `${highScore} seconds survived`}
                  </div>
                </div>

                <div className="bg-blue-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-300 mb-3">Achievement Milestones</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-blue-200">
                      <span>🥉 Bronze Swimmer:</span>
                      <span>20+ seconds</span>
                    </div>
                    <div className="flex justify-between text-blue-200">
                      <span>🥈 Silver Swimmer:</span>
                      <span>50+ seconds</span>
                    </div>
                    <div className="flex justify-between text-yellow-400">
                      <span>🥇 Gold Swimmer:</span>
                      <span>100+ seconds</span>
                    </div>
                    <div className="flex justify-between text-cyan-400">
                      <span>⭐ Deep Sea Explorer:</span>
                      <span>200+ seconds</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>🐠 Fish Whisperer:</span>
                      <span>300+ seconds</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>🌟 Legendary Swimmer:</span>
                      <span>500+ seconds</span>
                    </div>
                    <div className="flex justify-between text-indigo-400">
                      <span>🌌 Abyssal Master:</span>
                      <span>700+ seconds</span>
                    </div>
                    <div className="flex justify-between text-yellow-300 font-bold">
                      <span>👑 Ocean Deity:</span>
                      <span>1000+ seconds</span>
                    </div>
                  </div>
                </div>

                {highScore >= 20 && (
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {highScore >= 1000 ? '👑' : 
                       highScore >= 700 ? '🌌' : 
                       highScore >= 500 ? '🌟' : 
                       highScore >= 300 ? '🐠' : 
                       highScore >= 200 ? '⭐' : 
                       highScore >= 100 ? '🥇' : 
                       highScore >= 50 ? '🥈' : '🥉'}
                    </div>
                    <div className="text-blue-300 font-semibold">
                      {highScore >= 1000 ? 'Ocean Deity!' : 
                       highScore >= 700 ? 'Abyssal Master!' : 
                       highScore >= 500 ? 'Legendary Swimmer!' : 
                       highScore >= 300 ? 'Fish Whisperer!' : 
                       highScore >= 200 ? 'Deep Sea Explorer!' : 
                       highScore >= 100 ? 'Gold Swimmer!' : 
                       highScore >= 50 ? 'Silver Swimmer!' : 'Bronze Swimmer!'}
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={goToMenu}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg w-full mt-4"
              >
                ← Back to Menu
              </Button>
            </Card>
        </div>
      )}

      {/* Settings Screen */}
      {gameState === 'settings' && (
        <div className="flex items-center justify-center w-full h-full p-4">
            <Card className="p-6 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-md w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                ⚙️ Settings
              </h1>
              
              <div className="space-y-6 mb-8">
                {/* Music Toggle */}
                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎵</span>
                      <div className="text-left">
                        <div className="text-white font-semibold">Music</div>
                        <div className="text-blue-300 text-sm">Underwater ambient sounds</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newValue = !musicEnabled;
                        setMusicEnabled(newValue);
                        audioServiceRef.current.setMusicEnabled(newValue);
                        localStorage.setItem('seaweedSwimmerMusic', newValue.toString());
                      }}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        musicEnabled ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          musicEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Sound Effects Toggle */}
                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🔊</span>
                      <div className="text-left">
                        <div className="text-white font-semibold">Sound Effects</div>
                        <div className="text-blue-300 text-sm">Swim & collision sounds</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newValue = !sfxEnabled;
                        setSfxEnabled(newValue);
                        audioServiceRef.current.setSfxEnabled(newValue);
                        localStorage.setItem('seaweedSwimmerSfx', newValue.toString());
                      }}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        sfxEnabled ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          sfxEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Haptics Toggle */}
                <div className="bg-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">📳</span>
                      <div className="text-left">
                        <div className="text-white font-semibold">Vibration</div>
                        <div className="text-blue-300 text-sm">Haptic feedback on tap</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newValue = !hapticsEnabled;
                        setHapticsEnabled(newValue);
                        localStorage.setItem('seaweedSwimmerHaptics', newValue.toString());
                      }}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        hapticsEnabled ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          hapticsEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={goToMenu}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg w-full"
              >
                ← Back to Menu
              </Button>
            </Card>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-4">
            <Card className="p-4 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-sm w-full">
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                🐠 Game Over!
              </h1>
              <div className="text-white mb-4">
                <div className="text-xl sm:text-2xl mb-2">Final Score: {score}</div>
                {score === highScore && score > 0 && (
                  <div className="text-yellow-400 text-base sm:text-lg">🏆 New High Score!</div>
                )}
                {score >= 20 && (
                  <div className="text-blue-300 mt-2">
                    {score >= 1000 ? '👑 Ocean Deity!' : 
                     score >= 700 ? '🌌 Abyssal Master!' : 
                     score >= 500 ? '🌟 Legendary Swimmer!' : 
                     score >= 300 ? '🐠 Fish Whisperer!' : 
                     score >= 200 ? '⭐ Deep Sea Explorer!' : 
                     score >= 100 ? '🥇 Gold Swimmer!' : 
                     score >= 50 ? '🥈 Silver Swimmer!' : '🥉 Bronze Swimmer!'}
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={jumpFish}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg w-full"
                >
                  🏊 Play Again
                </Button>
                
                <Button 
                  onClick={goToMenu}
                  variant="outline"
                  className="border-blue-400 text-blue-300 hover:bg-blue-800 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg w-full"
                >
                  ← Back to Menu
                </Button>
              </div>
            </Card>
          </div>
        )}
    
      {(gameState === 'menu' || gameState === 'playing') && (
        <div className="mt-2 sm:mt-4 text-center text-white">
          <p className="text-xs sm:text-sm opacity-75">
            {gameState === 'menu' ? 'Choose an option above to get started' : 'Tap anywhere on the screen to play'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FishGame;