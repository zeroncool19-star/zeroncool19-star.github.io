import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const FishGame = () => {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('fishGameHighScore') || '0'));

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const FISH_SIZE = 40;
  const SEAWEED_WIDTH = 80;
  const SEAWEED_GAP = 200;
  const GRAVITY = 0.25;
  const FISH_JUMP = -5;
  const BASE_SEAWEED_SPEED = 1;

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

  // Create seaweed obstacle
  const createSeaweed = (x) => {
    const minGapY = 120;
    const maxGapY = CANVAS_HEIGHT - SEAWEED_GAP - 120;
    const gapY = Math.random() * (maxGapY - minGapY) + minGapY;
    
    return {
      x: x,
      gapY: gapY,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.005, // Much slower sway like real seaweed
      swayAmount: 20 + Math.random() * 15 // Variable sway amount
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

  // Initialize game
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
    setScore(0);
  }, []);

  // Handle fish jump
  const jumpFish = useCallback(() => {
    if (gameState === 'playing') {
      gameRef.current.fish.velocity = FISH_JUMP;
    } else if (gameState === 'menu' || gameState === 'gameOver') {
      initGame();
      setGameState('playing');
    }
  }, [gameState, initGame]);

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

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const game = gameRef.current;

    // Clear canvas with underwater gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#001e3c');
    gradient.addColorStop(0.5, '#003f7f');
    gradient.addColorStop(1, '#1e3a8a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (gameState !== 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Update score based on time
    const currentTime = Date.now();
    const newScore = Math.floor((currentTime - game.startTime) / 1000);
    setScore(newScore);

    // Update difficulty
    game.difficulty = Math.floor(newScore / 30) + 1;
    const currentSpeed = BASE_SEAWEED_SPEED + (game.difficulty - 1) * 0.2;

    // Update fish physics
    game.fish.velocity += GRAVITY;
    game.fish.y += game.fish.velocity;
    game.fish.rotation = Math.max(-30, Math.min(30, game.fish.velocity * 3));

    // Check bounds
    if (game.fish.y < 0 || game.fish.y > CANVAS_HEIGHT) {
      setGameState('gameOver');
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('fishGameHighScore', newScore.toString());
      }
      return;
    }

    // Update seaweeds
    game.seaweeds.forEach((seaweed, index) => {
      seaweed.x -= currentSpeed;
      
      // Check collision
      if (checkCollision(game.fish, seaweed)) {
        setGameState('gameOver');
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('fishGameHighScore', newScore.toString());
        }
        return;
      }
    });

    // Remove off-screen seaweeds and add new ones with unpredictable spacing
    game.seaweeds = game.seaweeds.filter(seaweed => seaweed.x > -SEAWEED_WIDTH);
    
    // Unpredictable seaweed spawning
    const randomSpacing = 350 + Math.random() * 200; // Random spacing between 350-550px
    const lastSeaweed = game.seaweeds[game.seaweeds.length - 1];
    
    if (game.seaweeds.length === 0 || (lastSeaweed && lastSeaweed.x < CANVAS_WIDTH - randomSpacing)) {
      game.seaweeds.push(createSeaweed(CANVAS_WIDTH + SEAWEED_WIDTH));
    }

    // Update bubbles
    game.bubbles.forEach(bubble => {
      bubble.y -= bubble.speed;
      if (bubble.y < -20) {
        bubble.y = CANVAS_HEIGHT + 20;
        bubble.x = Math.random() * CANVAS_WIDTH;
      }
    });

    // Draw bubbles
    game.bubbles.forEach(bubble => {
      ctx.save();
      ctx.globalAlpha = bubble.opacity;
      ctx.fillStyle = '#87ceeb';
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw seaweeds with realistic ocean seaweed appearance
    game.seaweeds.forEach(seaweed => {
      const sway = Math.sin(Date.now() * seaweed.swaySpeed + seaweed.swayOffset) * seaweed.swayAmount;
      
      // Function to draw realistic seaweed fronds
      const drawSeaweedFrond = (x, y, height, isTop) => {
        const frondWidth = SEAWEED_WIDTH / 4;
        const segments = Math.floor(height / 15);
        
        for (let i = 0; i < 3; i++) { // 3 fronds per seaweed
          const frondX = x + (i - 1) * frondWidth;
          const swayMultiplier = (i === 1) ? 1 : 0.7; // Center frond sways more
          
          ctx.save();
          ctx.strokeStyle = i === 1 ? '#1a5d1a' : '#0d4a0d';
          ctx.lineWidth = 6 - i;
          ctx.lineCap = 'round';
          
          ctx.beginPath();
          ctx.moveTo(frondX, y);
          
          for (let j = 1; j <= segments; j++) {
            const segmentY = isTop ? y - (j * 15) : y + (j * 15);
            const segmentSway = sway * swayMultiplier * (j / segments);
            const naturalCurve = Math.sin(j * 0.3) * 8 * (j / segments);
            
            ctx.lineTo(frondX + segmentSway + naturalCurve, segmentY);
          }
          
          ctx.stroke();
          
          // Add small leaves along the frond
          for (let j = 3; j <= segments; j += 2) {
            const leafY = isTop ? y - (j * 15) : y + (j * 15);
            const leafSway = sway * swayMultiplier * (j / segments);
            const leafCurve = Math.sin(j * 0.3) * 8 * (j / segments);
            
            ctx.fillStyle = '#2d6e2d';
            ctx.save();
            ctx.translate(frondX + leafSway + leafCurve, leafY);
            ctx.rotate((leafSway + leafCurve) * 0.02);
            
            // Small leaf shapes
            ctx.beginPath();
            ctx.ellipse(-8, 0, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(8, 0, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
          }
          
          ctx.restore();
        }
      };
      
      // Draw top seaweed (growing downward from ceiling)
      drawSeaweedFrond(seaweed.x, seaweed.gapY, seaweed.gapY, true);
      
      // Draw bottom seaweed (growing upward from floor)
      const bottomHeight = CANVAS_HEIGHT - (seaweed.gapY + SEAWEED_GAP);
      drawSeaweedFrond(seaweed.x, seaweed.gapY + SEAWEED_GAP, bottomHeight, false);
      
      // Add seaweed base/roots
      ctx.fillStyle = '#0d3d0d';
      ctx.fillRect(seaweed.x - SEAWEED_WIDTH/2, 0, SEAWEED_WIDTH, 15); // Top base
      ctx.fillRect(seaweed.x - SEAWEED_WIDTH/2, CANVAS_HEIGHT - 15, SEAWEED_WIDTH, 15); // Bottom base
    });

    // Draw fish
    ctx.save();
    ctx.translate(game.fish.x, game.fish.y);
    ctx.rotate(game.fish.rotation * Math.PI / 180);
    
    // Fish body
    ctx.fillStyle = '#ff6b35';
    ctx.beginPath();
    ctx.ellipse(0, 0, FISH_SIZE / 2, FISH_SIZE / 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Fish stripes
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
    
    // Fish eye
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
  }, [gameState, highScore]);

  // Event listeners
  useEffect(() => {
    const handleClick = (e) => {
      e.preventDefault();
      jumpFish();
    };

    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jumpFish();
      }
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('touchstart', handleClick);
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('touchstart', handleClick);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-600 p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-4 border-blue-800 rounded-lg shadow-2xl cursor-pointer"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        
        {/* Game UI Overlay */}
        <div className="absolute top-4 left-4 text-white">
          <div className="text-2xl font-bold mb-2">Score: {score}</div>
          <div className="text-lg">High Score: {highScore}</div>
          <div className="text-sm opacity-75">Difficulty: {Math.floor(score / 30) + 1}</div>
        </div>

        {/* Menu/Game Over Overlay */}
        {(gameState === 'menu' || gameState === 'gameOver') && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <Card className="p-8 text-center bg-blue-900 border-blue-700">
              <h1 className="text-4xl font-bold text-white mb-4">
                🐠 Seaweed Swimmer
              </h1>
              {gameState === 'gameOver' && (
                <div className="text-white mb-4">
                  <div className="text-2xl mb-2">Game Over!</div>
                  <div className="text-xl">Final Score: {score}</div>
                  {score === highScore && score > 0 && (
                    <div className="text-yellow-400 text-lg">🏆 New High Score!</div>
                  )}
                </div>
              )}
              <div className="text-white mb-6">
                <p className="mb-2">Tap to make the fish swim up!</p>
                <p className="mb-2">Navigate through the swaying seaweed forest</p>
                <p className="text-sm opacity-75">Survive as long as possible - difficulty increases every 30 seconds</p>
              </div>
              <Button 
                onClick={jumpFish}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              >
                {gameState === 'menu' ? 'Start Game' : 'Play Again'}
              </Button>
            </Card>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-white">
        <p className="text-sm opacity-75">Use spacebar, click, or tap to play</p>
      </div>
    </div>
  );
};

export default FishGame;