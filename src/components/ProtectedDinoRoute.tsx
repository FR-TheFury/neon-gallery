
import React from 'react';
import { useLocation } from 'react-router-dom';
import DinoGamePage from '@/pages/DinoGamePage';
import CheaterPage from '@/pages/CheaterPage';
import { useSecretCode } from '@/hooks/useSecretCode';

const ProtectedDinoRoute = () => {
  const location = useLocation();
  const { hasValidAccess } = useSecretCode();
  
  // Check if user has valid access (either through secret code or session)
  const isValidAccess = hasValidAccess() || location.state?.fromSecretCode === true;

  console.log('ProtectedDinoRoute - Valid access:', isValidAccess);

  return isValidAccess ? <DinoGamePage /> : <CheaterPage />;
};

export default ProtectedDinoRoute;
