import styled, { RuleSet, css } from "styled-components";
import { useContext, ReactNode, JSX, ReactElement } from "react";
import { ThemeModeContextProps, ThemeModeContext } from "../../contexts/ThemeModeProvider";
import { colors } from "../../config/colors.config";
import { UseMediaQuery, useMediaQuery } from "../../hooks/useMediaQuery";
import { sizes } from "../../config/sizes.config";

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
    $smallSpace: string;
    $overflowVisible?: boolean
}

const Section = styled.section<SectionProps>`
  overflow-y: ${({$overflowVisible}) => $overflowVisible ? "visible" : "hidden"};
  overflow-x: hidden;
  z-index: ${({$semanticTag}) => $semanticTag? "1000" : "unset"};
  display: ${({$block}) => $block ? "block" : 'flex'};
  justify-content: ${({$justifyCenter}) => $justifyCenter ? 'center' : 'start'};
  align-items: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'start')};
  flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: 100%;
  height: ${({ $height, $overflowVisible }) => {
    if(!$overflowVisible) {
      return $height ? $height : '100vh';
    } else if($overflowVisible)  {
      return "auto";
    }

  }};
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

type StyledSectionProps = {
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
  overflowVisible?: boolean,
  id?: string
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
    hiddenFirstRender,
    overflowVisible,
    id
  }): ReactElement => {
  const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
  const {isMobile, isTablet}: UseMediaQuery = useMediaQuery();

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
    $overflowVisible={overflowVisible}
    id={id}
    > {children} 
  </Section>;
};
