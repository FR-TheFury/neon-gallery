
import { useEffect, useState } from "react";

interface FloatingCharacterProps {
  imageUrl?: string;
  count?: number;
}

interface CharacterPosition {
  id: number;
  x: number;
  y: number;
  edge: number;
  exitPos: {x: number, y: number};
  duration: number;
}

const FloatingCharacter = ({ 
  imageUrl = "/My-Media/character.png", // Image stockée en local pour éviter les requêtes externes
  count = 2 // Nombre de personnages simultanés
}: FloatingCharacterProps) => {
  const [characters, setCharacters] = useState<CharacterPosition[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Précharger l'image pour garantir qu'elle est disponible avant l'animation
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = (e) => console.error("Erreur de chargement de l'image:", e);
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl]);
  
  // Fonction pour générer une position aléatoire
  const getRandomPosition = () => {
    // Décide d'une entrée aléatoire (haut, bas, gauche, droite)
    const edge = Math.floor(Math.random() * 4);
    let x = 0, y = 0; // Position par défaut
    
    switch(edge) {
      case 0: // Gauche
        x = -10;
        y = Math.random() * 80 + 10; // 10% à 90% de la hauteur
        break;
      case 1: // Droite
        x = 110;
        y = Math.random() * 80 + 10;
        break;
      case 2: // Haut
        x = Math.random() * 100;
        y = -10;
        break;
      case 3: // Bas
        x = Math.random() * 100;
        y = 110;
        break;
    }
    
    const exitPos = getExitPosition(edge);
    const duration = Math.random() * 5000 + 8000; // Entre 8 et 13 secondes
    
    return { 
      id: Date.now() + Math.random(), 
      x, 
      y, 
      edge, 
      exitPos,
      duration
    };
  };
  
  // Détermine la direction de sortie en fonction de l'entrée
  const getExitPosition = (entryEdge: number) => {
    // Directions opposées pour une traversée diagonale
    switch(entryEdge) {
      case 0: // Si entre par la gauche, sort par la droite ou en bas
        return Math.random() > 0.5 ? { x: 110, y: Math.random() * 100 } : { x: Math.random() * 100, y: 110 };
      case 1: // Si entre par la droite, sort par la gauche ou en haut
        return Math.random() > 0.5 ? { x: -10, y: Math.random() * 100 } : { x: Math.random() * 100, y: -10 };
      case 2: // Si entre par le haut, sort par le bas ou à droite
        return Math.random() > 0.5 ? { x: Math.random() * 100, y: 110 } : { x: 110, y: Math.random() * 100 };
      case 3: // Si entre par le bas, sort par le haut ou à gauche
        return Math.random() > 0.5 ? { x: Math.random() * 100, y: -10 } : { x: -10, y: Math.random() * 100 };
      default:
        return { x: 110, y: 50 };
    }
  };
  
  // Ajouter un nouveau personnage
  const addCharacter = () => {
    if (characters.length < count && imageLoaded) {
      const newPosition = getRandomPosition();
      setCharacters(prev => [...prev, newPosition]);
      
      // Supprimer après l'animation
      setTimeout(() => {
        setCharacters(prev => prev.filter(char => char.id !== newPosition.id));
      }, newPosition.duration);
    }
  };
  
  useEffect(() => {
    if (!imageLoaded) return;
    
    // Premier personnage
    const initialTimeout = setTimeout(() => addCharacter(), 1000);
    
    // Intervalle pour ajouter des personnages régulièrement
    const interval = setInterval(() => {
      addCharacter();
    }, 5000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [characters.length, count, imageLoaded]);
  
  // Crée un style d'animation personnalisé pour chaque personnage
  const createCustomAnimation = (character: CharacterPosition) => {
    return {
      animation: `custom-character-move-${character.id} ${character.duration / 1000}s linear forwards`,
      position: 'absolute' as const,
      left: `${character.x}%`,
      top: `${character.y}%`,
      transform: 'translate(-50%, -50%)',
      width: '80px',
      height: '80px',
      zIndex: 50
    };
  };
  
  if (!imageLoaded) return null;
  
  return (
    <div className="fixed w-full h-full pointer-events-none overflow-hidden">
      {characters.map((character) => (
        <div key={character.id} className="absolute" style={{width: "100%", height: "100%"}}>
          <style>
            {`
            @keyframes custom-character-move-${character.id} {
              0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
              10% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(5deg); }
              90% { opacity: 1; transform: translate(${character.exitPos.x}%, ${character.exitPos.y}%) scale(1) rotate(-5deg); }
              100% { opacity: 0; transform: translate(${character.exitPos.x}%, ${character.exitPos.y}%) scale(0.8); }
            }
            `}
          </style>
          <img 
            src={imageUrl}
            alt="Character"
            className="object-contain"
            style={createCustomAnimation(character)}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingCharacter;
