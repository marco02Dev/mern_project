import { useState, MouseEventHandler } from "react";

export const useUnsetActiveColor = () => {
    const [unsetActiveColor, setUnsetActiveColor] = useState<boolean>(false);

    const handleMouseHover: MouseEventHandler = (event) => {
        const target = event.currentTarget;
        if (target.className === "is-not-active") {
            setUnsetActiveColor(true);
        }
    };

    const handleMouseLeave: MouseEventHandler = () => {
        setUnsetActiveColor(false);
    };

    return { unsetActiveColor, handleMouseHover, handleMouseLeave };
};