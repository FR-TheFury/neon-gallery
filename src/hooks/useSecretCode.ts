
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
    setCurrentSequence([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      const key = event.key.toLowerCase();
      
      console.log('Key pressed:', key, 'Current sequence:', currentSequence);
      
      // Reset if too much time passed
      if (now - lastKeyTime > TIME_LIMIT) {
        console.log('Time limit exceeded, resetting sequence');
        resetSequence();
      }
      
      setLastKeyTime(now);
      
      // Check if key matches the next expected key in sequence
      const nextExpectedIndex = currentSequence.length;
      const expectedKey = SECRET_SEQUENCE[nextExpectedIndex];
      
      console.log('Expected key:', expectedKey, 'Got:', key);
      
      if (key === expectedKey) {
        const newSequence = [...currentSequence, key];
        setCurrentSequence(newSequence);
        console.log('Correct key! New sequence:', newSequence);
        
        // Check if sequence is complete
        if (newSequence.length === SECRET_SEQUENCE.length) {
          console.log('Secret code completed! Setting isCodeValid to true');
          setIsCodeValid(true);
        }
      } else {
        // Wrong key, reset sequence
        console.log('Wrong key, resetting sequence');
        resetSequence();
      }
    };

    console.log('Adding keydown listener');
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      console.log('Removing keydown listener');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSequence, lastKeyTime, resetSequence]);

  return {
    isCodeValid,
    resetCodeValidity,
    currentProgress: currentSequence.length
  };
};
