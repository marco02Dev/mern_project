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

export const useHiddenLink = (): UseHiddenLink => {
    const hiddenRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

    const handleHiddenClick = (): void => {
        hiddenRef.current?.click();
    };

    return { hiddenRef, handleHiddenClick };
};
