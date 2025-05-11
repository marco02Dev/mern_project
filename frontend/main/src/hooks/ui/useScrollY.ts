import { useState, useEffect } from "react";

export type UseScrollY = {
    scrollY: number, 
    latestScrollY: number
}

export const useScrollY = (): UseScrollY => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [latestScrollY, setLatestScrollY] = useState<number>(0);

    useEffect(() => {
        const updateScrollY = (): void => {
            setLatestScrollY(scrollY); 
            setScrollY(window.scrollY);
        }
    
        window.addEventListener("scroll", updateScrollY);
    
        return () => window.removeEventListener('scroll', updateScrollY);
    }, [scrollY]);
    
    return {
        scrollY: scrollY, 
        latestScrollY: latestScrollY
    }
}