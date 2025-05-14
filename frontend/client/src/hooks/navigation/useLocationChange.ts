import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';

/** 
 * Boolean that checks if the route location has changed. 
*/

export type UseLocationChange = boolean; 

/**
 * Custom hook that detects if the route location has changed.
 * 
 * @returns `true` if the location has changed within the last 1.5 seconds, otherwise `false`.
 * 
 * @example
 * const hasChanged = useLocationChange();
 * 
 * useEffect(() => {
 *   if (hasChanged) {
 *     console.log("Location just changed!");
 *   }
 * }, [hasChanged]);
 * 
 * @description
 * This hook sets `true` for 1.5 seconds every time the route (`location.pathname`) changes.
 * Useful for triggering temporary UI changes (e.g. animations, loaders, etc.) after navigation.
*/

const useLocationChange = (): UseLocationChange => {
  const location: Location = useLocation(); 
  const [hasLocationChanged, setHasLocationChanged] = useState<boolean>(false);

  useEffect(() => {
    setHasLocationChanged(true);

    const timeout = setTimeout(() => {
      setHasLocationChanged(false);
    }, 1500); 

    return () => clearTimeout(timeout);
  }, [location]); 
  return hasLocationChanged;
};

export default useLocationChange;

