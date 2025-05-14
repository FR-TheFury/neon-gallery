
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
  
  // Réduire le nombre de personnages sur mobile
  const actualCount = isMobile ? Math.min(count, 1) : count;
  
  // Préchargement de l'image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log("Character image successfully preloaded!");
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load character image");
      // Essai avec un timestamp pour éviter les problèmes de cache
      img.src = `${imageUrl}?t=${Date.now()}`;
    };
  }, [imageUrl]);
  
  // Initialisation des personnages
  useEffect(() => {
    if (!imageLoaded) return;
    
    const initialCharacters: CharacterPosition[] = [];
    
    for (let i = 0; i < actualCount; i++) {
      initialCharacters.push({
        id: Date.now() + Math.random(),
        x: Math.random() * 100, // Position x aléatoire (en pourcentage de la fenêtre)
        y: Math.random() * 100, // Position y aléatoire (en pourcentage de la fenêtre)
        scale: 0.8 + Math.random() * 0.4, // Scale entre 0.8 et 1.2
        rotation: Math.random() * 360, // Rotation aléatoire
        speed: 0.05 + Math.random() * 0.05, // Vitesse entre 0.05 et 0.1 % par frame
        direction: {
          x: Math.random() > 0.5 ? 1 : -1, // Direction horizontale aléatoire
          y: Math.random() > 0.5 ? 1 : -1, // Direction verticale aléatoire
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
  
  // Animation des personnages
  useEffect(() => {
    if (!imageLoaded || characters.length === 0) return;
    
    const animate = () => {
      setCharacters(prevChars => 
        prevChars.map(char => {
          // Mise à jour de la position
          let newX = char.x + (char.speed * char.direction.x);
          let newY = char.y + (char.speed * char.direction.y);
          let newDirX = char.direction.x;
          let newDirY = char.direction.y;
          
          // Rebond sur les bords
          if (newX <= 0 || newX >= 100) {
            newDirX *= -1;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY <= 0 || newY >= 100) {
            newDirY *= -1;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          // Légère variation de rotation
          const newRotation = (char.rotation + (Math.random() - 0.5) * 2) % 360;
          
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
            className="w-20 h-20"
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
