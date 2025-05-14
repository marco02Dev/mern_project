import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';

export type UseLocationChange = boolean; 

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

