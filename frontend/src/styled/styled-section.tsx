import styled from "styled-components";
import { useContext, ReactNode } from "react";
import { ThemeModeContext } from "../contexts/theme-mode.context";
import { colors } from "../config/colors.config";

type SectionProps = {
    $backgroundColor: string,
    $column?: boolean,
    $row?: boolean
}

const Section = styled.section<SectionProps>`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: ${({$row}) => $row ? "row" : "column"};
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  width: 100%;
`;

interface StyledSectionProps {
    children: ReactNode;
    secondaryColor?: boolean;
    column?: boolean,
    row?: boolean
}

export const StyledSection: React.FC<StyledSectionProps> = ({ children, secondaryColor, column, row }) => {
  const { mode } = useContext(ThemeModeContext);

  const color = secondaryColor
    ? mode === "dark" ? colors.dark.backgroundColorSecondary : colors.light.backgroundColorSecondary
    : mode === "dark" ? colors.dark.backgroundColor : colors.light.backgroundColor;

  return <Section $column={column} $row={row} $backgroundColor={color}>{children}</Section>;
};
