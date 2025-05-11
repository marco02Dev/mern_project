import { useState, useEffect } from 'react';

export const useColorToggle = (
  trigger: boolean, 
  primaryColor: string, 
  secondaryColor: string
) => {
  const [isDefaultColor, setIsDefaultColor] = useState<boolean>(true);

  useEffect(() => {
    if (trigger) {
      setIsDefaultColor(prev => !prev);
    }
  }, [trigger]);

  return isDefaultColor ? primaryColor : secondaryColor;
};
