import { FC, Fragment, ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "@shared/components/animated/FadeInWrapper";
import { StyledFooterLink } from "@shared/components/themed/StyledFooterLink";
import { StyledSpace } from "@shared/components/themed/StyledSpace";
import { StyledText } from "@shared/components/themed/StyledText";
import { FooterLinkItem, footerLinks } from "@shared/config/footer-links.config";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

export const FooterLinksLoop: FC = (): ReactElement => (
    <FadeInWrapper>
        <Wrapper>
            {footerLinks.map((link: FooterLinkItem, index: number): ReactElement => (
                <Fragment key={index}> 
                    <StyledFooterLink
                        href={link.href}
                        text={link.text}
                        targetBlank={link.targetBlank ?? false}
                        className={link.className ?? ""}
                    />
                    {index < footerLinks.length - 1 && (
                        <>
                            <StyledSpace verySmall horizontal />
                            <StyledText
                                content="|"
                                tag="p"
                                size="p"
                                verySmallParagraph
                            />
                            <StyledSpace verySmall horizontal />
                        </>
                    )}
                </ Fragment>
            ))}
        </Wrapper>
    </FadeInWrapper>
);
