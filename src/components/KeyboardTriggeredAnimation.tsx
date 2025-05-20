
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from "@/components/ui/sonner";

interface KeyboardTriggeredAnimationProps {
  triggerKey?: string;
  cooldownTime?: number; // in milliseconds
  gifUrl?: string;
  quote?: string;
  goodbyeQuote?: string; // Added new prop for goodbye message
}

export function KeyboardTriggeredAnimation({
  triggerKey = 'h',
  cooldownTime = 60000, // 1 minute default
  gifUrl = '/image/hello.gif',
  quote = 'Coucou ! Je te vois !',
  goodbyeQuote = 'Au revoir ! À bientôt !' // Default goodbye message
}: KeyboardTriggeredAnimationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [isGifLoaded, setIsGifLoaded] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const gifRef = useRef<HTMLImageElement>(null);
  const cooldownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const quoteTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
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
        // Clear any existing timeouts to prevent conflicts
        if (quoteTimeoutRef.current) clearTimeout(quoteTimeoutRef.current);
        if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
        
        // Reset states and show animation
        setShowAnimation(true);
        setIsFadingOut(false);
        setCurrentQuote(quote);
        
        console.log("Animation triggered, showing initial quote:", quote);
        
        // Change quote halfway through - using a separate function to ensure state update
        quoteTimeoutRef.current = setTimeout(() => {
          console.log("Changing quote to:", goodbyeQuote);
          setCurrentQuote(goodbyeQuote);
        }, 2500); // Half of total display time
        
        // Start fade-out animation 1 second before hiding
        fadeOutTimeoutRef.current = setTimeout(() => {
          console.log("Starting fade-out animation");
          setIsFadingOut(true);
        }, 4000);
        
        // Auto-hide animation after 5 seconds
        setTimeout(() => {
          console.log("Hiding animation");
          setShowAnimation(false);
        }, 5000);
        
        // Set cooldown
        setIsCooldown(true);
        
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
  }, [triggerKey, isCooldown, isGifLoaded, cooldownTime, quote, goodbyeQuote]);
  
  // Add and remove event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      // Clear any timeouts on unmount
      if (cooldownTimeoutRef.current) {
        clearTimeout(cooldownTimeoutRef.current);
      }
      if (quoteTimeoutRef.current) {
        clearTimeout(quoteTimeoutRef.current);
      }
      if (fadeOutTimeoutRef.current) {
        clearTimeout(fadeOutTimeoutRef.current);
      }
    };
  }, [handleKeyPress]);
  
  // Only render if animation is showing
  if (!showAnimation) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end">
      <div className={`character-animate ${isFadingOut ? 'animate-fade-out' : 'animate-slide-in-wave'}`}>
        <div className="relative flex flex-col items-end">
          <div className="bg-black/80 border border-neon-red p-2 rounded-md shadow-[0_0_10px_rgba(212,9,93,0.5)] max-w-xs mb-2">
            <p className="text-white text-center text-sm">{currentQuote}</p>
          </div>
          <img 
            ref={gifRef}
            src={gifUrl} 
            alt="Animation" 
            className="w-auto h-64 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default KeyboardTriggeredAnimation;
