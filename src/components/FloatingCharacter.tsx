
import { useEffect, useState, useRef } from "react";

interface FloatingCharacterProps {
  imageUrl?: string;
  count?: number;
}

interface CharacterPosition {
  id: number;
  x: number;
  y: number;
  destinationX: number;
  destinationY: number;
  duration: number;
}

const FloatingCharacter = ({
  imageUrl = "/src/image/character.png",
  count = 2
}: FloatingCharacterProps) => {
  const [characters, setCharacters] = useState<CharacterPosition[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log("Character image successfully preloaded!");
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error("Failed to load character image");
      // Try with a timestamp to avoid caching issues
      img.src = `${imageUrl}?t=${Date.now()}`;
    };
  }, [imageUrl]);
  
  // Function to generate random entry and exit points
  const generateRandomPath = () => {
    // Determine entry edge (0=top, 1=right, 2=bottom, 3=left)
    const entryEdge = Math.floor(Math.random() * 4);
    let entryX = 0, entryY = 0;
    
    // Calculate entry position
    switch(entryEdge) {
      case 0: // top
        entryX = Math.random() * 100;
        entryY = -10;
        break;
      case 1: // right
        entryX = 110;
        entryY = Math.random() * 100;
        break;
      case 2: // bottom
        entryX = Math.random() * 100;
        entryY = 110;
        break;
      case 3: // left
        entryX = -10;
        entryY = Math.random() * 100;
        break;
    }
    
    // Determine exit edge (different from entry)
    let exitEdge = (entryEdge + 2) % 4; // Get opposite side by default
    if (Math.random() > 0.5) {
      // Sometimes use an adjacent edge
      exitEdge = (exitEdge + (Math.random() > 0.5 ? 1 : 3)) % 4;
    }
    
    let exitX = 0, exitY = 0;
    
    // Calculate exit position
    switch(exitEdge) {
      case 0: // top
        exitX = Math.random() * 100;
        exitY = -10;
        break;
      case 1: // right
        exitX = 110;
        exitY = Math.random() * 100;
        break;
      case 2: // bottom
        exitX = Math.random() * 100;
        exitY = 110;
        break;
      case 3: // left
        exitX = -10;
        exitY = Math.random() * 100;
        break;
    }
    
    // Calculate a reasonable duration based on distance
    const distance = Math.sqrt(Math.pow(exitX - entryX, 2) + Math.pow(exitY - entryY, 2));
    const duration = 5000 + (distance * 50); // 5sec base + distance factor
    
    return {
      id: Date.now() + Math.random(), 
      x: entryX, 
      y: entryY,
      destinationX: exitX,
      destinationY: exitY,
      duration
    };
  };
  
  // Add a new character
  const addCharacter = () => {
    if (!imageLoaded || characters.length >= count) return;
    
    const newCharacter = generateRandomPath();
    
    setCharacters(prev => [...prev, newCharacter]);
    
    // Remove character after animation completes
    setTimeout(() => {
      setCharacters(prev => prev.filter(char => char.id !== newCharacter.id));
    }, newCharacter.duration);
  };
  
  // Initialization and interval for adding characters
  useEffect(() => {
    if (!imageLoaded) return;
    
    console.log("Starting character animations");
    
    // Add first character
    const initialTimeout = setTimeout(() => {
      addCharacter();
    }, 1000);
    
    // Add characters periodically
    const interval = setInterval(() => {
      addCharacter();
    }, 5000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [imageLoaded]);
  
  if (!imageLoaded) {
    return null;
  }
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-50"
    >
      {characters.map((character) => (
        <div key={character.id} className="absolute inset-0">
          <style>
            {`
            @keyframes character-move-${character.id} {
              0% { 
                opacity: 0; 
                transform: translate(${character.x}vw, ${character.y}vh) scale(0.8);
              }
              10% { 
                opacity: 1; 
                transform: translate(${character.x}vw, ${character.y}vh) scale(1) rotate(5deg);
              }
              90% { 
                opacity: 1; 
                transform: translate(${character.destinationX}vw, ${character.destinationY}vh) scale(1) rotate(-5deg);
              }
              100% { 
                opacity: 0; 
                transform: translate(${character.destinationX}vw, ${character.destinationY}vh) scale(0.8);
              }
            }
            `}
          </style>
          <img 
            src={imageUrl}
            alt="Floating Character"
            className="absolute character-animate"
            style={{
              width: '80px', 
              height: '80px',
              zIndex: 9999,
              animation: `character-move-${character.id} ${character.duration / 1000}s linear forwards`,
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 128, 0.7))'
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingCharacter;
