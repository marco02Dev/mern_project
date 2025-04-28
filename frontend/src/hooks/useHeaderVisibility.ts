import { useEffect, useState } from "react";
import { css, RuleSet } from "styled-components";
import { UseScrollY, useScrollY } from "./useScrollY";
import useLocationChange from "./useLocationChange";
import { HideHeaderAnimation, RevealHeaderAnimation } from "../animations/header.animation";

export const useHeaderVisibility = (): { headerHidden: boolean, animation: RuleSet } => {
    const isLocationChanged: boolean = useLocationChange();
    const { scrollY, latestScrollY }: UseScrollY = useScrollY();
    const [headerHidden, setHeaderHidden] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHeaderHidden(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    let animation: RuleSet = css`
        animation: unset;
    `;

    if (headerHidden) {
        animation = css`
            animation: unset;
        `;
    } else {
        if (scrollY > latestScrollY || isLocationChanged) {
            animation = HideHeaderAnimation;
        } else {
            animation = RevealHeaderAnimation;
        }
    }

    return { headerHidden, animation };
};
