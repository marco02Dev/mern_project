import { useEffect, useState } from 'react';

export const useFirstRender = (pathName: string): boolean => {
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

    useEffect(() => {
        if (pathName === "/") {
            setTimeout(() => {
                setIsFirstRender(false);
            }, 1500);
        }
    }, [pathName]);

    return isFirstRender;
};
