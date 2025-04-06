import { ReactElement, useContext } from "react";
import styled from "styled-components";
import { revealHiddenElements } from "../../animations/page-transition-element.animation";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import { useLocation, Location } from "react-router-dom";
import { TextRevealWrapper } from "./TextRevealWrapper";
import { StyledText } from "../themed/StyledText";
import { colors } from "../../config/colors.config";

const TitleWrapper = styled.div<{$hasLocationChanged: boolean}>`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) !important;
    width: 100% !important;
    background-color: unset !important;
    animation: unset !important;
    ${() => revealHiddenElements};
    background-color: unset;
`;

type PageTransitionProps = {
    hasLocationChanged: boolean
}

export const PageTransitionTitle = ({hasLocationChanged}: PageTransitionProps): ReactElement => {

    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
    const color = mode === 'dark' ? colors.dark.backgroundColor : colors.light.backgroundColor;

    const location: Location = useLocation(); 
    const pathName: string = location.pathname;
    const title: string = pathName.replace('/', "");
    let titleCapitalized: string = title.charAt(0).toUpperCase() + title.slice(1);

    if(!titleCapitalized) {
        titleCapitalized = "Home";
    }

    return <TitleWrapper $hasLocationChanged={hasLocationChanged}>
        <TextRevealWrapper>
            <StyledText tag="h2" size="h1" content={titleCapitalized} color={color} />
        </TextRevealWrapper>
    </TitleWrapper>
}