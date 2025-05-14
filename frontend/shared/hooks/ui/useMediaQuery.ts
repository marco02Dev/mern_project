import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setDeviceState } from "../../store/slices/device.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { DeviceState } from "../../store/slices/device.slice";

/**
 * Represents the return type of the `useMediaQuery` hook.
 *
 * @property {boolean} isMobile - Indicates if the current viewport width is less than or equal to 767px.
 * @property {boolean} isTablet - Indicates if the current viewport width is between 768px and 1100px.
*/

export type UseMediaQuery = {
  /** True if the screen width is <= 767px */
  isMobile: boolean;
  /** True if the screen width is between 768px and 1100px */
  isTablet: boolean;
};

/**
 * Custom hook to detect device screen size (mobile or tablet) and update global Redux state accordingly.
 * It listens to screen resize events and provides updated state reactively.
 * 
 * @returns {UseMediaQuery} The current device state with flags for mobile and tablet.
 *
 * @example
 * const { isMobile, isTablet } = useMediaQuery();
 * if (isMobile) {
 *   // render mobile-specific component
 * }
*/

export const useMediaQuery = (): UseMediaQuery => {
  const dispatch: Dispatch = useDispatch();
  const device: DeviceState = useSelector((state: RootState) => state.device);

  useEffect(() => {
    const mediaQueryMobile: MediaQueryList = window.matchMedia("(max-width: 767px)");
    const mediaQueryTablet: MediaQueryList = window.matchMedia("(min-width: 768px) and (max-width: 1100px)");

    const handleChange = (): void => {
      dispatch(setDeviceState({
        isMobile: mediaQueryMobile.matches,
        isTablet: mediaQueryTablet.matches,
      }));
    };

    mediaQueryMobile.addEventListener("change", handleChange);
    mediaQueryTablet.addEventListener("change", handleChange);

    handleChange(); 

    return () => {
      mediaQueryMobile.removeEventListener("change", handleChange);
      mediaQueryTablet.removeEventListener("change", handleChange);
    };
  }, [dispatch]);

  return device;
};