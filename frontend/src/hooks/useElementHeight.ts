import { useState, useEffect, useCallback, RefObject } from "react";

export type UseElementHeight = (elementRef: RefObject<HTMLElement>) => number;

export const useElementHeight: UseElementHeight = (elementRef) => {
    const [height, setHeight] = useState<number>(0);

    const updateHeight = useCallback(() => {
        if (elementRef.current) {
            setHeight(elementRef.current.clientHeight);
        }
    }, [elementRef]);

    useEffect(() => {
        // Delay updateHeight to ensure layout is fully rendered
        setTimeout(updateHeight, 0);

        // Observe DOM changes
        const observer = new MutationObserver(updateHeight);
        if (elementRef.current) {
            observer.observe(elementRef.current, { childList: true, subtree: true });
        }

        // Listen for window resize
        window.addEventListener("resize", updateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateHeight);
        };
    }, [updateHeight, elementRef]);

    return height;
};