import { useEffect } from 'react';

export const useBodyOverflow = (trigger: boolean) => {
    useEffect(() => {
        if (trigger) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [trigger]);
};