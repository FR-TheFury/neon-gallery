
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";

interface KeyboardTriggeredAnimationProps {
  triggerKey?: string;
  cooldownTime?: number; // in milliseconds
  gifUrl?: string;
  quote?: string;
}

export function KeyboardTriggeredAnimation({
  triggerKey = 'h',
  cooldownTime = 60000, // 1 minute default
  gifUrl = '/image/hello.gif',
  quote = 'Coucou ! Je te vois !'
}: KeyboardTriggeredAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isGifLoaded, setIsGifLoaded] = useState(false);
  const gifRef = useRef<HTMLImageElement>(null);
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Preload the GIF
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = gifUrl;
    preloadImage.onload = () => {
      setIsGifLoaded(true);
    };
    
    return () => {
      preloadImage.onload = null;
    };
  }, [gifUrl]);
  
  // Handle the key press event
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Check if the key pressed is the trigger key (case insensitive)
    if (event.key.toLowerCase() === triggerKey.toLowerCase()) {
      if (!isCooldown && isGifLoaded) {
        // Show animation
        setShowAnimation(true);
        
        // Set cooldown
        setIsCooldown(true);
        
        // Auto-hide animation after 5 seconds
        setTimeout(() => {
          setShowAnimation(false);
        }, 5000);
        
        // Reset cooldown after specified time
        cooldownTimeoutRef.current = setTimeout(() => {
          setIsCooldown(false);
          toast("Animation disponible à nouveau !", {
            duration: 3000,
          });
        }, cooldownTime);
      } else if (isCooldown) {
        toast("Animation en cooldown, veuillez attendre un moment", {
          duration: 3000,
        });
      }
    }
  }, [triggerKey, isCooldown, isGifLoaded, cooldownTime]);
  
  // Add and remove event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      // Clear any timeouts on unmount
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
    };
  }, [handleKeyPress]);
  
  // Only render if animation is showing
  if (!showAnimation) return null;
  
  return (
    <div className="fixed inset-y-0 right-0 z-50 flex items-center justify-end">
      <div className="character-animate animate-slide-in-wave">
        <div className="relative flex items-end">
          <img 
            ref={gifRef}
            src={gifUrl} 
            alt="Animation" 
            className="w-auto h-64 object-contain"
          />
          <div className="absolute -top-10 right-0 bg-black/80 border border-neon-red p-2 rounded-md shadow-[0_0_10px_rgba(212,9,93,0.5)] max-w-xs">
            <p className="text-white text-center text-sm">{quote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyboardTriggeredAnimation;
