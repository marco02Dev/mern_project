import styled, { RuleSet, css } from "styled-components";
import { fadeInWrapperAnimation } from "../../animations/fade-in-wrapper.animation";
import { ReactElement, ReactNode } from "react";
import { useInView } from "../../hooks/ui/useViewIn";
import useLocationChange, { UseLocationChange } from "../../hooks/navigation/useLocationChange";
import { FC } from "react";

const Wrapper = styled.div<{$absolute?: string, $addiniotalAnimation?: RuleSet, $width?: string, $height?: string, $flex?: boolean, $delayed?: string}>`
    opacity: 0;
    position: ${({$absolute}) => $absolute ? "absolute" : "relative"};
    ${({$width}) => $width && 'width: 100%;'}
    ${({$height}) => $height && 'height: 100%;'}
    ${({$addiniotalAnimation}) => $addiniotalAnimation}
    ${() => fadeInWrapperAnimation}

    ${({$flex}) => $flex && css`
        display: flex;
        justify-content: center;
        align-items: center;
    `}
`;

type FadeInWrapperProps = {
    children: ReactElement[] | ReactElement | ReactNode,
    additionalAnimation?: RuleSet
    absolute?: string,
    width?: string,
    height?: string,
    flex?: boolean,
    delay?: string
}

export const FadeInWrapper: FC<FadeInWrapperProps> = ({children, absolute, additionalAnimation, width, height, flex, delay}: FadeInWrapperProps): ReactElement => {
    const hasLocationChanged: UseLocationChange = useLocationChange(); 
    const [ref, isInView] = useInView({ threshold: 0.5 }); 
    
    const combinedDelay = (() => {
        if (hasLocationChanged) {
            const baseDelay = delay ? parseInt(delay.replace('ms', '')) : 0;
            return `${baseDelay + 1000}ms`;
        }
        return delay;
    })();

    const delayCalculated = combinedDelay ? combinedDelay : "";

    return <Wrapper 
            $addiniotalAnimation={additionalAnimation}
            $absolute={absolute} 
            ref={ref} 
            $width={width}
            $height={height}
            className={isInView ? 'in-view' : ''}
            $flex={flex}
            $delayed={delayCalculated}
        >
        {children}
    </Wrapper>
}