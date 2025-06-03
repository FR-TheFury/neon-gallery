
import React from 'react';
import { useSecretCode } from '@/hooks/useSecretCode';
import DinoGamePage from '@/pages/DinoGamePage';
import CheaterPage from '@/pages/CheaterPage';

const ProtectedDinoRoute = () => {
  const { isCodeValid, resetCodeValidity } = useSecretCode();

  // Reset code validity after accessing the game to prevent reuse
  React.useEffect(() => {
    if (isCodeValid) {
      const timer = setTimeout(() => {
        resetCodeValidity();
      }, 100); // Reset after component mounts
      
      return () => clearTimeout(timer);
    }
  }, [isCodeValid, resetCodeValidity]);

  return isCodeValid ? <DinoGamePage /> : <CheaterPage />;
};

export default ProtectedDinoRoute;
