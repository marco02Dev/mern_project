import { ReactElement, useContext, FC } from "react";
import styled, { RuleSet } from "styled-components";
import { sizes } from "../../config/sizes.config";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { colors } from "../../config/colors.config";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { styledBoxHoverAnimation } from "../../animations/styled-box.animation";
import { fadeInWrapperAnimation } from "../../animations/fade-in-wrapper.animation";
import { useInView } from "../../hooks/useViewIn";

const Wrapper = styled.div<{
        $isMobileDevices: boolean, 
        $width: string, 
        $button?: boolean, 
        $headerButton?: boolean,
        $isInView: boolean,
        $delayed: string
    }>`
    position: relative;
    width: ${({$width, $headerButton}) => $headerButton ? "auto" : $width};
    display: ${({$button}) => $button ? "flex" : "flex"};
    box-sizing: border-box;
    ${({$headerButton}) => !$headerButton && styledBoxHoverAnimation}
    ${() => fadeInWrapperAnimation}
`;

const BodyWrapper = styled.li<{
        $smallSpace: string, 
        $mediumSpace: string, 
        $isMobileDevices: boolean,
        $backgroundColor: string,
        $borderColor: string,
        $animation?: RuleSet,
        $button?: boolean
    }>`
    display: flex;
    flex-direction: column;
    width: ${({$button}) => $button ? "100%" : "100%"};
    border-color: ${({$borderColor}) => $borderColor};
    border-width: ${() => sizes.heights.verySmall};
    border-style: solid;
    background-color: ${({$backgroundColor}) => $backgroundColor};
    ${({$animation}) => $animation && $animation}
    z-index: 1;
    position: relative;

`;

const WrapperShadow = styled.div<{$color: string, $button?: boolean}>`
    position: absolute;
    background-color: ${({$color}) => $color};
    width: ${({$button}) => $button ? "100%" : "100%"};
    height: 100%;
    bottom: 0;
    z-index: 0;
    bottom: ${({$button}) => $button ? "-2%" : "-2%"};
    right: ${({$button}) => $button ? "-2%" : "-2%"};

`;

type StyledBoxProps = {
    children: ReactElement,
    width: string,
    backgorundColor?: string,
    headerButton?: boolean,
    animation?: RuleSet,
    button?: boolean
}

export const StyledBox: FC<StyledBoxProps> = ({
    children, 
    width, 
    headerButton, 
    animation,
    button
}: StyledBoxProps): ReactElement => {
    const [ref, isInView] = useInView({ threshold: 0.5 }); 
    const { isMobile, isTablet } = useMediaQuery();
    const { mode }: ThemeModeContextProps = useContext(ThemeModeContext)
    const color = mode === "dark" ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary;
    const borderColor = mode === "dark" ? colors.dark.textColor : colors.light.textColor;

    return <Wrapper $delayed="1000ms" $isInView={isInView} className={isInView ? "in-view" : "" } ref={ref} $headerButton={headerButton} $button={button} $isMobileDevices={isMobile || isTablet} $width={width}>
        <BodyWrapper  as={button ? "div" : "li"} $button={button} $animation={animation} $borderColor={borderColor} $backgroundColor={color}  $isMobileDevices={isMobile || isTablet} $mediumSpace={sizes.spaces.large} $smallSpace={"5%"}>
            {children}
        </BodyWrapper>

        {!headerButton && <WrapperShadow $button={button} $color="black" />}
    </Wrapper>
}