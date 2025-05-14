
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingCharacterProps {
  imageUrl?: string;
  count?: number;
}

interface CharacterPosition {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  speed: number;
  direction: {
    x: number;
    y: number;
  };
}

const FloatingCharacter = ({
  imageUrl = "/src/image/character.png",
  count = 2
}: FloatingCharacterProps) => {
  const [characters, setCharacters] = useState<CharacterPosition[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  
  // Reduce character count on mobile
  const actualCount = isMobile ? Math.min(count, 1) : count;
  
  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log("Character image successfully preloaded!");
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load character image");
      // Try with a public URL fallback
      const fallbackUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50";
      img.src = fallbackUrl;
    };
  }, [imageUrl]);
  
  // Initialize characters
  useEffect(() => {
    if (!imageLoaded) return;
    
    const initialCharacters: CharacterPosition[] = [];
    
    for (let i = 0; i < actualCount; i++) {
      initialCharacters.push({
        id: Date.now() + Math.random(),
        x: Math.random() * 100, // Random x position (as percentage of window)
        y: Math.random() * 100, // Random y position (as percentage of window)
        scale: 0.5 + Math.random() * 0.3, // Scale between 0.5 and 0.8 (smaller)
        rotation: Math.random() * 360, // Random rotation
        speed: 0.1 + Math.random() * 0.1, // Speed between 0.1 and 0.2 (faster)
        direction: {
          x: Math.random() > 0.5 ? 1 : -1, // Random horizontal direction
          y: Math.random() > 0.5 ? 1 : -1, // Random vertical direction
        }
      });
    }
    
    setCharacters(initialCharacters);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageLoaded, actualCount]);
  
  // Animate characters
  useEffect(() => {
    if (!imageLoaded || characters.length === 0) return;
    
    const animate = () => {
      setCharacters(prevChars => 
        prevChars.map(char => {
          // Update position
          let newX = char.x + (char.speed * char.direction.x);
          let newY = char.y + (char.speed * char.direction.y);
          let newDirX = char.direction.x;
          let newDirY = char.direction.y;
          
          // Bounce off edges
          if (newX <= 0 || newX >= 100) {
            newDirX *= -1;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY <= 0 || newY >= 100) {
            newDirY *= -1;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          // Calculate rotation based on movement direction
          // This makes the character face in the direction it's moving
          let newRotation = Math.atan2(newDirY, newDirX) * (180 / Math.PI);
          
          return {
            ...char,
            x: newX,
            y: newY,
            rotation: newRotation,
            direction: {
              x: newDirX,
              y: newDirY
            }
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageLoaded, characters.length]);
  
  if (!imageLoaded) {
    return null;
  }
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-50"
      style={{ willChange: 'transform' }}
    >
      {characters.map((character) => (
        <div 
          key={character.id} 
          className="absolute character-animate"
          style={{
            left: `${character.x}%`,
            top: `${character.y}%`,
            transform: `translate(-50%, -50%) scale(${character.scale}) rotate(${character.rotation}deg)`,
            willChange: 'transform',
            zIndex: 9999,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img 
            src={imageUrl}
            alt="Floating Character"
            className="w-16 h-16" /* Smaller size (was w-20 h-20) */
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 128, 0.7))',
              animation: 'floating-glow 1.5s ease-in-out infinite'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingCharacter;
