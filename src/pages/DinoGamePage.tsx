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
  CANVAS_WIDTH: 1500,
  CANVAS_HEIGHT: 600,
  DINO_WIDTH: 45,
  DINO_HEIGHT: 75,
  DINO_GROUND_Y: 450,
  OBSTACLE_WIDTH: 35,
  OBSTACLE_HEIGHT: 60,
  BIRD_WIDTH: 50,
  BIRD_HEIGHT: 20,
  JUMP_FORCE: -18, // Increased from -14 to -18 for higher jumps
  GRAVITY: 0.7, // Reduced from 0.9 to 0.7 for more floaty feeling
  INITIAL_SPEED: 6,
  MAX_SPEED: 14,
  SPEED_INCREMENT: 0.0008,
  MIN_OBSTACLE_DISTANCE: 500,
  MAX_OBSTACLE_DISTANCE: 900
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
  
  const dinoRef = useRef<GameObject & { velocityY: number; isJumping: boolean; isDucking: boolean; duckTransition: number }>({
    x: 120,
    y: GAME_CONFIG.DINO_GROUND_Y,
    width: GAME_CONFIG.DINO_WIDTH,
    height: GAME_CONFIG.DINO_HEIGHT,
    velocityY: 0,
    isJumping: false,
    isDucking: false,
    duckTransition: 0
  });
  
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const cloudsRef = useRef<Array<{x: number, y: number, size: number, depth: number}>>([]);

  // Initialize clouds with depth for 3D effect
  useEffect(() => {
    cloudsRef.current = Array.from({length: 8}, (_, i) => ({
      x: i * 200,
      y: 80 + Math.random() * 120,
      size: 40 + Math.random() * 30,
      depth: 0.3 + Math.random() * 0.7
    }));
  }, []);

  const jump = useCallback(() => {
    if (!dinoRef.current.isJumping && gameState === 'playing') {
      dinoRef.current.velocityY = GAME_CONFIG.JUMP_FORCE;
      dinoRef.current.isJumping = true;
      dinoRef.current.isDucking = false;
      dinoRef.current.duckTransition = 0;
    }
  }, [gameState]);

  const duck = useCallback((isDucking: boolean) => {
    if (gameState === 'playing' && !dinoRef.current.isJumping) {
      dinoRef.current.isDucking = isDucking;
      
      // Smooth transition animation
      const targetTransition = isDucking ? 1 : 0;
      const transitionSpeed = 0.2;
      
      const animateTransition = () => {
        const current = dinoRef.current.duckTransition;
        const diff = targetTransition - current;
        
        if (Math.abs(diff) > 0.01) {
          dinoRef.current.duckTransition += diff * transitionSpeed;
          requestAnimationFrame(animateTransition);
        } else {
          dinoRef.current.duckTransition = targetTransition;
        }
        
        // Update dimensions based on transition
        const normalHeight = GAME_CONFIG.DINO_HEIGHT;
        const duckHeight = normalHeight * 0.5;
        dinoRef.current.height = normalHeight - (normalHeight - duckHeight) * dinoRef.current.duckTransition;
        dinoRef.current.y = GAME_CONFIG.DINO_GROUND_Y + (normalHeight - dinoRef.current.height);
      };
      
      animateTransition();
    }
  }, [gameState]);

  const checkCollision = useCallback((dino: GameObject, obstacle: GameObject): boolean => {
    const margin = 8;
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
      const shouldSpawn = Math.random() < 0.4;
      if (shouldSpawn) {
        const obstacleType: 'cactus' | 'bird' = Math.random() < 0.6 ? 'cactus' : 'bird';
        const obstacle: Obstacle = {
          id: Date.now(),
          type: obstacleType,
          x: GAME_CONFIG.CANVAS_WIDTH,
          y: obstacleType === 'bird' ? 
             GAME_CONFIG.DINO_GROUND_Y - 80 - Math.random() * 60 : 
             GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT - GAME_CONFIG.OBSTACLE_HEIGHT,
          width: obstacleType === 'bird' ? GAME_CONFIG.BIRD_WIDTH : GAME_CONFIG.OBSTACLE_WIDTH,
          height: obstacleType === 'bird' ? GAME_CONFIG.BIRD_HEIGHT : GAME_CONFIG.OBSTACLE_HEIGHT
        };
        obstaclesRef.current.push(obstacle);
        lastObstacleX.current = GAME_CONFIG.CANVAS_WIDTH;
      }
    }
  }, []);

  const draw3DShadow = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, depth: number = 5) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(x + depth, y + depth, width, height);
  }, []);

  const drawDino = useCallback((ctx: CanvasRenderingContext2D, dino: typeof dinoRef.current) => {
    ctx.save();
    
    // 3D Shadow
    draw3DShadow(ctx, dino.x, dino.y, dino.width, dino.height, 8);
    
    // Dino body with 3D gradient
    const gradient = ctx.createLinearGradient(dino.x, dino.y, dino.x + dino.width, dino.y + dino.height);
    gradient.addColorStop(0, '#22d3ee');
    gradient.addColorStop(0.5, '#0891b2');
    gradient.addColorStop(1, '#164e63');
    
    ctx.fillStyle = gradient;
    
    if (dino.isDucking || dino.duckTransition > 0) {
      // Enhanced ducking animation with smooth transition
      const duckAmount = dino.duckTransition;
      const bodyWidth = dino.width + (15 * duckAmount);
      const bodyHeight = dino.height;
      
      ctx.fillRect(dino.x, dino.y, bodyWidth, bodyHeight);
      
      // Eye positioned for ducking
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dino.x + bodyWidth * 0.7, dino.y + bodyHeight * 0.2, 10, 6);
      ctx.fillStyle = '#000000';
      ctx.fillRect(dino.x + bodyWidth * 0.72, dino.y + bodyHeight * 0.22, 6, 3);
      
      // Motion lines for ducking effect
      ctx.strokeStyle = '#0891b2';
      ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(dino.x - 20 - i * 10, dino.y + 10 + i * 8);
        ctx.lineTo(dino.x - 5 - i * 10, dino.y + 15 + i * 8);
        ctx.stroke();
      }
    } else {
      // Standing dino with 3D effect
      ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
      
      // 3D highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(dino.x, dino.y, dino.width * 0.3, dino.height);
      
      // Eye with 3D effect
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(dino.x + 25, dino.y + 15, 12, 8);
      ctx.fillStyle = '#000000';
      ctx.fillRect(dino.x + 27, dino.y + 17, 8, 4);
      
      // Animated legs with perspective
      const legOffset = Math.sin(Date.now() * 0.015) * 3;
      const perspectiveOffset = 2;
      
      ctx.fillStyle = gradient;
      // Left leg with perspective
      ctx.fillRect(dino.x + 8, dino.y + dino.height, 8, 12 + legOffset);
      ctx.fillRect(dino.x + 8 + perspectiveOffset, dino.y + dino.height + perspectiveOffset, 8, 12 + legOffset);
      
      // Right leg with perspective
      ctx.fillRect(dino.x + 25, dino.y + dino.height, 8, 12 - legOffset);
      ctx.fillRect(dino.x + 25 + perspectiveOffset, dino.y + dino.height + perspectiveOffset, 8, 12 - legOffset);
    }
    
    ctx.restore();
  }, [draw3DShadow]);

  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obstacle: Obstacle) => {
    ctx.save();
    
    // 3D Shadow with depth
    draw3DShadow(ctx, obstacle.x, obstacle.y, obstacle.width, obstacle.height, 10);
    
    if (obstacle.type === 'cactus') {
      // 3D Cactus with enhanced visual effects
      const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y);
      gradient.addColorStop(0, '#16a34a');
      gradient.addColorStop(0.5, '#22c55e');
      gradient.addColorStop(1, '#15803d');
      ctx.fillStyle = gradient;
      
      // Main body with 3D effect
      ctx.fillRect(obstacle.x + 12, obstacle.y, 16, obstacle.height);
      // 3D highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(obstacle.x + 12, obstacle.y, 4, obstacle.height);
      
      // Arms with 3D depth
      ctx.fillStyle = gradient;
      ctx.fillRect(obstacle.x, obstacle.y + 20, 12, 20);
      ctx.fillRect(obstacle.x + 28, obstacle.y + 15, 12, 25);
      
      // 3D spikes
      ctx.fillStyle = '#166534';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(obstacle.x + 10 + i * 8, obstacle.y + 8 + i * 12, 3, 6);
        ctx.fillRect(obstacle.x + 12 + i * 8, obstacle.y + 10 + i * 12, 3, 6);
      }
    } else {
      // 3D Bird with wing animation and depth
      const gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x + obstacle.width, obstacle.y);
      gradient.addColorStop(0, '#dc2626');
      gradient.addColorStop(0.5, '#ef4444');
      gradient.addColorStop(1, '#b91c1c');
      ctx.fillStyle = gradient;
      
      // Body with 3D effect
      ctx.fillRect(obstacle.x + 15, obstacle.y + 10, 20, 15);
      // 3D highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(obstacle.x + 15, obstacle.y + 10, 5, 15);
      
      // Animated wings with 3D perspective
      const wingFlap = Math.sin(Date.now() * 0.025) * 8;
      const wingDepth = 3;
      
      ctx.fillStyle = gradient;
      // Left wing layers for 3D effect
      ctx.fillRect(obstacle.x + 5, obstacle.y + wingFlap, 15, 12);
      ctx.fillRect(obstacle.x + 5 + wingDepth, obstacle.y + wingFlap + wingDepth, 15, 12);
      
      // Right wing layers
      ctx.fillRect(obstacle.x + 25, obstacle.y - wingFlap, 15, 12);
      ctx.fillRect(obstacle.x + 25 + wingDepth, obstacle.y - wingFlap + wingDepth, 15, 12);
      
      // Beak with 3D effect
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(obstacle.x + 35, obstacle.y + 15, 8, 5);
      ctx.fillRect(obstacle.x + 37, obstacle.y + 17, 8, 5);
    }
    
    ctx.restore();
  }, [draw3DShadow]);

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Enhanced 3D cyberpunk background
    const skyGradient = ctx.createRadialGradient(
      GAME_CONFIG.CANVAS_WIDTH / 2, 0, 0,
      GAME_CONFIG.CANVAS_WIDTH / 2, GAME_CONFIG.CANVAS_HEIGHT, GAME_CONFIG.CANVAS_HEIGHT
    );
    skyGradient.addColorStop(0, '#1e1b4b');
    skyGradient.addColorStop(0.3, '#312e81');
    skyGradient.addColorStop(0.7, '#1f2937');
    skyGradient.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    
    // 3D Grid with perspective
    ctx.strokeStyle = 'rgba(212, 9, 93, 0.3)';
    ctx.lineWidth = 1;
    const gridSize = 60;
    const perspective = 0.8;
    
    for (let i = 0; i < GAME_CONFIG.CANVAS_WIDTH; i += gridSize) {
      const perspectiveOffset = (i / GAME_CONFIG.CANVAS_WIDTH) * 20;
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + perspectiveOffset, GAME_CONFIG.CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < GAME_CONFIG.CANVAS_HEIGHT; i += gridSize) {
      const alpha = 0.3 * (1 - i / GAME_CONFIG.CANVAS_HEIGHT);
      ctx.strokeStyle = `rgba(212, 9, 93, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, i * perspective);
      ctx.stroke();
    }
    
    // 3D Clouds with parallax and depth
    cloudsRef.current.forEach(cloud => {
      const speed = 0.2 + (1 - cloud.depth) * 0.3;
      cloud.x -= speed;
      if (cloud.x + cloud.size < 0) {
        cloud.x = GAME_CONFIG.CANVAS_WIDTH + Math.random() * 200;
        cloud.y = 50 + Math.random() * 100;
      }
      
      const alpha = 0.2 + cloud.depth * 0.3;
      const size = cloud.size * cloud.depth;
      
      ctx.fillStyle = `rgba(212, 9, 93, ${alpha})`;
      ctx.shadowColor = '#D4095D';
      ctx.shadowBlur = 15 * cloud.depth;
      
      // Multiple cloud layers for 3D effect
      for (let layer = 0; layer < 3; layer++) {
        const layerOffset = layer * 2;
        const layerSize = size * (1 - layer * 0.1);
        ctx.beginPath();
        ctx.arc(cloud.x + layerOffset, cloud.y + layerOffset, layerSize * 0.4, 0, Math.PI * 2);
        ctx.arc(cloud.x + layerSize * 0.3 + layerOffset, cloud.y + layerOffset, layerSize * 0.3, 0, Math.PI * 2);
        ctx.arc(cloud.x + layerSize * 0.6 + layerOffset, cloud.y + layerOffset, layerSize * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.shadowBlur = 0;
    
    // Enhanced 3D ground with perspective
    const groundGradient = ctx.createLinearGradient(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT, 0, GAME_CONFIG.CANVAS_HEIGHT);
    groundGradient.addColorStop(0, '#2d1b4e');
    groundGradient.addColorStop(0.5, '#1e1b4b');
    groundGradient.addColorStop(1, '#0f0f0f');
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    
    // 3D Ground line with depth
    for (let depth = 0; depth < 3; depth++) {
      ctx.strokeStyle = `rgba(212, 9, 93, ${0.8 - depth * 0.2})`;
      ctx.lineWidth = 4 - depth;
      ctx.shadowColor = '#D4095D';
      ctx.shadowBlur = 20 - depth * 5;
      ctx.setLineDash([20, 15]);
      ctx.beginPath();
      ctx.moveTo(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT + depth * 2);
      ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT + depth * 2);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.shadowBlur = 0;
  }, []);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx);

    gameSpeedRef.current = Math.min(
      GAME_CONFIG.MAX_SPEED,
      GAME_CONFIG.INITIAL_SPEED + scoreRef.current * GAME_CONFIG.SPEED_INCREMENT
    );

    const dino = dinoRef.current;
    dino.velocityY += GAME_CONFIG.GRAVITY;
    dino.y += dino.velocityY;

    // Smoother landing detection with small buffer
    if (dino.y >= GAME_CONFIG.DINO_GROUND_Y - 2) {
      dino.y = GAME_CONFIG.DINO_GROUND_Y;
      dino.velocityY = 0;
      dino.isJumping = false;
    }

    drawDino(ctx, dino);

    spawnObstacle();
    lastObstacleX.current -= gameSpeedRef.current;

    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= gameSpeedRef.current;
      
      drawObstacle(ctx, obstacle);
      
      if (checkCollision(dino, obstacle)) {
        setGameState('gameOver');
        if (scoreRef.current > highScore) {
          const newHighScore = scoreRef.current;
          setHighScore(newHighScore);
          localStorage.setItem('dino-high-score', newHighScore.toString());
        }
        return false;
      }
      
      if (obstacle.x + obstacle.width < 0) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        return false;
      }
      
      return true;
    });

    // Enhanced UI with 3D effects
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowColor = '#D4095D';
    ctx.shadowBlur = 10;
    ctx.font = 'bold 28px Arial';
    ctx.fillText(`Score: ${scoreRef.current}`, 30, 50);
    ctx.fillText(`Best: ${highScore}`, 30, 85);
    ctx.fillText(`Speed: ${gameSpeedRef.current.toFixed(1)}x`, 30, 120);
    ctx.shadowBlur = 0;

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
      x: 120,
      y: GAME_CONFIG.DINO_GROUND_Y,
      width: GAME_CONFIG.DINO_WIDTH,
      height: GAME_CONFIG.DINO_HEIGHT,
      velocityY: 0,
      isJumping: false,
      isDucking: false,
      duckTransition: 0
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
    <div className="min-h-screen bg-gradient-to-br from-neon-dark via-neon-darkpurple to-black relative overflow-hidden pt-20">
      {/* Enhanced cyber background pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-red via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_45deg,_var(--tw-gradient-stops))] from-neon-purple via-transparent to-neon-pink opacity-30"></div>
      </div>
      
      <div className="relative z-10 max-w-8xl mx-auto p-6">
        {/* Enhanced Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-neon-red via-neon-pink to-neon-purple bg-clip-text text-transparent mb-6 animate-pulse-neon drop-shadow-2xl">
            🦕 CYBER DINO NEXUS
          </h1>
          <p className="text-xl text-white/80 neon-text mb-4">
            Experience the Ultimate 3D Cyberpunk Dino Adventure
          </p>
          <div className="flex justify-center gap-4 text-lg text-white/60">
            <span className="px-4 py-2 bg-neon-red/20 border border-neon-red rounded-lg">SPACE/↑ Jump</span>
            <span className="px-4 py-2 bg-neon-pink/20 border border-neon-pink rounded-lg">↓ Duck</span>
          </div>
        </div>

        {/* Game Container with 3D effects */}
        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="relative perspective-1000">
              <canvas
                ref={canvasRef}
                width={GAME_CONFIG.CANVAS_WIDTH}
                height={GAME_CONFIG.CANVAS_HEIGHT}
                className="rounded-3xl border-4 border-neon-red shadow-[0_0_50px_rgba(212,9,93,0.8)] bg-black transform-gpu"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(212, 9, 93, 0.5))',
                  transform: 'rotateX(2deg)',
                  transformStyle: 'preserve-3d'
                }}
              />
              
              {/* Game Controls - Top Right of Canvas */}
              <div className="absolute top-6 right-6 flex gap-3 z-20">
                {gameState === 'stopped' && (
                  <Button 
                    onClick={startGame} 
                    className="neon-button text-sm px-6 py-3 bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all duration-300 shadow-lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    START GAME
                  </Button>
                )}
                
                {gameState === 'playing' && (
                  <Button 
                    onClick={pauseGame} 
                    className="neon-button text-sm px-6 py-3 bg-transparent border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white transition-all duration-300 shadow-lg"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    PAUSE
                  </Button>
                )}
                
                {gameState === 'paused' && (
                  <>
                    <Button 
                      onClick={resumeGame} 
                      className="neon-button text-sm px-5 py-3 bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all duration-300 shadow-lg"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      RESUME
                    </Button>
                    <Button 
                      onClick={stopGame} 
                      className="text-sm px-5 py-3 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
                    >
                      <Square className="w-4 h-4 mr-1" />
                      STOP
                    </Button>
                  </>
                )}
              </div>

              {/* Enhanced Game Over Overlay */}
              {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-black/90 rounded-3xl flex items-center justify-center backdrop-blur-md">
                  <div className="text-center p-12 bg-gradient-to-br from-neon-red/30 to-neon-purple/30 rounded-2xl border-2 border-neon-red/50 backdrop-blur-sm shadow-2xl">
                    <h2 className="text-6xl font-bold text-neon-red mb-6 animate-pulse-neon drop-shadow-lg">GAME OVER</h2>
                    <p className="text-3xl mb-6 text-white">Final Score: <span className="font-bold text-neon-pink">{score}</span></p>
                    {score === highScore && score > 0 && (
                      <p className="text-2xl text-neon-pink mb-6 animate-pulse">🏆 LEGENDARY RECORD! 🏆</p>
                    )}
                    <Button 
                      onClick={startGame} 
                      className="neon-button px-8 py-4 bg-transparent border-2 border-neon-red text-neon-red hover:bg-neon-red hover:text-white transition-all duration-300 text-lg shadow-xl"
                    >
                      <RotateCcw className="w-6 h-6 mr-3" />
                      RETRY MISSION
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Stats Panel */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-8 p-8 bg-black/50 rounded-2xl border-2 border-neon-red/30 backdrop-blur-sm shadow-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-neon-red drop-shadow-lg">{score}</div>
                <div className="text-lg text-white/70">Current Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-neon-pink drop-shadow-lg">{highScore}</div>
                <div className="text-lg text-white/70">Best Record</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-neon-purple drop-shadow-lg">{gameSpeedRef.current.toFixed(1)}x</div>
                <div className="text-lg text-white/70">Speed Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Controls Info */}
        <div className="text-center mt-12">
          <div className="inline-block p-8 bg-black/50 rounded-2xl border-2 border-neon-purple/30 backdrop-blur-sm shadow-xl">
            <h3 className="text-2xl font-bold text-neon-purple mb-6 drop-shadow-lg">NEXUS CONTROLS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
              <div className="flex items-center justify-center gap-4">
                <div className="flex gap-2">
                  <span className="px-4 py-3 bg-neon-red/20 border-2 border-neon-red rounded-xl font-mono text-neon-red text-lg">SPACE</span>
                  <span className="text-white/60 text-xl">or</span>
                  <span className="px-4 py-3 bg-neon-red/20 border-2 border-neon-red rounded-xl font-mono text-neon-red text-lg">↑</span>
                </div>
                <span className="text-neon-red font-bold text-lg">QUANTUM JUMP</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <span className="px-4 py-3 bg-neon-pink/20 border-2 border-neon-pink rounded-xl font-mono text-neon-pink text-lg">↓</span>
                <span className="text-neon-pink font-bold text-lg">STEALTH DUCK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoGamePage;
