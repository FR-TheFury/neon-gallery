
import React from 'react';
import { useLocation } from 'react-router-dom';
import NSFWGalleryPage from '@/pages/NSFWGalleryPage';
import CheaterPage from '@/pages/CheaterPage';
import { useNSFWCode } from '@/hooks/useNSFWCode';

const ProtectedNSFWRoute = () => {
  const location = useLocation();
  const { hasValidAccess } = useNSFWCode();
  
  // Check if user has valid access (either through secret code or session)
  const isValidAccess = hasValidAccess() || location.state?.fromSecretCode === true;

  console.log('ProtectedNSFWRoute - Valid access:', isValidAccess);

  return isValidAccess ? <NSFWGalleryPage /> : <CheaterPage />;
};

export default ProtectedNSFWRoute;
