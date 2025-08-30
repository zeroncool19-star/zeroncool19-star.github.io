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
  const [gameState, setGameState] = useState('menu'); // menu, howToPlay, highScores, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('seaweedSwimmerHighScore') || '0'));

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const FISH_SIZE = 40;
  const SEAWEED_WIDTH = 80;
  const SEAWEED_GAP = 200;
  const GRAVITY = 0.15;
  const FISH_JUMP = -5.5;
  const BASE_SEAWEED_SPEED = 2.8;

  // Game state
  const gameRef = useRef({
    fish: {
      x: 150,
      y: CANVAS_HEIGHT / 2,
      velocity: 0,
      rotation: 0
    },
    seaweeds: [],
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
    game.difficulty = 1;
    // Clear cached gradient for new game
    game.backgroundGradient = null;
    setScore(0);
  }, []);

  // Handle fish jump with haptic feedback and speed scaling
  const jumpFish = useCallback(async () => {
    if (gameState === 'playing') {
      // Scale jump force with difficulty for consistent feel
      const currentDifficulty = Math.floor(score / 20) + 1;
      const fishSpeedMultiplier = 1 + (currentDifficulty - 1) * 0.05;
      const adjustedJump = FISH_JUMP * fishSpeedMultiplier;
      
      gameRef.current.fish.velocity = adjustedJump;
      // Add haptic feedback on mobile
      try {
        if (Haptics) {
          await Haptics.impact({ style: 'light' });
        }
      } catch (error) {
        // Haptics not available, continue without feedback
      }
    } else if (gameState === 'gameOver') {
      initGame();
      setGameState('playing');
      // Add haptic feedback for menu interaction
      try {
        if (Haptics) {
          await Haptics.impact({ style: 'medium' });
        }
      } catch (error) {
        // Haptics not available, continue without feedback
      }
    }
  }, [gameState, initGame, score]);

  // Navigation handlers with ad integration
  const goToMenu = useCallback(async () => {
    setGameState('menu');
    // Show banner ad on menu
    await adServiceRef.current.showMenuBannerAd();
  }, []);
  
  const goToHowToPlay = useCallback(async () => {
    setGameState('howToPlay');
    // Keep banner ad visible in how-to-play
  }, []);
  
  const goToHighScores = useCallback(async () => {
    setGameState('highScores');
    // Keep banner ad visible in high scores
  }, []);
  
  const startGame = useCallback(async () => {
    initGame();
    setGameState('playing');
    // Hide ads during gameplay for better UX
    await adServiceRef.current.hideGameplayAds();
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

    // Use requestAnimationFrame timing for smooth animation
    const currentTime = Date.now();
    
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

    // Update score based on time (optimized to avoid repeated math)
    const newScore = Math.floor((currentTime - game.startTime) / 1000);
    if (newScore !== score) {
      setScore(newScore);
    }

    // Update difficulty every 20 points and increase fish speed
    game.difficulty = Math.floor(newScore / 20) + 1;
    const currentSpeed = BASE_SEAWEED_SPEED + (game.difficulty - 1) * 0.4;
    
    // Increase fish movement speed slightly with difficulty
    const fishSpeedMultiplier = 1 + (game.difficulty - 1) * 0.05;
    
    // Update fish physics with speed multiplier
    const adjustedGravity = GRAVITY * fishSpeedMultiplier;
    game.fish.velocity += adjustedGravity;
    game.fish.y += game.fish.velocity;
    game.fish.rotation = Math.max(-30, Math.min(30, game.fish.velocity * 3));

    // Check bounds
    if (game.fish.y < 0 || game.fish.y > CANVAS_HEIGHT) {
      setGameState('gameOver');
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('seaweedSwimmerHighScore', newScore.toString());
      }
      // Show game over ad (revenue opportunity)
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
        // Show game over ad (revenue opportunity)
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
  }, [gameState, highScore, score]);

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

  // Initialize AdMob when component mounts
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
    
    initializeAds();
    
    // Cleanup ads on unmount
    return () => {
      if (adServiceRef.current) {
        adServiceRef.current.removeBannerAd();
      }
    };
  }, []);

  // Handle ad display based on game state
  useEffect(() => {
    const handleAdDisplay = async () => {
      try {
        if (gameState === 'menu' || gameState === 'howToPlay' || gameState === 'highScores') {
          await adServiceRef.current.showMenuBannerAd();
        } else if (gameState === 'playing') {
          await adServiceRef.current.hideGameplayAds();
        } else if (gameState === 'gameOver') {
          await adServiceRef.current.showMenuBannerAd();
        }
      } catch (error) {
        console.log('Ad management skipped in web environment');
      }
    };

    handleAdDisplay();
  }, [gameState]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 p-2 sm:p-4">
      <div className="relative max-w-full">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-blue-800 rounded-lg shadow-2xl cursor-pointer touch-none select-none"
          style={{ 
            maxWidth: '100vw', 
            maxHeight: '70vh',
            width: 'auto',
            height: 'auto',
            aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`
          }}
        />
        
        {/* Game UI Overlay */}
        <div className="absolute top-2 left-2 text-white text-sm sm:text-base sm:top-4 sm:left-4">
          <div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Score: {score}</div>
          <div className="text-base sm:text-lg">High Score: {highScore}</div>
          <div className="text-xs sm:text-sm opacity-75">Difficulty: {Math.floor(score / 20) + 1}</div>
        </div>

        {/* Main Menu */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-4">
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
              </div>
            </Card>
          </div>
        )}

        {/* How to Play Screen */}
        {gameState === 'howToPlay' && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg p-4">
            <Card className="p-4 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-2xl w-full">
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-4">
                📖 How to Play Seaweed Swimmer
              </h1>

              <div className="grid md:grid-cols-2 gap-6 mb-8 text-white">
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3">
                    🎮 Game Controls
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base text-left">
                    <div className="flex items-start space-x-3">
                      <span className="text-orange-400 text-lg">📱</span>
                      <p><strong>Tap anywhere</strong> to make your fish swim upward</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 text-lg">🌿</span>
                      <p><strong>Navigate through</strong> the swaying seaweed obstacles</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-yellow-400 text-lg">⏱️</span>
                      <p><strong>Survive as long as possible</strong> - your score is time-based</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-red-400 text-lg">💥</span>
                      <p><strong>Avoid collisions</strong> with seaweed or boundaries</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3">
                    ⚡ Difficulty Progression
                  </h2>
                  <div className="space-y-3 text-sm sm:text-base text-left">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-400 text-lg">⏰</span>
                      <p><strong>Every 20 seconds:</strong> Difficulty level increases</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-purple-400 text-lg">🏃</span>
                      <p><strong>Seaweed moves faster:</strong> Obstacles approach quicker</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-pink-400 text-lg">🐟</span>
                      <p><strong>Fish speed increases:</strong> More responsive but requires precision</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-cyan-400 text-lg">🌊</span>
                      <p><strong>Challenge intensifies:</strong> Test your reflexes and endurance!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-blue-700 pt-6">
                <div className="text-blue-200 mb-6 text-sm sm:text-base">
                  <p className="mb-2">🎯 <strong>Goal:</strong> Beat your high score by surviving longer!</p>
                  <p>🌊 The seaweed moves naturally like real ocean vegetation - watch it sway and time your moves carefully.</p>
                </div>
                
                <Button 
                  onClick={goToMenu}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg w-full sm:w-auto"
                >
                  ← Back to Menu
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* High Scores Screen */}
        {gameState === 'highScores' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg p-4">
            <Card className="p-6 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-md w-full">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                🏆 High Scores
              </h1>
              
              <div className="space-y-6">
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
                      <span>40+ seconds</span>
                    </div>
                    <div className="flex justify-between text-blue-200">
                      <span>🥇 Gold Swimmer:</span>
                      <span>60+ seconds</span>
                    </div>
                    <div className="flex justify-between text-yellow-400">
                      <span>👑 Seaweed Master:</span>
                      <span>100+ seconds</span>
                    </div>
                    <div className="flex justify-between text-purple-400">
                      <span>🏆 Ocean Champion:</span>
                      <span>150+ seconds</span>
                    </div>
                    <div className="flex justify-between text-pink-400">
                      <span>⭐ Deep Sea Explorer:</span>
                      <span>200+ seconds</span>
                    </div>
                    <div className="flex justify-between text-cyan-400">
                      <span>🌊 Current Rider:</span>
                      <span>250+ seconds</span>
                    </div>
                    <div className="flex justify-between text-green-400">
                      <span>🐠 Fish Whisperer:</span>
                      <span>300+ seconds</span>
                    </div>
                    <div className="flex justify-between text-orange-400">
                      <span>🔱 Poseidon's Chosen:</span>
                      <span>400+ seconds</span>
                    </div>
                    <div className="flex justify-between text-red-400 font-bold">
                      <span>🌟 Legendary Swimmer:</span>
                      <span>500+ seconds</span>
                    </div>
                  </div>
                </div>

                {highScore >= 20 && (
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {highScore >= 500 ? '🌟' : 
                       highScore >= 400 ? '🔱' : 
                       highScore >= 300 ? '🐠' : 
                       highScore >= 250 ? '🌊' : 
                       highScore >= 200 ? '⭐' : 
                       highScore >= 150 ? '🏆' : 
                       highScore >= 100 ? '👑' : 
                       highScore >= 60 ? '🥇' : 
                       highScore >= 40 ? '🥈' : '🥉'}
                    </div>
                    <div className="text-blue-300 font-semibold">
                      {highScore >= 500 ? 'Legendary Swimmer!' : 
                       highScore >= 400 ? 'Poseidon\'s Chosen!' : 
                       highScore >= 300 ? 'Fish Whisperer!' : 
                       highScore >= 250 ? 'Current Rider!' : 
                       highScore >= 200 ? 'Deep Sea Explorer!' : 
                       highScore >= 150 ? 'Ocean Champion!' : 
                       highScore >= 100 ? 'Seaweed Master!' : 
                       highScore >= 60 ? 'Gold Swimmer!' : 
                       highScore >= 40 ? 'Silver Swimmer!' : 'Bronze Swimmer!'}
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={goToMenu}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg w-full mt-6"
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
                    {score >= 500 ? '🌟 Legendary Swimmer!' : 
                     score >= 400 ? '🔱 Poseidon\'s Chosen!' : 
                     score >= 300 ? '🐠 Fish Whisperer!' : 
                     score >= 250 ? '🌊 Current Rider!' : 
                     score >= 200 ? '⭐ Deep Sea Explorer!' : 
                     score >= 150 ? '🏆 Ocean Champion!' : 
                     score >= 100 ? '👑 Seaweed Master!' : 
                     score >= 60 ? '🥇 Gold Swimmer!' : 
                     score >= 40 ? '🥈 Silver Swimmer!' : '🥉 Bronze Swimmer!'}
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
      </div>
      
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