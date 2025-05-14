import { useRef, RefObject, MouseEventHandler } from "react";

/**
 * Represents the result of the useHiddenLink hook.
 * 
 * @property hiddenRef A reference to a hidden link or button element.
 * @property handleHiddenClick A function that simulates a click on the referenced element.
*/

export type UseHiddenLink = {
    hiddenRef: RefObject<HTMLAnchorElement | HTMLButtonElement>,
    handleHiddenClick: MouseEventHandler
}

/**
 * Custom hook that provides a way to simulate a click on a hidden link or button.
 * 
 * @returns An object containing:
 * - `hiddenRef`: A reference to a hidden link or button element
 * - `handleHiddenClick`: A function that triggers a click on the referenced element
 * 
 * @description
 * This hook is useful for scenarios where you need to trigger a hidden link or button
 * (for example, using a programmatic click) without directly interacting with it.
*/

export const useHiddenLink = (): UseHiddenLink => {
    const hiddenRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

    const handleHiddenClick = (): void => {
        hiddenRef.current?.click();
    };

    return { hiddenRef, handleHiddenClick };
};
