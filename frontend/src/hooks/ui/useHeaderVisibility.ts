import { useEffect, useState } from "react";
import { css, RuleSet } from "styled-components";
import { useScrollY, UseScrollY } from "./useScrollY";
import useLocationChange from "../navigation/useLocationChange";
import { HideHeaderAnimation, RevealHeaderAnimation } from "../../animations/header.animation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MenuState } from "../../store/slices/menu.slice";

export const useHeaderVisibility = (): { headerHidden: boolean, animation: RuleSet } => {
    const isLocationChanged: boolean = useLocationChange();
    const { scrollY, latestScrollY }: UseScrollY = useScrollY();
    const [headerHidden, setHeaderHidden] = useState<boolean>(true);
    const { isOpened }: MenuState = useSelector((state: RootState) => state.menu);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHeaderHidden(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    let animation: RuleSet = css`
        animation: unset;
    `;

    if (headerHidden || isOpened) {
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
