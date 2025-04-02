import { ReactElement } from "react";
import styled, { keyframes, css, RuleSet } from "styled-components";
import { StyledLink } from "../styled/styled-link";
import { StyledButton } from "../styled/styled-button";
import { StyledSpace } from "../styled/styled-space";
import { StyledSection } from "../styled/styled-section";
import { UseScrollY, useScrollY } from "../hooks/useScrollY";

const translateUp = keyframes`
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-100%);
    }
`;

const translateDown = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    div:first-child {
        width: 50%;
    };
    div:last-child {
        width: 20%;
    };
    div {
        width: 50%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
`;

export const Header = (): ReactElement => {

    const {scrollY, latestScrollY}: UseScrollY = useScrollY();
    let animation: RuleSet = css`
        animation: unset;
    `;

    if (scrollY > latestScrollY) {
        animation = css`
            animation: ${translateUp} 0.5s ease-in-out forwards;
        `;
    } else {
        animation = css`
            animation: ${translateDown} 0.5s ease-in-out forwards;
        `;
    }

    return <StyledSection semanticTag={'header'} fixed height={"8vh"} animation={animation} >
        <StyledSpace vertical small />

        <Nav>

            <div>
                <StyledLink 
                    content={'<WebCourses>'} 
                    to="/" 
                    tag={"h1"} 
                    size={'h5'}
                    fontWeight={'900'}
                />
            </div>

            <div>
                <StyledSpace horizontal small />

                <StyledLink 
                    content={'Home'} 
                    to="/"
                    fontWeight={'700'}
                />

                <StyledSpace horizontal small />

                <StyledLink 
                    content={'Courses'} 
                    to="/courses"
                    fontWeight={'700'}
                />

                <StyledSpace horizontal small />\

                <StyledLink 
                    content={'About'} 
                    to="/about"
                    fontWeight={'700'}
                />

                <StyledSpace horizontal small />\

                <StyledLink 
                    content={'Contact'} 
                    to="/contact"
                    fontWeight={'700'}
                />
            </div>

            <div>
                <StyledButton
                    content={'Login Signup'}
                    to={'/login'}
                />
            </div>
        </Nav>

        <StyledSpace vertical small />

    </StyledSection>
}