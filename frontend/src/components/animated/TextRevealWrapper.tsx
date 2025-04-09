import styled, { RuleSet } from "styled-components";
import { TextReaveal } from "../../animations/text-reveal-wrapper.animation";
import { ReactElement } from "react";
import { useInView } from "../../hooks/useViewIn";
import useLocationChange from "../../hooks/useLocationChange";
import { FC } from "react";

const Wrapper = styled.div<{$revealText: boolean, $absolute?: string, $addiniotalAnimation?: RuleSet, $width?: string, $height?: string, $left: boolean, $right?: boolean, $delayed: string, $textCenter?: boolean}>`
    overflow-y: hidden;
    scrollbar-width: none;
    text-align: ${({$textCenter}) => $textCenter ? "center" : "unset"};
    position: ${({$absolute}) => $absolute ? "absolute" : "relative"};
    ${({$width}) => $width && 'width: 100%;'}
    ${({$height}) => $height && 'height: 100%;'}
    ${({$addiniotalAnimation}) => $addiniotalAnimation}
    ${() => TextReaveal}
`;

type TextRevealWrapperProps = {
    children: ReactElement[] | ReactElement,
    additionalAnimation?: RuleSet
    absolute?: string,
    width?: string,
    height?: string,
    left?: boolean,
    textCenter?: boolean;
}

export const TextRevealWrapper: FC<TextRevealWrapperProps> = ({children, absolute, additionalAnimation, width, height, left, textCenter }: TextRevealWrapperProps): ReactElement => {

    const [ref, isInView] = useInView({ threshold: 0.5 }); 
    const hasLocationChanged: boolean = useLocationChange();
    const dealyed: string = hasLocationChanged ? "1000ms" : "";

    return <Wrapper 
            $addiniotalAnimation={additionalAnimation}
            $absolute={absolute} 
            ref={ref} 
            $width={width}
            $height={height}
            $revealText={isInView}
            $left={left as boolean}
            $delayed={dealyed}
            $textCenter={textCenter}
        >
        {children}
    </Wrapper>
}