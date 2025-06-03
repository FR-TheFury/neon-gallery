import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  id: number;
}

const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 200,
  DINO_WIDTH: 20,
  DINO_HEIGHT: 40,
  DINO_GROUND_Y: 140,
  OBSTACLE_WIDTH: 15,
  OBSTACLE_HEIGHT: 30,
  JUMP_FORCE: -12,
  GRAVITY: 0.6,
  GAME_SPEED: 3,
  OBSTACLE_SPAWN_RATE: 0.02
};

const DinoGamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  
  const [gameState, setGameState] = useState<'stopped' | 'playing' | 'paused' | 'gameOver'>('stopped');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const dinoRef = useRef<GameObject & { velocityY: number; isJumping: boolean }>({
    x: 50,
    y: GAME_CONFIG.DINO_GROUND_Y,
    width: GAME_CONFIG.DINO_WIDTH,
    height: GAME_CONFIG.DINO_HEIGHT,
    velocityY: 0,
    isJumping: false
  });
  
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);

  const jump = useCallback(() => {
    if (!dinoRef.current.isJumping && gameState === 'playing') {
      dinoRef.current.velocityY = GAME_CONFIG.JUMP_FORCE;
      dinoRef.current.isJumping = true;
    }
  }, [gameState]);

  const checkCollision = useCallback((dino: GameObject, obstacle: GameObject): boolean => {
    return (
      dino.x < obstacle.x + obstacle.width &&
      dino.x + dino.width > obstacle.x &&
      dino.y < obstacle.y + obstacle.height &&
      dino.y + dino.height > obstacle.y
    );
  }, []);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

    // Draw ground line
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT);
    ctx.lineTo(GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT);
    ctx.stroke();

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
    ctx.fillStyle = '#333';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

    // Spawn obstacles
    if (Math.random() < GAME_CONFIG.OBSTACLE_SPAWN_RATE) {
      obstaclesRef.current.push({
        id: Date.now(),
        x: GAME_CONFIG.CANVAS_WIDTH,
        y: GAME_CONFIG.DINO_GROUND_Y + GAME_CONFIG.DINO_HEIGHT - GAME_CONFIG.OBSTACLE_HEIGHT,
        width: GAME_CONFIG.OBSTACLE_WIDTH,
        height: GAME_CONFIG.OBSTACLE_HEIGHT
      });
    }

    // Update and draw obstacles
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.x -= GAME_CONFIG.GAME_SPEED;
      
      // Draw obstacle
      ctx.fillStyle = '#d4095d';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      
      // Check collision
      if (checkCollision(dino, obstacle)) {
        setGameState('gameOver');
        if (scoreRef.current > highScore) {
          setHighScore(scoreRef.current);
        }
        return false;
      }
      
      // Remove off-screen obstacles and increment score
      if (obstacle.x + obstacle.width < 0) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        return false;
      }
      
      return true;
    });

    // Draw score
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);
    ctx.fillText(`High Score: ${highScore}`, 10, 55);

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(updateGame);
    }
  }, [gameState, highScore, checkCollision]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    obstaclesRef.current = [];
    dinoRef.current = {
      x: 50,
      y: GAME_CONFIG.DINO_GROUND_Y,
      width: GAME_CONFIG.DINO_WIDTH,
      height: GAME_CONFIG.DINO_HEIGHT,
      velocityY: 0,
      isJumping: false
    };
  };

  const pauseGame = () => {
    setGameState('paused');
  };

  const resumeGame = () => {
    setGameState('playing');
  };

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
      if (event.code === 'Space') {
        event.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-neon-red mb-4">🦕 Dino Runner</h1>
          <p className="text-lg text-muted-foreground">
            Press SPACE to jump over obstacles!
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={GAME_CONFIG.CANVAS_WIDTH}
            height={GAME_CONFIG.CANVAS_HEIGHT}
            className="border-2 border-neon-red rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {gameState === 'stopped' && (
            <Button onClick={startGame} className="neon-button">
              <Play className="w-4 h-4 mr-2" />
              Start Game
            </Button>
          )}
          
          {gameState === 'playing' && (
            <Button onClick={pauseGame} className="neon-button">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          {gameState === 'paused' && (
            <>
              <Button onClick={resumeGame} className="neon-button">
                <Play className="w-4 h-4 mr-2" />
                Resume
              </Button>
              <Button onClick={stopGame} variant="destructive">
                <Square className="w-4 h-4 mr-2" />
                Stop
              </Button>
            </>
          )}
          
          {(gameState === 'playing' || gameState === 'paused') && (
            <Button onClick={stopGame} variant="destructive">
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          )}
        </div>

        {gameState === 'gameOver' && (
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-destructive mb-4">Game Over!</h2>
            <p className="text-lg mb-4">Final Score: {score}</p>
            <Button onClick={startGame} className="neon-button">
              Play Again
            </Button>
          </div>
        )}

        <div className="text-center text-sm text-muted-foreground">
          <p>Use SPACE to jump • Avoid the pink obstacles • Beat your high score!</p>
        </div>
      </div>
    </div>
  );
};

export default DinoGamePage;
