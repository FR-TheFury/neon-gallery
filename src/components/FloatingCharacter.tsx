
import { useEffect, useState } from "react";

interface FloatingCharacterProps {
  imageUrl?: string;
}

const FloatingCharacter = ({ 
  imageUrl = "/My-Media/img/character.png" // Default placeholder, replace with actual character image
}: FloatingCharacterProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show character every 1-2 seconds
    const showCharacter = () => {
      setIsVisible(true);
      
      // Hide after animation completes
      setTimeout(() => {
        setIsVisible(false);
      }, 10000); // Match animation duration
    };
    
    // Initial appearance
    const initialTimeout = setTimeout(showCharacter, 2000);
    
    // Set up interval for recurring appearances
    const interval = setInterval(() => {
      if (!isVisible) {
        showCharacter();
      }
    }, Math.random() * 1000 + 1000); // Random time between 1-2 seconds
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-1/2 left-0 z-50 pointer-events-none">
      <img 
        src={imageUrl}
        alt="Character"
        className="w-20 h-20 object-contain animate-character-move"
      />
    </div>
  );
};

export default FloatingCharacter;
