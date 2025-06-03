import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  id: number;
  type: 'cactus' | 'bird';
}

const GAME_CONFIG = {
  CANVAS_WIDTH: 1000,
  CANVAS_HEIGHT: 300,
  DINO_WIDTH: 30,
  DINO_HEIGHT: 50,
  DINO_GROUND_Y: 220,
  OBSTACLE_WIDTH: 25,
  OBSTACLE_HEIGHT: 40,
  BIRD_WIDTH: 35,
  BIRD_HEIGHT: 25,
  JUMP_FORCE: -12, // Reduced from -15
  GRAVITY: 0.6, // Reduced from 0.8
  INITIAL_SPEED: 2, // Reduced from 4
  MAX_SPEED: 5, // Reduced from 8
  SPEED_INCREMENT: 0.0005, // Reduced from 0.001
  MIN_OBSTACLE_DISTANCE: 400, // Increased from 300
  MAX_OBSTACLE_DISTANCE: 800 // Increased from 600
};

const DinoGamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const lastObstacleX = useRef<number>(GAME_CONFIG.CANVAS_WIDTH);
  const gameSpeedRef = useRef<number>(GAME_CONFIG.INITIAL_SPEED);
  
  const [gameState, setGameState] = useState<'stopped' | 'playing' | 'paused' | 'gameOver'>('stopped');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('dino-high-score');
    return saved ? parseInt(saved) : 0;
  });
  
  const dinoRef = useRef<GameObject & { velocityY: number; isJumping: boolean; isDucking: boolean }>({
    x: 80,
    y: GAME_CONFIG.DINO_GROUND_Y,
    width: GAME_CONFIG.DINO_WIDTH,
    height: GAME_CONFIG.DINO_HEIGHT,
    velocityY: 0,
    isJumping: false,
    isDucking: false
  });
  
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const cloudsRef = useRef<Array<{x: number, y: number, size: number}>>([]);

  // Initialize clouds
  useEffect(() => {
    cloudsRef.current = Array.from({length: 5}, (_, i) => ({
      x: i * 250,
      y: 50 + Math.random() * 80,
      size: 30 + Math.random() * 20
    }));
  }, []);

  const jump = useCallback(() => {
    if (!dinoRef.current.isJumping && gameState === 'playing') {
      dinoRef.current.velocityY = GAME_CONFIG.JUMP_FORCE;
      dinoRef.current.isJumping = true;
      dinoRef.current.isDucking = false;
    }
  }, [gameState]);

  const duck = useCallback((isDucking: boolean) => {
    if (gameState === 'playing' && !dinoRef.current.isJumping) {
      dinoRef.current.isDucking = isDucking;
      dinoRef.current.height = isDucking ? GAME_CONFIG.DINO_HEIGHT * 0.6 : GAME_CONFIG.DINO_HEIGHT;
      if (isDucking) {
        dinoRef.current.y = GAME_CONFIG.DINO_GROUND_Y + (GAME_CONFIG.DINO_HEIGHT * 0.4);
      } else {
        dinoRef.current.y = GAME_CONFIG.DINO_GROUND_Y;
      }
    }
  }, [gameState]);

  const checkCollision = useCallback((dino: GameObject, obstacle: GameObject): boolean => {
    const margin = 5; // Add some collision tolerance
    return (
      dino.x + margin < obstacle.x + obstacle.width - margin &&
      dino.x + dino.width - margin > obstacle.x + margin &&
      dino.y + margin < obstacle.y + obstacle.height - margin &&
      dino.y + dino.height - margin > obstacle.y + margin
    );
  }, []);

  const spawnObstacle = useCallback(() => {
    const distanceSinceLastObstacle = GAME_CONFIG.CANVAS_WIDTH - lastObstacleX.current;
    const minDistance = GAME_CONFIG.MIN_OBSTACLE_DISTANCE;
    
    if (distanceSinceLastObstacle >= minDistance) {
      const shouldSpawn = Math.random() < 0.3;
      if (shouldSpawn) {
        const obstacleType: 'cactus' | 'bird' = Math.random() < 0.7 ? 'cactus' : 'bird';
        const obstacle: Obstacle = {
          id: Date.now(),
          type: obstacleType,
          x: GAME_CONFIG.CANVAS_WIDTH,
          y: obstacleType === 'bird' ? 
             GAME_CONFIG.DINO_GROUND_Y - 60 - Math.random() * 40 : 
             GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT - GAME_CONFIG.OBSTACLE_HEIGHT,
          width: obstacleType === 'bird' ? GAME_CONFIG.BIRD_WIDTH : GAME_CONFIG.OBSTACLE_WIDTH,
          height: obstacleType === 'bird' ? GAME_CONFIG.BIRD_HEIGHT : GAME_CONFIG.OBSTACLE_HEIGHT
        };
        obstaclesRef.current.push(obstacle);
        lastObstacleX.current = GAME_CONFIG.CANVAS_WIDTH;
      }
    }
  }, []);

  const drawDino = useCallback((ctx: CanvasRenderingContext2D, dino: typeof dinoRef.current) => {
    ctx.save();
    
    // Dino shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(dino.x + 5, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT + 5, dino.width, 8);
    
    // Dino body gradient
    const gradient = ctx.createLinearGradient(dino.x, dino.y, dino.x, dino.y + dino.height);
    gradient.addColorStop(0, '#4ade80');
    gradient.addColorStop(1, '#16a34a');
    
    ctx.fillStyle = gradient;
    
    if (dino.isDucking) {
      // Ducking dino (wider, shorter)
      ctx.fillRect(dino.x, dino.y, dino.width + 10, dino.height);
      // Eye
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dino.x + 20, dino.y + 8, 6, 4);
      ctx.fillStyle = '#000000';
      ctx.fillRect(dino.x + 22, dino.y + 9, 2, 2);
    } else {
      // Standing dino
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      // Eye
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dino.x + 18, dino.y + 10, 8, 6);
      ctx.fillStyle = '#000000';
      ctx.fillRect(dino.x + 20, dino.y + 12, 4, 2);
      
      // Legs animation
      const legOffset = Math.sin(Date.now() * 0.01) * 2;
      ctx.fillStyle = gradient;
      ctx.fillRect(dino.x + 5, dino.y + dino.height, 6, 8 + legOffset);
      ctx.fillRect(dino.x + 19, dino.y + dino.height, 6, 8 - legOffset);
    }
    
    ctx.restore();
  }, []);

  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.save();
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(obstacle.x + 3, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT + 5, obstacle.width, 8);
    
    if (obstacle.type === 'cactus') {
      // Cactus gradient
      const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x, obstacle.y + obstacle.height);
      gradient.addColorStop(0, '#22c55e');
      gradient.addColorStop(1, '#15803d');
      ctx.fillStyle = gradient;
      
      // Main cactus body
      ctx.fillRect(obstacle.x + 8, obstacle.y, 12, obstacle.height);
      // Cactus arms
      ctx.fillRect(obstacle.x, obstacle.y + 15, 8, 15);
      ctx.fillRect(obstacle.x + 20, obstacle.y + 10, 8, 20);
      
      // Spikes
      ctx.fillStyle = '#166534';
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(obstacle.x + 6 + i * 6, obstacle.y + 5 + i * 8, 2, 4);
      }
    } else {
      // Bird
      const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y);
      gradient.addColorStop(0, '#ef4444');
      gradient.addColorStop(1, '#dc2626');
      ctx.fillStyle = gradient;
      
      // Bird body
      ctx.fillRect(obstacle.x + 10, obstacle.y + 8, 15, 12);
      // Wing animation
      const wingFlap = Math.sin(Date.now() * 0.02) * 5;
      ctx.fillRect(obstacle.x + 5, obstacle.y + wingFlap, 12, 8);
      ctx.fillRect(obstacle.x + 20, obstacle.y - wingFlap, 12, 8);
      
      // Beak
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(obstacle.x + 25, obstacle.y + 12, 6, 4);
    }
    
    ctx.restore();
  }, []);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Dark cyber gradient background to match site
    const skyGradient = ctx.createLinearGradient(0, 0, 0, GAME_CONFIG.CANVAS_HEIGHT);
    skyGradient.addColorStop(0, '#1a1f2c');
    skyGradient.addColorStop(0.5, '#2d1b4e');
    skyGradient.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    
    // Neon grid pattern
    ctx.strokeStyle = 'rgba(212, 9, 93, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < GAME_CONFIG.CANVAS_WIDTH; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, GAME_CONFIG.CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < GAME_CONFIG.CANVAS_HEIGHT; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, i);
      ctx.stroke();
    }
    
    // Cyber clouds with neon glow
    ctx.fillStyle = 'rgba(212, 9, 93, 0.3)';
    ctx.shadowColor = '#D4095D';
    ctx.shadowBlur = 10;
    cloudsRef.current.forEach(cloud => {
      cloud.x -= 0.3; // Slower clouds
      if (cloud.x + cloud.size < 0) {
        cloud.x = GAME_CONFIG.CANVAS_WIDTH;
        cloud.y = 30 + Math.random() * 60;
      }
      
      // Draw neon cloud
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.size * 0.3, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.2, cloud.y, cloud.size * 0.25, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.size * 0.4, cloud.y, cloud.size * 0.2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    
    // Cyber ground with neon line
    const groundGradient = ctx.createLinearGradient(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT, 0, GAME_CONFIG.CANVAS_HEIGHT);
    groundGradient.addColorStop(0, '#2d1b4e');
    groundGradient.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    
    // Neon ground line
    ctx.strokeStyle = '#D4095D';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#D4095D';
    ctx.shadowBlur = 15;
    ctx.setLineDash([15, 10]);
    ctx.beginPath();
    ctx.moveTo(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT);
    ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;
  }, []);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas and draw background
    drawBackground(ctx);

    // Update game speed
    gameSpeedRef.current = Math.min(
      GAME_CONFIG.MAX_SPEED,
      GAME_CONFIG.INITIAL_SPEED + scoreRef.current * GAME_CONFIG.SPEED_INCREMENT
    );

    // Update dino physics
    const dino = dinoRef.current;
    dino.velocityY += GAME_CONFIG.GRAVITY;
    dino.y += dino.velocityY;

    // Keep dino on ground
    if (dino.y >= GAME_CONFIG.DINO_GROUND_Y) {
      dino.y = GAME_CONFIG.DINO_GROUND_Y;
      dino.velocityY = 0;
      dino.isJumping = false;
    }

    // Draw dino
    drawDino(ctx, dino);

    // Spawn obstacles
    spawnObstacle();
    lastObstacleX.current -= gameSpeedRef.current;

    // Update and draw obstacles
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= gameSpeedRef.current;
      
      drawObstacle(ctx, obstacle);
      
      // Check collision
      if (checkCollision(dino, obstacle)) {
        setGameState('gameOver');
        if (scoreRef.current > highScore) {
          const newHighScore = scoreRef.current;
          setHighScore(newHighScore);
          localStorage.setItem('dino-high-score', newHighScore.toString());
        }
        return false;
      }
      
      // Remove off-screen obstacles and increment score
      if (obstacle.x + obstacle.width < 0) {
        scoreRef.current += 5;
        setScore(scoreRef.current);
        return false;
      }
      
      return true;
    });

    // Draw UI
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Score: ${scoreRef.current}`, 20, 40);
    ctx.fillText(`High: ${highScore}`, 20, 70);
    ctx.fillText(`Speed: ${gameSpeedRef.current.toFixed(1)}x`, 20, 100);

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(updateGame);
    }
  }, [gameState, highScore, checkCollision, spawnObstacle, drawDino, drawObstacle, drawBackground]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    gameSpeedRef.current = GAME_CONFIG.INITIAL_SPEED;
    obstaclesRef.current = [];
    lastObstacleX.current = GAME_CONFIG.CANVAS_WIDTH;
    dinoRef.current = {
      x: 80,
      y: GAME_CONFIG.DINO_GROUND_Y,
      width: GAME_CONFIG.DINO_WIDTH,
      height: GAME_CONFIG.DINO_HEIGHT,
      velocityY: 0,
      isJumping: false,
      isDucking: false
    };
  };

  const pauseGame = () => setGameState('paused');
  const resumeGame = () => setGameState('playing');
  const stopGame = () => {
    setGameState('stopped');
    setScore(0);
    scoreRef.current = 0;
    obstaclesRef.current = [];
  };

  useEffect(() => {
    if (gameState === 'playing') {
      updateGame();
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, updateGame]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
      }
      if (event.code === 'ArrowDown') {
        duck(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown') {
        duck(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [jump, duck]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-neon-darkpurple to-black relative overflow-hidden">
      {/* Cyber background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-red via-transparent to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-red via-neon-pink to-neon-purple bg-clip-text text-transparent mb-4 animate-pulse-neon">
            🦕 CYBER DINO ELITE
          </h1>
          <p className="text-lg text-white/70 neon-text">
            SPACE/↑ to Jump • ↓ to Duck • Survive the Cyber World!
          </p>
        </div>

        {/* Game Container */}
        <div className="relative">
          {/* Canvas with cyber styling */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={GAME_CONFIG.CANVAS_WIDTH}
                height={GAME_CONFIG.CANVAS_HEIGHT}
                className="rounded-2xl border-2 border-neon-red shadow-[0_0_30px_rgba(212,9,93,0.5)] bg-black"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(212, 9, 93, 0.3))'
                }}
              />
              
              {/* Game Controls - Top Right */}
              <div className="absolute top-4 right-4 flex gap-3">
                {gameState === 'stopped' && (
                  <Button 
                    onClick={startGame} 
                    className="neon-button text-sm px-4 py-2 bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all duration-300"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    START
                  </Button>
                )}
                
                {gameState === 'playing' && (
                  <Button 
                    onClick={pauseGame} 
                    className="neon-button text-sm px-4 py-2 bg-transparent border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white transition-all duration-300"
                  >
                    <Pause className="w-4 h-4 mr-1" />
                    PAUSE
                  </Button>
                )}
                
                {gameState === 'paused' && (
                  <>
                    <Button 
                      onClick={resumeGame} 
                      className="neon-button text-sm px-4 py-2 bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all duration-300"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      RESUME
                    </Button>
                    <Button 
                      onClick={stopGame} 
                      className="text-sm px-4 py-2 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      STOP
                    </Button>
                  </>
                )}
              </div>

              {/* Game Over Overlay */}
              {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-black/80 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8 bg-gradient-to-r from-neon-red/20 to-neon-purple/20 rounded-xl border border-neon-red/50 backdrop-blur-sm">
                    <h2 className="text-4xl font-bold text-neon-red mb-4 animate-pulse-neon">GAME OVER</h2>
                    <p className="text-2xl mb-4 text-white">Score: <span className="font-bold text-neon-pink">{score}</span></p>
                    {score === highScore && score > 0 && (
                      <p className="text-xl text-neon-pink mb-4 animate-pulse">🏆 NEW RECORD! 🏆</p>
                    )}
                    <Button 
                      onClick={startGame} 
                      className="neon-button px-6 py-3 bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all duration-300"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      RETRY
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Panel */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-6 p-6 bg-black/40 rounded-2xl border border-neon-red/30 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-red">{score}</div>
                <div className="text-sm text-white/70">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-pink">{highScore}</div>
                <div className="text-sm text-white/70">Best</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple">{gameSpeedRef.current.toFixed(1)}x</div>
                <div className="text-sm text-white/70">Speed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Info */}
        <div className="text-center mt-8">
          <div className="inline-block p-6 bg-black/40 rounded-2xl border border-neon-purple/30 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-neon-purple mb-4">CYBER CONTROLS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
              <div className="flex items-center justify-center gap-3">
                <span className="px-3 py-2 bg-neon-red/20 border border-neon-red rounded-lg font-mono text-neon-red">SPACE</span>
                <span className="text-white/60">or</span>
                <span className="px-3 py-2 bg-neon-red/20 border border-neon-red rounded-lg font-mono text-neon-red">↑</span>
                <span className="text-neon-red">JUMP</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="px-3 py-2 bg-neon-pink/20 border border-neon-pink rounded-lg font-mono text-neon-pink">↓</span>
                <span className="text-neon-pink">DUCK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoGamePage;
