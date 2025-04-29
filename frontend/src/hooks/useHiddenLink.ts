import { useRef } from "react";

export const useHiddenLink = () => {
    const hiddenRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

    const handleHiddenClick = (): void => {
        hiddenRef.current?.click();
    };

    return { hiddenRef, handleHiddenClick };
};
