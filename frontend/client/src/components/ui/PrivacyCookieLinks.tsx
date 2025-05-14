import { FC, ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledLink } from "../themed/StyledLink";
import { StyledText } from "../themed/StyledText";
import { StyledSpace } from "../themed/StyledSpace";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const PrivacyCookiesLinks: FC = (): ReactElement => {
    return <FadeInWrapper>
        <Wrapper>
            <StyledLink 
                tag="span"
                content="Privacy Policy" 
                to="/privacy-policy"
            />

            <StyledSpace verySmall horizontal />

            <StyledText content="|" tag="span" />

            <StyledSpace verySmall horizontal />

            <StyledLink 
                tag="span"
                content="Cookie Policy" 
                to="/cookie-policy"
            />

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
}