import { StyledLink } from "../../styles/styled-link";
import { StyledSpace } from "../../styles/styled-space";
import { ReactElement } from "react";
import styled from "styled-components";
import { FadeInWrapper } from "../animated/fade-in-wrapper";

const NavLinksWrapper = styled.div<{row?: boolean}>`
    display: flex;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    align-items: center;
`;

export const NavLinks = ({row}: {row?: boolean}): ReactElement => {

    return (
        <NavLinksWrapper row={row}>
            <FadeInWrapper>
                <StyledLink content="Home" to="/" fontWeight="700" size={row ? "p" : "h3"} />
            </FadeInWrapper>

            <StyledSpace horizontal={row} vertical={!row} small={row} medium={!row} />

            <FadeInWrapper>
                <StyledLink content="Courses" to="/courses" fontWeight="700" size={row ? "p" : "h3"} />
            </FadeInWrapper>

            <StyledSpace horizontal={row} vertical={!row} small={row} medium={!row} />

            <FadeInWrapper>
                <StyledLink content="About" to="/about" fontWeight="700" size={row ? "p" : "h3"} />
            </FadeInWrapper>

        </NavLinksWrapper>
    );
};
