import { ReactElement, FC } from "react";
import { useThemeColors, ThemeColors } from "@shared/hooks/theme/useThemeColors";
import styled, { RuleSet } from "styled-components";
import { sizes } from "@shared/config/sizes.config";
import { UseMediaQuery, useMediaQuery } from "@shared/hooks/ui/useMediaQuery";
import { styledBoxHoverAnimation } from "@shared/animations/styled-box.animation";
import { fadeInWrapperAnimation } from "@shared/animations/fade-in-wrapper.animation";
import { useInView } from "@shared/hooks/ui/useViewIn";
import { sumStringDelays } from "@shared/utils/components/sum-string-delays.util";


const Wrapper = styled.div<{
        $isMobileDevices: boolean, 
        $width: string, 
        $button?: boolean, 
        $headerButton?: boolean,
        $isInView: boolean,
        $delayed: string,
        $height?: string
    }>`
    position: relative;
    width: ${({$width, $headerButton}) => $headerButton ? "auto" : $width};
    height: ${({$height}) => $height ? $height : "auto"};
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
    top: 0;
    left: 0;
    z-index: 0;
    border-bottom: clamp(1vh, 0.3vh + 0.5vw, 100vw) solid ${({$color}) => $color};
    border-right: clamp(1vh, 0.3vh + 0.5vw, 100vw) solid ${({$color}) => $color};
    clip-path: ${() => `inset(${sizes.spaces.small} 0% 0% ${sizes.spaces.small})`} ;
`;

type StyledBoxProps = {
    children: ReactElement[] | ReactElement,
    width: string,
    backgorundColor?: string,
    headerButton?: boolean,
    animation?: RuleSet,
    button?: boolean,
    height?: string,
    delay?: string
}

export const StyledBox: FC<StyledBoxProps> = ({
    children, 
    width, 
    headerButton, 
    animation,
    button,
    height,
    delay
}: StyledBoxProps): ReactElement => {
    const [ref, isInView] = useInView({ threshold: 0.5 }); 
    const { isMobile, isTablet }: UseMediaQuery = useMediaQuery();
    const { borderColor, backgroundColorSecondary }: ThemeColors = useThemeColors();

    const delayCalculated = sumStringDelays(delay ? delay : "0ms", "1000ms");

    return <Wrapper $height={height} $delayed={delayCalculated} $isInView={isInView} className={isInView ? "in-view" : "" } ref={ref} $headerButton={headerButton} $button={button} $isMobileDevices={isMobile || isTablet} $width={width}>
        <BodyWrapper  as={button ? "div" : "li"} $button={button} $animation={animation} $borderColor={borderColor} $backgroundColor={backgroundColorSecondary}  $isMobileDevices={isMobile || isTablet} $mediumSpace={sizes.spaces.large} $smallSpace={"5%"}>
            {children}
        </BodyWrapper>

        {!headerButton && <WrapperShadow $button={button} $color={borderColor} />}
    </Wrapper>
}