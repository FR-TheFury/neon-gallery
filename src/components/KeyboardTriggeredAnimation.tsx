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
  // States for component
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [isGifLoaded, setIsGifLoaded] = useState<boolean>(false);
  const [currentQuote, setCurrentQuote] = useState<string>(quote);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  
  // Refs for tracking state in callbacks and storing timeouts
  const showAnimationRef = useRef<boolean>(false);
  const isCooldownRef = useRef<boolean>(false);
  const gifRef = useRef<HTMLImageElement>(null);
  const cooldownTimeoutRef = useRef<number | null>(null);
  const quoteTimeoutRef = useRef<number | null>(null);
  const fadeOutTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  
  // Keep ref in sync with state
  useEffect(() => {
    showAnimationRef.current = showAnimation;
  }, [showAnimation]);
  
  // Preload the GIF
  useEffect(() => {
    console.log("Preloading GIF:", gifUrl);
    const preloadImage = new Image();
    preloadImage.src = gifUrl;
    preloadImage.onload = () => {
      console.log("GIF preloaded successfully");
      setIsGifLoaded(true);
    };
    preloadImage.onerror = () => {
      console.error("Failed to load GIF");
    };
    
    return () => {
      preloadImage.onload = null;
      preloadImage.onerror = null;
    };
  }, [gifUrl]);
  
  // Clear all timeouts to prevent conflicts
  const clearAllTimeouts = useCallback(() => {
    console.log("Clearing all timeouts");
    
    if (quoteTimeoutRef.current) {
      window.clearTimeout(quoteTimeoutRef.current);
      quoteTimeoutRef.current = null;
    }
    
    if (fadeOutTimeoutRef.current) {
      window.clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
    
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    if (cooldownTimeoutRef.current) {
      window.clearTimeout(cooldownTimeoutRef.current);
      cooldownTimeoutRef.current = null;
    }
  }, []);
  
  // Reset animation state
  const resetAnimation = useCallback(() => {
    console.log("Resetting animation state");
    setIsFadingOut(false);
    setCurrentQuote(quote);
  }, [quote]);
  
  // Start animation with proper timing sequence
  const triggerAnimation = useCallback(() => {
    console.log("Starting animation sequence");
    
    // Clear existing timeouts
    clearAllTimeouts();
    
    // Reset and show animation
    resetAnimation();
    setShowAnimation(true);
    
    console.log("Animation triggered, showing initial quote:", quote);
    
    // Schedule quote change
    quoteTimeoutRef.current = window.setTimeout(() => {
      console.log("Changing quote to:", goodbyeQuote);
      setCurrentQuote(goodbyeQuote);
    }, 2500);
    
    // Schedule fade-out (starts 1 second before hiding)
    fadeOutTimeoutRef.current = window.setTimeout(() => {
      console.log("Starting fade-out animation");
      setIsFadingOut(true);
    }, 4000);
    
    // Schedule hide (after fade-out animation has time to complete)
    hideTimeoutRef.current = window.setTimeout(() => {
      console.log("Hiding animation completely");
      setShowAnimation(false);
    }, 6000); // Increased to allow fade-out to complete
    
    // Set cooldown
    isCooldownRef.current = true;
    
    // Schedule end of cooldown
    cooldownTimeoutRef.current = window.setTimeout(() => {
      console.log("Cooldown period ended");
      isCooldownRef.current = false;
      toast("Animation disponible à nouveau !", {
        duration: 3000,
      });
    }, cooldownTime);
    
  }, [quote, goodbyeQuote, cooldownTime, clearAllTimeouts, resetAnimation]);
  
  // Handle key press
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Check if the key pressed matches the trigger key (case insensitive)
    if (event.key.toLowerCase() === triggerKey.toLowerCase()) {
      console.log("Trigger key pressed, cooldown status:", isCooldownRef.current);
      
      if (!isCooldownRef.current && isGifLoaded) {
        console.log("Conditions met, triggering animation");
        triggerAnimation();
      } else if (isCooldownRef.current) {
        console.log("Animation in cooldown");
        toast("Animation en cooldown, veuillez attendre un moment", {
          duration: 3000,
        });
      } else if (!isGifLoaded) {
        console.log("GIF not loaded yet");
        toast("Animation en cours de chargement, veuillez patienter", {
          duration: 3000,
        });
      }
    }
  }, [triggerKey, isGifLoaded, triggerAnimation]);
  
  // Set up and clean up key press listener
  useEffect(() => {
    console.log("Setting up keydown listener");
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      console.log("Cleaning up keydown listener and timeouts");
      window.removeEventListener('keydown', handleKeyPress);
      clearAllTimeouts();
    };
  }, [handleKeyPress, clearAllTimeouts]);
  
  // Only render if animation should be shown
  if (!showAnimation) return null;
  
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-end justify-end">
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
