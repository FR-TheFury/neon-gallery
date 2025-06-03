
import { useState, useEffect, useCallback } from 'react';

const SECRET_SEQUENCE = ['d', 'i', 'n', '0'];
const TIME_LIMIT = 10000; // 10 seconds

export const useSecretCode = () => {
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [lastKeyTime, setLastKeyTime] = useState<number>(Date.now());

  const resetSequence = useCallback(() => {
    setCurrentSequence([]);
    setLastKeyTime(Date.now());
  }, []);

  const resetCodeValidity = useCallback(() => {
    setIsCodeValid(false);
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
      if (key === SECRET_SEQUENCE[nextExpectedIndex]) {
        const newSequence = [...currentSequence, key];
        setCurrentSequence(newSequence);
        
        // Check if sequence is complete
        if (newSequence.length === SECRET_SEQUENCE.length) {
          setIsCodeValid(true);
          console.log('Secret code entered successfully!');
          resetSequence();
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
  }, [currentSequence, lastKeyTime, resetSequence]);

  return {
    isCodeValid,
    resetCodeValidity,
    currentProgress: currentSequence.length
  };
};
