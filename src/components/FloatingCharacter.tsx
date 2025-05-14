
import { useEffect, useState } from "react";

interface FloatingCharacterProps {
  imageUrl?: string;
}

const FloatingCharacter = ({ 
  imageUrl = "/My-Media/img/character.png" // Image par défaut
}: FloatingCharacterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, edge: 0 });
  
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
    
    return { x, y, edge };
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
  
  // Crée un style d'animation personnalisé
  const createCustomAnimation = (startPos: {x: number, y: number}, edge: number) => {
    const exitPos = getExitPosition(edge);
    
    return {
      animation: `custom-character-move 10s linear forwards`,
      position: 'absolute' as const,
      left: `${startPos.x}%`,
      top: `${startPos.y}%`,
      transform: 'translate(-50%, -50%)',
    };
  };
  
  useEffect(() => {
    // Fonction pour afficher le personnage
    const showCharacter = () => {
      const newPosition = getRandomPosition();
      setPosition(newPosition);
      setIsVisible(true);
      
      // Cacher après l'animation
      setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Correspondant à la durée de l'animation
    };
    
    // Apparition initiale
    const initialTimeout = setTimeout(showCharacter, 2000);
    
    // Configurer l'intervalle pour les apparitions récurrentes
    const interval = setInterval(() => {
      if (!isVisible) {
        showCharacter();
      }
    }, Math.random() * 5000 + 5000); // Entre 5 et 10 secondes
    
    // Ajouter une feuille de style pour l'animation personnalisée
    const styleSheet = document.createElement("style");
    const exitPos = getExitPosition(position.edge);
    
    styleSheet.innerText = `
      @keyframes custom-character-move {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        10% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(5deg); }
        90% { opacity: 1; transform: translate(${exitPos.x}%, ${exitPos.y}%) scale(1) rotate(-5deg); }
        100% { opacity: 0; transform: translate(${exitPos.x}%, ${exitPos.y}%) scale(0.8); }
      }
    `;
    document.head.appendChild(styleSheet);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      document.head.removeChild(styleSheet);
    };
  }, [isVisible, position]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed z-50 pointer-events-none" style={{width: "100%", height: "100%"}}>
      <img 
        src={imageUrl}
        alt="Character"
        className="w-20 h-20 object-contain"
        style={createCustomAnimation(position, position.edge)}
      />
    </div>
  );
};

export default FloatingCharacter;
