import { FC, ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/FadeInWrapper";
import { StyledLink } from "../themed/StyledLink";
import { StyledText } from "../themed/StyledText";


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const PrivacyCookiesLinks: FC = (): ReactElement => {
    return <FadeInWrapper>
        <Wrapper>
            <a href="#" className="cky-banner-element">
                <StyledLink 
                    content="Privacy Policy" 
                    onClickFunction={(event) => {
                        event.preventDefault();
                    }}
                />
            </a>

            <StyledText content="|" tag="span" />

            <a href="#" className="cky-banner-element">
                <StyledLink 
                    content="Cookie Policy" 
                    onClickFunction={(event) => {
                        event.preventDefault();
                    }}
                />
            </a>

            <StyledText content="|" tag="span" />

            <a href="#" className="cky-banner-element">
                <StyledLink 
                    content="Cookie Preferences" 
                    onClickFunction={(event) => {
                        event.preventDefault();
                    }}
                />
            </a>
        </Wrapper>
    </FadeInWrapper>
}