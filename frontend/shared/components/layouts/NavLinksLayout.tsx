import { ReactElement, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { NavLinksLoop } from "@shared/components/loops/NavLinksLoop";
import { headerLinks } from "@shared/config/header-links.config";

const Wrapper = styled.div<{$row?: boolean}>`
    display: flex;
    flex-direction: ${({ $row }) => ($row ? "row" : "column")};
    align-items: center;
`;

type NavLinksLayoutProps = {
    row?: boolean;
    setDesktopButtonStartDelay?: Dispatch<SetStateAction<string | undefined>>;
}

export const NavLinksLayout: FC<NavLinksLayoutProps> = ({row, setDesktopButtonStartDelay}: NavLinksLayoutProps): ReactElement => {
    return (
        <Wrapper $row={row}>
            <NavLinksLoop links={headerLinks} row={row} setDesktopButtonStartDelay={setDesktopButtonStartDelay} />
        </Wrapper>
    );
};
