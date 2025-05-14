import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setDeviceState } from "../../store/slices/device.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { DeviceState } from "../../store/slices/device.slice";

export type UseMediaQuery = {
  isMobile: boolean;
  isTablet: boolean;
};

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