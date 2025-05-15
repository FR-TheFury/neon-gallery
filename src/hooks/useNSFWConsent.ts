
/**
 * Hook to manage NSFW consent state in localStorage
 */
export function useNSFWConsent() {
  const STORAGE_KEY = 'nsfw-consent-given';

  const hasGivenConsent = () => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  };

  const setConsent = (value: boolean) => {
    localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
  };

  return {
    hasGivenConsent,
    setConsent
  };
}
