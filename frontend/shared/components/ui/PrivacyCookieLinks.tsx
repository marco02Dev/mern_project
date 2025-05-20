import { FC, ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledLink } from "../themed/StyledLink";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { UseIubendaPolicy, useIubendaPolicy } from "@shared/hooks/theme/useIubendaPolicy";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const IubendaLinks = styled.a`
    background-image: unset !important;
    background-color: unset !important;
    background-repeat: unset !important; 
    background-size: unset !important;
    background-position: unset !important;
    padding-left: unset !important;
    padding: unset !important;
    border: unset !important;
    &:hover {
        -webkit-box-shadow: unset !important;
        box-shadow: unset !important;
        background-color: unset !important;
    }
`;

export const PrivacyCookiesLinks: FC = (): ReactElement => {
    const { privacyPolicyUrl, cookiePolicyUrl }: UseIubendaPolicy = useIubendaPolicy();

    return (
        <FadeInWrapper>
            <Wrapper>
                <IubendaLinks 
                    href={privacyPolicyUrl}
                    className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
                    title="Privacy Policy"
                >
                    <StyledLink 
                    tag="span" 
                    content="Privacy Policy"
                    onClickFunction={(event) => {
                        event.preventDefault();
                    }} 
                    />
                </IubendaLinks>

                <StyledSpace verySmall horizontal />

                <StyledText content="|" tag="span" />

                <StyledSpace verySmall horizontal />

                <IubendaLinks
                    href={cookiePolicyUrl}
                    className="iubenda-white iubenda-noiframe iubenda-embed iubenda-noiframe"
                    title="Cookie Policy"
                >
                    <StyledLink 
                        tag="span" 
                        content="Cookie Policy" 
                        onClickFunction={(event) => {
                            event.preventDefault();
                        }} 
                    />
                </IubendaLinks>

                <StyledSpace verySmall horizontal />

                <StyledText content="|" tag="span" />

                <StyledSpace verySmall horizontal />

                <a href="#" className="cky-banner-element">
                    <StyledLink 
                        tag="span"
                        content="Cookie Preferences"
                        onClickFunction={(event) => {
                            event.preventDefault();
                        }}
                    />
                </a>
            </Wrapper>
        </FadeInWrapper>
    );
};