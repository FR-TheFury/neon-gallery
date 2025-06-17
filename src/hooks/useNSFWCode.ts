
import { useState, useEffect, useCallback } from 'react';

const SECRET_SEQUENCE = ['n', 's', 'f', 'w'];
const TIME_LIMIT = 10000; // 10 seconds

export const useNSFWCode = () => {
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [lastKeyTime, setLastKeyTime] = useState<number>(Date.now());

  const resetSequence = useCallback(() => {
    setCurrentSequence([]);
    setLastKeyTime(Date.now());
  }, []);

  const resetCodeValidity = useCallback(() => {
    setIsCodeValid(false);
    setCurrentSequence([]);
    // Clear session storage when resetting
    sessionStorage.removeItem('nsfw-access-granted');
  }, []);

  const markAccessGranted = useCallback(() => {
    sessionStorage.setItem('nsfw-access-granted', 'true');
  }, []);

  const hasValidAccess = useCallback(() => {
    return sessionStorage.getItem('nsfw-access-granted') === 'true';
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      const key = event.key.toLowerCase();
      
      // Reset if too much time passed
      if (now - lastKeyTime > TIME_LIMIT) {
        resetSequence();
      }
      
      setLastKeyTime(now);
      
      // Check if key matches the next expected key in sequence
      const nextExpectedIndex = currentSequence.length;
      const expectedKey = SECRET_SEQUENCE[nextExpectedIndex];
      
      if (key === expectedKey) {
        const newSequence = [...currentSequence, key];
        setCurrentSequence(newSequence);
        
        // Check if sequence is complete
        if (newSequence.length === SECRET_SEQUENCE.length) {
          setIsCodeValid(true);
          markAccessGranted();
        }
      } else {
        // Wrong key, reset sequence
        resetSequence();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSequence, lastKeyTime, resetSequence, markAccessGranted]);

  return {
    isCodeValid,
    resetCodeValidity,
    currentProgress: currentSequence.length,
    hasValidAccess
  };
};
