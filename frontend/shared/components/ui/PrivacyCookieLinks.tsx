import { FC, ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledLink } from "../themed/StyledLink";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";
import { useIubendaPolicy, UseIubendaPolicy } from "@shared/hooks/theme/useIubendaPolicy";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const PrivacyCookiesLinks: FC = (): ReactElement => {
    const { privacyPolicyUrl, cookiePolicyUrl }: UseIubendaPolicy = useIubendaPolicy();

    return (
        <FadeInWrapper>
            <Wrapper>
                <a 
                    href={privacyPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Privacy Policy"
                >
                    <StyledLink tag="span" content="Privacy Policy" />
                </a>

                <StyledSpace verySmall horizontal />

                <StyledText content="|" tag="span" />

                <StyledSpace verySmall horizontal />

                <a 
                    href={cookiePolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Cookie Policy"
                >
                    <StyledLink tag="span" content="Cookie Policy" />
                </a>

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
