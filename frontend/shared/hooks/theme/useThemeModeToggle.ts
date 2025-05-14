import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setMode } from "../../store/slices/theme-mode.slice";
import { setCookie } from "../../utils/cookies/set-cookie";
import { MouseEventHandler } from "react";
import { Dispatch } from "@reduxjs/toolkit";

/**
 * Represents the return type of the `useThemeModeToggle` hook.
 *
 * @property {string} mode - The current theme mode, either `"light"` or `"dark"`.
 * @property {MouseEventHandler} toggleTheme - Function to toggle the theme mode.
 * When triggered (e.g., by a click event), it updates the mode in the Redux store
 * and persists the new mode in a cookie.
*/

export type UseThemeModeToggle = {
    mode: string,
    toggleTheme: MouseEventHandler
}

/**
 * Custom hook to manage and toggle the application's theme mode.
 * 
 * Retrieves the current theme mode from the Redux store, and provides
 * a toggle function to switch between "light" and "dark" modes.
 * 
 * When toggled, the new mode is saved to both the Redux store and a cookie ("themeMode"),
 * so that it can persist across sessions.
 * 
 * @returns {UseThemeModeToggle} An object containing the current mode and a toggle handler.
 * 
 * @example
 * const { mode, toggleTheme } = useThemeModeToggle();
 * 
 * return (
 *   <button onClick={toggleTheme}>
 *     Switch to {mode === 'light' ? 'dark' : 'light'} mode
 *   </button>
 * );
*/

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
