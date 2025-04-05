import styled, { RuleSet } from "styled-components";
import { TextReaveal } from "../../animations/text-reveal";
import { ReactElement } from "react";
import { useInView } from "../../hooks/useViewIn";

const Wrapper = styled.div<{$revealText: boolean, $absolute?: string, $addiniotalAnimation?: RuleSet, $width?: string, $height?: string, $left: boolean}>`
    overflow: hidden;
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
    left?: boolean
}

export const TextRevealWrapper = ({children, absolute, additionalAnimation, width, height, left}: TextRevealWrapperProps): ReactElement => {

    const [ref, isInView] = useInView({ threshold: 0.5 }); 

    return <Wrapper 
            $addiniotalAnimation={additionalAnimation}
            $absolute={absolute} 
            ref={ref} 
            $width={width}
            $height={height}
            $revealText={isInView}
            $left={left}
        >
        {children}
    </Wrapper>
}