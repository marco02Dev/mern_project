import styled from "styled-components";
import { NavLinks } from "../ui/nav-links";
import { useSelector } from "react-redux";
import { RootState } from "../../store";  // Importa RootState
import { ReactElement, useContext } from "react";
import { colors } from "../../config/colors.config";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/theme-mode.context";

type MobileMenuWrapperProps = {
  $isOpened: boolean;
  $backgroundColor: string;
};

const MobileMenuWrapper = styled.section<MobileMenuWrapperProps>`
  width: 100%;
  height: 100vh;
  z-index: 100;
  position: fixed;
  right: ${({ $isOpened }) => ($isOpened ? "0%" : "-100%")};
  transition: right 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const MobileMenu = (): ReactElement => {
  const isOpened = useSelector(({menu}: RootState) => menu.isOpened);
  const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);

  const backgroundColor: string =
    mode === "dark" ? colors.dark.BackgroundColor : colors.light.BackgroundColor;

  return (
    <>
      <MobileMenuWrapper $isOpened={isOpened} $backgroundColor={backgroundColor}>
        <NavLinks />
      </MobileMenuWrapper>
    </>
  );
};
