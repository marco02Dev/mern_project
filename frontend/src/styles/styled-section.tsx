import styled, { RuleSet, css } from "styled-components";
import { useContext, ReactNode, JSX } from "react";
import { ThemeModeContext } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { sizes } from "../config/sizes.config";

type SectionProps = {
    as?: keyof JSX.IntrinsicElements,
    $semanticTag?: string
    $backgroundColor: string,
    $column?: boolean,
    $row?: boolean,
    $alignCenter?: boolean,
    $fixed?: boolean, 
    $height?: string, 
    $animation?: RuleSet,
    $block?: boolean,
    $paddingLeft?: string,
    $paddingRight?: string,
    $justifyCenter?: boolean,
    $hiddenFirstRender?: boolean,
    $isMobileOrTablet?: boolean,
    $smallSpace: string
}

const Section = styled.section<SectionProps>`
  z-index: ${({$semanticTag}) => $semanticTag? "1000" : "unset"};
  display: ${({$block}) => $block ? "block" : 'flex'};
  justify-content: ${({$justifyCenter}) => $justifyCenter ? 'center' : 'start'};
  align-items: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'start')};
  flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: 100%;
  height: ${({ $height }) => ($height ? $height : '100vh')};
  position: ${({ $fixed }) => ($fixed ? 'fixed' : 'unset')};
  padding-left: ${({ $paddingLeft, $isMobileOrTablet, $smallSpace}) => {
    if($paddingLeft && !$isMobileOrTablet) {
      return $paddingLeft;
    } else if($isMobileOrTablet) {
      return $smallSpace
    } else {
      return 'unset';
    }
  }};
    padding-right: ${({ $paddingRight, $isMobileOrTablet, $smallSpace}) => {
    if($paddingRight && !$isMobileOrTablet) {
      return $paddingRight;
    } else if($isMobileOrTablet) {
      return $smallSpace
    } else {
      return 'unset';
    }
  }};
  box-sizing: border-box;

  ${({$hiddenFirstRender}) => {
    if($hiddenFirstRender) {
      return css`
        transform: translateY(-100%);
      `;
    }
  }};
  ${({ $animation }) => ($animation ? $animation : 'unset')};
`;

interface StyledSectionProps {
    children: ReactNode;
    secondaryColor?: boolean;
    column?: boolean,
    row?: boolean,
    alignCenter?: boolean,
    semanticTag?: string,
    fixed?: boolean,
    height?: string,
    animation?: RuleSet,
    block?: boolean,
    paddingLeft?: string,
    paddingRight?: string,
    justifyCenter?: boolean,
    hiddenFirstRender?: boolean,
}

export const StyledSection: React.FC<StyledSectionProps> = ({ 
      children, 
      secondaryColor, 
      column, 
      row, 
      alignCenter,
      semanticTag,
      fixed, 
      height,
      animation,
      block,
      paddingLeft,
      paddingRight,
      justifyCenter,
      hiddenFirstRender

   }) => {
  const { mode } = useContext(ThemeModeContext);
  const {isMobile, isTablet} = useMediaQuery();

  const color = secondaryColor
    ? mode === "dark" ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary
    : mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;

  return <Section 
    as={semanticTag || 'section'}
    $column={column} 
    $row={row} 
    $backgroundColor={color} 
    $alignCenter={alignCenter} 
    $fixed={fixed}
    $height={height}
    $animation={animation}
    $block={block}
    $paddingLeft={paddingLeft}
    $paddingRight={paddingRight}
    $justifyCenter={justifyCenter}
    $hiddenFirstRender={hiddenFirstRender}
    $isMobileOrTablet={isMobile || isTablet}
    $smallSpace={sizes.spaces.small}
    $semanticTag={semanticTag}
    > {children} 
  </Section>;
};
