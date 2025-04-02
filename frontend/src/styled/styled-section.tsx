import styled, { RuleSet } from "styled-components";
import { useContext, ReactNode, JSX } from "react";
import { ThemeModeContext } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";

type SectionProps = {
    as?: keyof JSX.IntrinsicElements,
    $backgroundColor: string,
    $column?: boolean,
    $row?: boolean,
    $alignCenter?: boolean,
    $fixed?: boolean, 
    $height?: string, 
    $animation?: RuleSet
}

const Section = styled.section<SectionProps>`
  display: flex;
  justify-content: center;
  align-items: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'start')};
  flex-direction: ${({ $row }) => ($row ? 'row' : 'column')};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: 100%;
  height: ${({ $height }) => ($height ? $height : '100vh')};
  position: ${({ $fixed }) => ($fixed ? 'fixed' : 'auto')};
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
    animation?: RuleSet
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
      animation
   }) => {
  const { mode } = useContext(ThemeModeContext);

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
    > {children} 
  </Section>;
};
