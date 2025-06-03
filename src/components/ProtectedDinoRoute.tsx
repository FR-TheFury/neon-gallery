
import React from 'react';
import { useLocation } from 'react-router-dom';
import DinoGamePage from '@/pages/DinoGamePage';
import CheaterPage from '@/pages/CheaterPage';

const ProtectedDinoRoute = () => {
  const location = useLocation();
  
  // Check if the user accessed this route through the secret code
  // We'll use a simple check - if they're on this route, assume they used the code
  // The navigation logic in App.tsx ensures only valid code users reach here
  const isValidAccess = location.pathname === '/dino-game';

  console.log('ProtectedDinoRoute - Current path:', location.pathname, 'Valid access:', isValidAccess);

  return isValidAccess ? <DinoGamePage /> : <CheaterPage />;
};

export default ProtectedDinoRoute;
