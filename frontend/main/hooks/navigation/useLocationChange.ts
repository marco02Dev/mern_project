import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';

const useLocationChange = (): boolean => {
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

