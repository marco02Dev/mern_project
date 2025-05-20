import { FC, ReactElement } from "react";
import { StyledText } from "./StyledText";
import styled from "styled-components";
import { FooterLinkItem } from "@shared/config/footer-links.config";

const Wrapper = styled.a`
    text-decoration: none;
`;

export const StyledFooterLink: FC<FooterLinkItem> = ({ 
    href, 
    text, 
    targetBlank, 
    className 
}: FooterLinkItem): ReactElement => (
  <Wrapper
    href={href}
    target={targetBlank ? "_blank" : undefined}
    rel={targetBlank ? "noopener noreferrer" : undefined}
    className={className || ""}
  >
    <StyledText tag="p" size="p" verySmallParagraph content={text} />
  </Wrapper>
);
