import { ReactElement, FC, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { NavLinksLoop } from "../loops/NavLinksLoop";

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

    const links = [
        { name: 'Home', to: '/' },
        { name: 'Courses', to: '/courses' },
        { name: 'About', to: '/about' },
        { name: 'Contact', to: '/contact' },
    ];

    return (
        <NavLinksWrapper $row={row}>
        <NavLinksLoop links={links} row={row} setDesktopButtonStartDelay={setDesktopButtonStartDelay} />
      </NavLinksWrapper>
    );
};
