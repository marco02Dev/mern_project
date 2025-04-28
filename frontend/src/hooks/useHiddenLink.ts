import { useRef } from "react";

export const useHiddenLink = () => {
    const hiddenRef = useRef<HTMLButtonElement | null>(null);

    const handleHiddenClick = (): void => {
        hiddenRef.current?.click();
    };

    return { hiddenRef, handleHiddenClick };
};
