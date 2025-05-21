import { FC, ReactElement } from "react";
import { StyledText } from "./StyledText";
import styled from "styled-components";
import { FooterLinkItem } from "@shared/config/footer-links.config";
import { ThemeColors, useThemeColors } from "@shared/hooks/theme/useThemeColors";

const Wrapper = styled.a<{$hoverColor: string}>`
  text-decoration: none;
  &:hover {
    p {
      color: ${({$hoverColor}) => $hoverColor};
    }
  }
`;

export const StyledFooterLink: FC<FooterLinkItem> = ({ 
  href, 
  text, 
  targetBlank, 
  className 
}: FooterLinkItem): ReactElement => {
  const { hoverColor }: ThemeColors = useThemeColors();

  return <Wrapper
    $hoverColor={hoverColor}
    href={href}
    target={targetBlank ? "_blank" : undefined}
    rel={targetBlank ? "noopener noreferrer" : undefined}
    className={className || ""}
  >
    <StyledText tag="p" size="p" verySmallParagraph content={text} />
  </Wrapper>
}