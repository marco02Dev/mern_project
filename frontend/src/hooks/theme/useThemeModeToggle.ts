import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setMode } from "../../store/slices/theme-mode.slice";
import { setCookie } from "../../utils/cookies/set-cookie";
import { MouseEventHandler } from "react";
import { Dispatch } from "@reduxjs/toolkit";

export type UseThemeModeToggle = {
    mode: string,
    toggleTheme: MouseEventHandler
}

export const useThemeModeToggle = (): UseThemeModeToggle => {
    const mode: string = useSelector((state: RootState) => state.themeMode.mode);
    const dispatch: Dispatch = useDispatch();

    const toggleTheme: MouseEventHandler = () => {
        const newMode = mode === "light" ? "dark" : "light";
        dispatch(setMode(newMode));
        setCookie("themeMode", newMode);
    };

    return { mode, toggleTheme };
};
