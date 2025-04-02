import { useState, useEffect } from "react";

export type UseMediaQuery = {
  isMobile: boolean,
  isTablet: boolean
}

export const useMediaQuery = () => {
  const [device, setDevice] = useState<UseMediaQuery>({
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia("(max-width: 767px)");
    const mediaQueryTablet = window.matchMedia("(min-width: 768px) and (max-width: 820px)");

    const handleChange = () => {
      setDevice({
        isMobile: mediaQueryMobile.matches,
        isTablet: mediaQueryTablet.matches,
      });
    };

    mediaQueryMobile.addEventListener("change", handleChange);
    mediaQueryTablet.addEventListener("change", handleChange);

    handleChange(); 

    return () => {
      mediaQueryMobile.removeEventListener("change", handleChange);
      mediaQueryTablet.removeEventListener("change", handleChange);
    };
  }, []);

  return device;
}