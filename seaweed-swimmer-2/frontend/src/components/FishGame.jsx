import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import * as BABYLON from '@babylonjs/core';
import AdService from '../services/AdService';
import AudioService from '../services/AudioService';
import { leaderboardAPI } from '../services/ApiService';

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
  const engineRef = useRef(null);
  const sceneRef = useRef(null);
  const adServiceRef = useRef(new AdService());
  const audioServiceRef = useRef(new AudioService());
  
  const [gameState, setGameState] = useState('intro');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('seaweedSwimmer2HighScore') || '0'));
  const [gameStarted, setGameStarted] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  
  // Leaderboard state
  const [username, setUsername] = useState(localStorage.getItem('seaweedSwimmer2Username') || '');
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);
  
  // Addictiveness features
  const [milestonePopup, setMilestonePopup] = useState(null);
  const [nearMissEffect, setNearMissEffect] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const lastMilestoneRef = useRef(0);

  // Game constants
  const FISH_SIZE = 0.8;
  const SEAWEED_WIDTH = 1.5;
  const SEAWEED_GAP = 4;
  const GRAVITY = 0.008;
  const FISH_JUMP = -0.22;
  const BASE_SEAWEED_SPEED = 0.08;
  const WORLD_WIDTH = 20;
  const WORLD_HEIGHT = 15;

  // Game state ref
  const gameRef = useRef({
    fish: { y: 0, velocity: 0 },
    seaweeds: [],
    lastFrameTime: Date.now(),
    startTime: 0,
    difficulty: 1,
    fishMesh: null,
    seaweedMeshes: [],
    cameraShakeOffset: 0
  });

  // Helper function to determine achievement
  const getAchievement = (score) => {
    if (score >= 1000) return '👑 Ocean Deity';
    if (score >= 700) return '🌌 Abyssal Master';
    if (score >= 500) return '🌟 Legendary Swimmer';
    if (score >= 300) return '🐠 Fish Whisperer';
    if (score >= 200) return '⭐ Deep Sea Explorer';
    if (score >= 100) return '🥇 Gold Swimmer';
    if (score >= 50) return '🥈 Silver Swimmer';
    if (score >= 20) return '🥉 Bronze Swimmer';
    return '🐟 Novice Swimmer';
  };

  // Daily challenge initialization
  useEffect(() => {
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem('seaweedSwimmer2DailyChallenge');
    
    if (savedChallenge) {
      const challenge = JSON.parse(savedChallenge);
      const validTargets = Array.from({length: 15}, (_, i) => 20 + (i * 20));
      const isOldSystem = !validTargets.includes(challenge.target);
      
      if (isOldSystem) {
        const newChallenge = {
          date: today,
          target: 20,
          completed: false,
          streak: 0,
          lastStreak: 0
        };
        localStorage.setItem('seaweedSwimmer2DailyChallenge', JSON.stringify(newChallenge));
        setDailyChallenge(newChallenge);
        return;
      }
      
      if (challenge.date === today) {
        setDailyChallenge(challenge);
        return;
      }
      
      if (challenge.completed) {
        const newChallenge = {
          date: today,
          target: Math.min(challenge.target + 20, 300),
          completed: false,
          streak: 0,
          lastStreak: challenge.streak || 0
        };
        localStorage.setItem('seaweedSwimmer2DailyChallenge', JSON.stringify(newChallenge));
        setDailyChallenge(newChallenge);
      } else {
        const newChallenge = {
          date: today,
          target: challenge.target,
          completed: false,
          streak: 0,
          lastStreak: 0
        };
        localStorage.setItem('seaweedSwimmer2DailyChallenge', JSON.stringify(newChallenge));
        setDailyChallenge(newChallenge);
      }
    } else {
      const newChallenge = {
        date: today,
        target: 20,
        completed: false,
        streak: 0,
        lastStreak: 0
      };
      localStorage.setItem('seaweedSwimmer2DailyChallenge', JSON.stringify(newChallenge));
      setDailyChallenge(newChallenge);
    }
  }, []);

  // Initialize Babylon.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Create engine
    const engine = new BABYLON.Engine(canvasRef.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });
    engineRef.current = engine;

    // Create scene
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.11, 0.25, 0.68, 1); // Blue ocean
    sceneRef.current = scene;

    // Camera - Orthographic for 2.5D effect
    const camera = new BABYLON.ArcRotateCamera(
      'camera',
      0,
      0,
      25,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );
    camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    const aspectRatio = engine.getRenderWidth() / engine.getRenderHeight();
    camera.orthoTop = WORLD_HEIGHT / 2;
    camera.orthoBottom = -WORLD_HEIGHT / 2;
    camera.orthoLeft = -WORLD_WIDTH / 2 * aspectRatio;
    camera.orthoRight = WORLD_WIDTH / 2 * aspectRatio;

    // Lighting
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    // Create PS1-style post-processing effects
    createPS1Effects(scene, camera);

    // Create fish (low-poly 3D)
    const fish = createFish(scene);
    gameRef.current.fishMesh = fish;

    // Render loop
    engine.runRenderLoop(() => {
      if (gameState === 'playing') {
        updateGame();
      }
      scene.render();
    });

    // Resize handler
    const handleResize = () => {
      engine.resize();
      const aspectRatio = engine.getRenderWidth() / engine.getRenderHeight();
      camera.orthoLeft = -WORLD_WIDTH / 2 * aspectRatio;
      camera.orthoRight = WORLD_WIDTH / 2 * aspectRatio;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
    };
  }, []);

  // Create PS1-style effects
  const createPS1Effects = (scene, camera) => {
    // Low-res pixelation
    const pixelationEffect = new BABYLON.PostProcess(
      'pixelate',
      './shaders/pixelate',
      ['screenSize'],
      null,
      0.3, // Render at 30% resolution
      camera
    );

    // CRT scanlines & chromatic aberration
    const crtEffect = new BABYLON.PostProcess(
      'crt',
      './shaders/crt',
      ['time', 'amount'],
      null,
      1.0,
      camera,
      BABYLON.Texture.BILINEAR_SAMPLINGMODE
    );

    let time = 0;
    crtEffect.onApply = (effect) => {
      time += 0.01;
      effect.setFloat('time', time);
      effect.setFloat('amount', 0.003);
    };
  };

  // Create low-poly fish
  const createFish = (scene) => {
    const fish = new BABYLON.MeshBuilder.CreateBox('fish', {
      width: FISH_SIZE * 1.5,
      height: FISH_SIZE,
      depth: FISH_SIZE * 0.5
    }, scene);

    // Orange/red material with low-res texture
    const mat = new BABYLON.StandardMaterial('fishMat', scene);
    mat.diffuseColor = new BABYLON.Color3(1, 0.42, 0.21);
    mat.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    fish.material = mat;

    // Add triangle tail
    const tail = BABYLON.MeshBuilder.CreateCylinder('tail', {
      height: FISH_SIZE * 0.8,
      diameterTop: 0,
      diameterBottom: FISH_SIZE * 0.6,
      tessellation: 3
    }, scene);
    tail.rotation.z = Math.PI / 2;
    tail.position.x = -FISH_SIZE * 1.2;
    tail.parent = fish;
    tail.material = mat;

    // Add eye
    const eye = BABYLON.MeshBuilder.CreateSphere('eye', {
      diameter: FISH_SIZE * 0.2
    }, scene);
    eye.position = new BABYLON.Vector3(FISH_SIZE * 0.4, FISH_SIZE * 0.2, FISH_SIZE * 0.26);
    eye.parent = fish;
    const eyeMat = new BABYLON.StandardMaterial('eyeMat', scene);
    eyeMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    eye.material = eyeMat;

    fish.position.x = -6;
    fish.position.y = 0;
    fish.position.z = 0;

    return fish;
  };

  // Create seaweed obstacle
  const createSeaweed = (x, gapY) => {
    if (!sceneRef.current) return null;

    const scene = sceneRef.current;
    const seaweedGroup = new BABYLON.TransformNode('seaweed', scene);
    seaweedGroup.position.x = x;

    // Material
    const mat = new BABYLON.StandardMaterial('seaweedMat', scene);
    mat.diffuseColor = new BABYLON.Color3(0.13, 0.77, 0.37); // Bright green
    mat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    // Top seaweed (from top to gap)
    const topHeight = WORLD_HEIGHT / 2 - gapY;
    const topSeaweed = BABYLON.MeshBuilder.CreateBox('topSeaweed', {
      width: SEAWEED_WIDTH * 0.5,
      height: topHeight,
      depth: 0.5
    }, scene);
    topSeaweed.position.y = WORLD_HEIGHT / 2 - topHeight / 2;
    topSeaweed.parent = seaweedGroup;
    topSeaweed.material = mat;

    // Bottom seaweed (from gap to bottom)
    const bottomHeight = WORLD_HEIGHT / 2 - (gapY + SEAWEED_GAP);
    const bottomSeaweed = BABYLON.MeshBuilder.CreateBox('bottomSeaweed', {
      width: SEAWEED_WIDTH * 0.5,
      height: bottomHeight,
      depth: 0.5
    }, scene);
    bottomSeaweed.position.y = -WORLD_HEIGHT / 2 + bottomHeight / 2;
    bottomSeaweed.parent = seaweedGroup;
    bottomSeaweed.material = mat;

    return {
      mesh: seaweedGroup,
      gapY: gapY,
      passed: false,
      nearMissTriggered: false
    };
  };

  // Initialize game
  const initGame = useCallback(() => {
    const game = gameRef.current;
    game.fish.y = 0;
    game.fish.velocity = 0;
    game.startTime = Date.now();
    setGameStarted(false);
    game.difficulty = 1;
    setScore(0);

    if (game.fishMesh) {
      game.fishMesh.position.y = 0;
      game.fishMesh.rotation.z = 0;
    }

    // Clear old seaweeds
    game.seaweedMeshes.forEach(sw => sw.mesh.dispose());
    game.seaweedMeshes = [];

    // Create initial seaweed
    const initialSeaweed = createSeaweed(WORLD_WIDTH / 2, 0);
    if (initialSeaweed) {
      game.seaweedMeshes.push(initialSeaweed);
    }

    game.lastFrameTime = Date.now();
  }, []);

  // Handle fish jump
  const jumpFish = useCallback(async () => {
    if (gameState === 'playing') {
      if (!gameStarted) {
        setGameStarted(true);
        gameRef.current.startTime = Date.now();
      }
      
      const currentDifficulty = Math.min(Math.floor(score / 20) + 1, 20);
      const fishSpeedMultiplier = 1 + (currentDifficulty - 1) * 0.05;
      const adjustedJump = FISH_JUMP * fishSpeedMultiplier;
      
      gameRef.current.fish.velocity = adjustedJump;
      
      audioServiceRef.current.playSwimSound();
      
      if (hapticsEnabled && Haptics) {
        try {
          await Haptics.impact({ style: 'light' });
        } catch (error) {}
      }
    } else if (gameState === 'gameOver') {
      initGame();
      setGameState('playing');
      audioServiceRef.current.initialize();
      audioServiceRef.current.startMusic();
      if (hapticsEnabled && Haptics) {
        try {
          await Haptics.impact({ style: 'medium' });
        } catch (error) {}
      }
    }
  }, [gameState, initGame, score, gameStarted, hapticsEnabled]);

  // Update game (called every frame)
  const updateGame = useCallback(() => {
    if (!gameStarted) return;

    const game = gameRef.current;
    const currentTime = Date.now();
    const deltaTime = (currentTime - game.lastFrameTime) / 16.67;
    game.lastFrameTime = currentTime;
    const clampedDelta = Math.min(deltaTime, 3);

    // Update score
    const gameRunningTime = currentTime - game.startTime;
    const newScore = Math.floor(gameRunningTime / 1000);
    if (newScore !== score) {
      setScore(newScore);
      
      // Milestone check
      if (newScore > 0 && newScore % 100 === 0 && newScore !== lastMilestoneRef.current) {
        lastMilestoneRef.current = newScore;
        const milestones = {
          100: 'Century! 💯',
          200: 'Double Century! 🔥',
          300: 'Triple Century! ⚡',
          400: 'Quadruple! 💪',
          500: 'Half Thousand! 🌟',
          600: 'Six Hundred! 🚀',
          700: 'Seven Hundred! 🌌',
          800: 'Eight Hundred! 💎',
          900: 'Nine Hundred! 👑',
          1000: 'LEGENDARY! 🏆'
        };
        setMilestonePopup({ score: newScore, text: milestones[newScore] || `${newScore} Seconds! 🎉` });
        setTimeout(() => setMilestonePopup(null), 2000);
      }
    }

    // Update difficulty
    game.difficulty = Math.min(Math.floor(newScore / 20) + 1, 20);
    const currentSpeed = (BASE_SEAWEED_SPEED + (game.difficulty - 1) * 0.024) * clampedDelta;
    const fishSpeedMultiplier = 1 + (game.difficulty - 1) * 0.05;

    // Update fish physics
    game.fish.velocity += GRAVITY * fishSpeedMultiplier * clampedDelta;
    game.fish.y += game.fish.velocity * clampedDelta;

    if (game.fishMesh) {
      game.fishMesh.position.y = game.fish.y;
      game.fishMesh.rotation.z = Math.max(-0.5, Math.min(0.5, game.fish.velocity * 3));
      
      // PS1-style vertex wobble
      const wobble = Math.sin(currentTime * 0.01) * 0.02;
      game.fishMesh.position.x = -6 + wobble;
    }

    // Check bounds
    if (game.fish.y < -WORLD_HEIGHT / 2 || game.fish.y > WORLD_HEIGHT / 2) {
      handleGameOver(newScore);
      return;
    }

    // Update seaweeds
    for (let i = game.seaweedMeshes.length - 1; i >= 0; i--) {
      const seaweed = game.seaweedMeshes[i];
      seaweed.mesh.position.x -= currentSpeed;

      // PS1-style vertex wobble for seaweed
      const wobble = Math.sin(currentTime * 0.003 + i) * 0.05;
      seaweed.mesh.position.z = wobble;

      // Check collision
      const fishLeft = -6 - FISH_SIZE / 2;
      const fishRight = -6 + FISH_SIZE / 2;
      const fishTop = game.fish.y + FISH_SIZE / 2;
      const fishBottom = game.fish.y - FISH_SIZE / 2;

      const seaweedLeft = seaweed.mesh.position.x - SEAWEED_WIDTH / 4;
      const seaweedRight = seaweed.mesh.position.x + SEAWEED_WIDTH / 4;
      const topSeaweedBottom = seaweed.gapY - WORLD_HEIGHT / 2;
      const bottomSeaweedTop = seaweed.gapY + SEAWEED_GAP - WORLD_HEIGHT / 2;

      if (fishRight > seaweedLeft && fishLeft < seaweedRight) {
        if (fishTop > topSeaweedBottom || fishBottom < bottomSeaweedTop) {
          handleGameOver(newScore);
          return;
        }
      }

      // Check near-miss
      if (!seaweed.nearMissTriggered && Math.abs(-6 - seaweed.mesh.position.x) < 1) {
        const distFromTop = Math.abs(fishTop - topSeaweedBottom);
        const distFromBottom = Math.abs(fishBottom - bottomSeaweedTop);
        if (distFromTop < 0.5 || distFromBottom < 0.5) {
          seaweed.nearMissTriggered = true;
          setNearMissEffect(true);
          setTimeout(() => setNearMissEffect(false), 200);
        }
      }

      // Remove off-screen seaweeds
      if (seaweed.mesh.position.x < -WORLD_WIDTH / 2 - SEAWEED_WIDTH) {
        seaweed.mesh.dispose();
        game.seaweedMeshes.splice(i, 1);
      }
    }

    // Spawn new seaweeds
    const lastSeaweed = game.seaweedMeshes[game.seaweedMeshes.length - 1];
    if (!lastSeaweed || lastSeaweed.mesh.position.x < WORLD_WIDTH / 4) {
      const minGapY = 2;
      const maxGapY = WORLD_HEIGHT - SEAWEED_GAP - 2;
      const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
      const newSeaweed = createSeaweed(WORLD_WIDTH / 2 + SEAWEED_WIDTH, gapY);
      if (newSeaweed) {
        game.seaweedMeshes.push(newSeaweed);
      }
    }
  }, [gameStarted, score]);

  // Handle game over
  const handleGameOver = useCallback((finalScore) => {
    setGameState('gameOver');
    if (finalScore > highScore) {
      setHighScore(finalScore);
      setIsNewHighScore(true);
      localStorage.setItem('seaweedSwimmer2HighScore', finalScore.toString());
    } else {
      setIsNewHighScore(false);
    }

    // Check daily challenge
    if (dailyChallenge && !dailyChallenge.completed && finalScore >= dailyChallenge.target) {
      const updatedChallenge = {
        ...dailyChallenge,
        completed: true,
        streak: dailyChallenge.lastStreak + 1
      };
      setDailyChallenge(updatedChallenge);
      localStorage.setItem('seaweedSwimmer2DailyChallenge', JSON.stringify(updatedChallenge));
    }

    audioServiceRef.current.playCollisionSound();
    audioServiceRef.current.stopMusic();
    adServiceRef.current.showGameOverAd();
  }, [highScore, dailyChallenge]);

  // Username submission
  const handleUsernameSubmit = async () => {
    setUsernameError('');
    
    if (usernameInput.length < 3 || usernameInput.length > 15) {
      setUsernameError('Username must be 3-15 characters');
      return;
    }

    if (!/^[a-zA-Z0-9 ]+$/.test(usernameInput)) {
      setUsernameError('Only letters, numbers, and spaces allowed');
      return;
    }

    try {
      const result = await leaderboardAPI.checkUsername(usernameInput);
      if (!result.available) {
        setUsernameError('Username already taken');
        return;
      }

      setUsername(usernameInput);
      localStorage.setItem('seaweedSwimmer2Username', usernameInput);
      setShowUsernamePrompt(false);
    } catch (error) {
      setUsernameError('Error checking username');
    }
  };

  // Submit score to leaderboard
  const handleScoreSubmit = async () => {
    if (!username) {
      setUsernameInput('');
      setShowUsernamePrompt(true);
      return;
    }

    setSubmittingScore(true);
    try {
      const achievement = getAchievement(score);
      await leaderboardAPI.submitScore(username, score, achievement);
      alert('Score submitted successfully! 🎉');
    } catch (error) {
      alert('Error submitting score. Please try again.');
    } finally {
      setSubmittingScore(false);
    }
  };

  // Load leaderboard
  const loadLeaderboard = async () => {
    try {
      const data = await leaderboardAPI.getGlobalLeaderboard(100);
      setLeaderboard(data);
      setShowLeaderboard(true);
      setGameState('leaderboard');
    } catch (error) {
      alert('Error loading leaderboard');
    }
  };

  // Navigation handlers
  const goToMenu = useCallback(async () => {
    setGameState('menu');
    setShowLeaderboard(false);
    await adServiceRef.current.hideAllAds();
    audioServiceRef.current.stopMusic();
  }, []);

  const goToHowToPlay = useCallback(async () => {
    setGameState('howToPlay');
    await adServiceRef.current.hideAllAds();
  }, []);

  const goToHighScores = useCallback(async () => {
    setGameState('highScores');
    await adServiceRef.current.hideAllAds();
  }, []);

  const goToSettings = useCallback(async () => {
    setGameState('settings');
    await adServiceRef.current.hideAllAds();
  }, []);

  const startGame = useCallback(async () => {
    initGame();
    setGameState('playing');
    audioServiceRef.current.initialize();
    audioServiceRef.current.startMusic();
    setTimeout(() => {
      adServiceRef.current.showGameplayBannerAd();
    }, 3000);
  }, [initGame]);

  // Event listeners
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jumpFish();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [jumpFish]);

  // Initialize services
  useEffect(() => {
    const initializeAds = async () => {
      try {
        await adServiceRef.current.initialize();
        if (gameState === 'menu') {
          await adServiceRef.current.showMenuBannerAd();
        }
      } catch (error) {
        console.log('Ad initialization skipped in web environment');
      }
    };

    const loadAudioPreferences = () => {
      const savedMusic = localStorage.getItem('seaweedSwimmer2Music');
      const savedSfx = localStorage.getItem('seaweedSwimmer2Sfx');
      const savedHaptics = localStorage.getItem('seaweedSwimmer2Haptics');
      
      setMusicEnabled(savedMusic !== null ? savedMusic === 'true' : true);
      setSfxEnabled(savedSfx !== null ? savedSfx === 'true' : true);
      setHapticsEnabled(savedHaptics !== null ? savedHaptics === 'true' : true);
    };

    initializeAds();
    loadAudioPreferences();

    return () => {
      if (adServiceRef.current) {
        adServiceRef.current.removeBannerAd();
      }
      if (audioServiceRef.current) {
        audioServiceRef.current.stopMusic();
      }
    };
  }, []);

  // Intro screen transition
  useEffect(() => {
    if (gameState === 'intro') {
      const timer = setTimeout(() => {
        setGameState('menu');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
      {/* Babylon.js Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${
          gameState === 'playing' || gameState === 'gameOver' ? 'block' : 'hidden'
        }`}
        onClick={gameState === 'playing' || gameState === 'gameOver' ? jumpFish : undefined}
        onTouchStart={(e) => {
          if (gameState === 'playing' || gameState === 'gameOver') {
            e.preventDefault();
            jumpFish();
          }
        }}
      />

      {/* PS1-style CRT overlay */}
      {(gameState === 'playing' || gameState === 'gameOver') && (
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          )`,
          mixBlendMode: 'multiply'
        }} />
      )}

      {/* Intro Screen */}
      {gameState === 'intro' && (
        <div className="flex items-center justify-center w-full h-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-700 to-blue-500">
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-950 to-transparent opacity-80"></div>
          </div>
          
          <div className="relative z-10 text-center px-4">
            <div 
              className="text-5xl sm:text-7xl font-bold text-white mb-4 opacity-0 leading-tight"
              style={{
                animation: 'riseFromSea 2s ease-out forwards',
                textShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6)',
                fontFamily: 'monospace'
              }}
            >
              🐠 SEAWEED SWIMMER 2
            </div>
            
            <div 
              className="text-xl sm:text-3xl text-blue-200 opacity-0"
              style={{
                animation: 'riseFromSea 2s ease-out 0.8s forwards',
                textShadow: '0 0 10px rgba(147, 197, 253, 0.6)',
                fontFamily: 'monospace'
              }}
            >
              RETRO 3D EDITION
            </div>
          </div>

          <style>{`
            @keyframes riseFromSea {
              0% { transform: translateY(200px); opacity: 0; }
              50% { opacity: 0.5; }
              100% { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Game UI Overlay */}
      {gameState === 'playing' && (
        <>
          <div className="absolute top-12 left-4 text-white text-sm sm:text-base sm:top-16 sm:left-6 z-10 bg-black bg-opacity-60 rounded-lg p-3 border-2 border-blue-500" style={{ fontFamily: 'monospace' }}>
            <div className="text-xl sm:text-2xl font-bold mb-1">SCORE: {score}</div>
            <div className="text-base sm:text-lg">HIGH: {highScore}</div>
            <div className="text-xs sm:text-sm opacity-75">LVL: {Math.min(Math.floor(score / 20) + 1, 20)}</div>
          </div>

          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-black bg-opacity-70 rounded-lg p-8 animate-pulse border-4 border-red-500">
                <div className="text-6xl font-bold text-white mb-4">👆</div>
                <div className="text-4xl text-white font-bold mb-2" style={{ fontFamily: 'monospace' }}>TAP TO START</div>
                <div className="text-xl text-blue-200" style={{ fontFamily: 'monospace' }}>TAP SCREEN TO SWIM UP</div>
              </div>
            </div>
          )}

          {milestonePopup && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-6 shadow-2xl animate-bounce border-4 border-yellow-300">
                <div className="text-5xl font-bold text-white mb-2">{milestonePopup.score}</div>
                <div className="text-2xl text-white font-bold">{milestonePopup.text}</div>
              </div>
            </div>
          )}

          {nearMissEffect && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-red-500 opacity-20 animate-ping"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl font-bold text-red-500 animate-pulse" style={{ fontFamily: 'monospace' }}>CLOSE CALL!</div>
              </div>
            </div>
          )}

          {dailyChallenge && (
            <div className="absolute top-12 right-4 text-white text-xs sm:text-sm sm:top-16 sm:right-6 z-10 bg-purple-900 bg-opacity-80 rounded-lg p-2 sm:p-3 border-2 border-purple-500">
              <div className="font-bold mb-1">📅 DAILY CHALLENGE</div>
              <div className="text-blue-200">
                TARGET: {dailyChallenge.target}s
                {dailyChallenge.lastStreak > 0 && (
                  <div className="text-yellow-400 text-xs">🔥 {dailyChallenge.lastStreak} DAY STREAK</div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {/* Main Menu */}
      {gameState === 'menu' && (
        <div className="flex items-center justify-center w-full h-full p-4">
          <Card className="p-6 sm:p-8 text-center bg-blue-900 border-blue-700 max-w-md w-full border-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'monospace' }}>
              🐠 SEAWEED<br/>SWIMMER 2
            </h1>
            <p className="text-blue-200 mb-1 text-sm sm:text-base" style={{ fontFamily: 'monospace' }}>
              RETRO 3D EDITION
            </p>
            <p className="text-blue-300 mb-4 text-xs" style={{ fontFamily: 'monospace' }}>
              PS1-STYLE UNDERWATER ADVENTURE
            </p>
            
            {dailyChallenge && (
              <div className={`mb-6 p-4 rounded-lg border-2 ${dailyChallenge.completed ? 'bg-green-900 border-green-500' : 'bg-purple-900 border-purple-500'}`}>
                <div className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'monospace' }}>
                  📅 TODAY'S CHALLENGE
                </div>
                <div className="text-blue-200 mb-2">
                  REACH {dailyChallenge.target} SECONDS
                </div>
                {dailyChallenge.completed ? (
                  <div className="text-green-400 font-bold">✓ COMPLETED!</div>
                ) : (
                  <div className="text-yellow-400">IN PROGRESS...</div>
                )}
                {dailyChallenge.lastStreak > 0 && (
                  <div className="text-yellow-400 text-sm mt-2">
                    🔥 {dailyChallenge.lastStreak} DAY STREAK!
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-3">
              <Button 
                onClick={startGame}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold w-full border-2 border-orange-700"
                style={{ fontFamily: 'monospace' }}
              >
                🏊 START GAME
              </Button>
              
              <Button 
                onClick={loadLeaderboard}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 text-lg font-semibold w-full border-2 border-yellow-800"
                style={{ fontFamily: 'monospace' }}
              >
                🌐 ONLINE LEADERBOARD
              </Button>
              
              <Button 
                onClick={goToHowToPlay}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold w-full border-2 border-blue-800"
                style={{ fontFamily: 'monospace' }}
              >
                📖 HOW TO PLAY
              </Button>
              
              <Button 
                onClick={goToHighScores}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold w-full border-2 border-purple-800"
                style={{ fontFamily: 'monospace' }}
              >
                🏆 HIGH SCORES
              </Button>
              
              <Button 
                onClick={goToSettings}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg font-semibold w-full border-2 border-gray-800"
                style={{ fontFamily: 'monospace' }}
              >
                ⚙️ SETTINGS
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* How to Play Screen - CONTINUED IN NEXT FILE DUE TO LENGTH */}
