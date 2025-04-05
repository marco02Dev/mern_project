import styled, { RuleSet, css } from "styled-components";
import { fadeIn } from "../../animations/fade-in.animation";
import { ReactElement } from "react";
import { useInView } from "../../hooks/useViewIn";

const Wrapper = styled.div<{$absolute?: string, $addiniotalAnimation?: RuleSet, $width?: string, $height?: string, $flex?: boolean}>`
    opacity: 0;
    position: ${({$absolute}) => $absolute ? "absolute" : "relative"};
    ${({$width}) => $width && 'width: 100%;'}
    ${({$height}) => $height && 'height: 100%;'}
    ${({$addiniotalAnimation}) => $addiniotalAnimation}
    ${() => fadeIn}

    ${({$flex}) => $flex && css`
        display: flex;
        justify-content: center;
        align-items: center;
    `}
`;

type FadeInWrapperProps = {
    children: ReactElement[] | ReactElement,
    additionalAnimation?: RuleSet
    absolute?: string,
    width?: string,
    height?: string,
    flex?: boolean
}

export const FadeInWrapper = ({children, absolute, additionalAnimation, width, height, flex}: FadeInWrapperProps): ReactElement => {

    const [ref, isInView] = useInView({ threshold: 0.5 }); 

    return <Wrapper 
            $addiniotalAnimation={additionalAnimation}
            $absolute={absolute} 
            ref={ref} 
            $width={width}
            $height={height}
            className={isInView ? 'in-view' : ''}
            $flex={flex}
        >
        {children}
    </Wrapper>
}