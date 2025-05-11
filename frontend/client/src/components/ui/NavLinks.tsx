import { ReactElement, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { NavLinksLoop } from "../loops/NavLinksLoop";
import { headerLinks } from "../../config/header-links.config";

const NavLinksWrapper = styled.div<{$row?: boolean}>`
    display: flex;
    flex-direction: ${({ $row }) => ($row ? "row" : "column")};
    align-items: center;
`;

type NavLinksProps = {
    row?: boolean;
    setDesktopButtonStartDelay?: Dispatch<SetStateAction<string | undefined>>;
}

export const NavLinks: FC<NavLinksProps> = ({row, setDesktopButtonStartDelay}: NavLinksProps): ReactElement => {
    return (
        <NavLinksWrapper $row={row}>
        <NavLinksLoop links={headerLinks} row={row} setDesktopButtonStartDelay={setDesktopButtonStartDelay} />
      </NavLinksWrapper>
    );
};
