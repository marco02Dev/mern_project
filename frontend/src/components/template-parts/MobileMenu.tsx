import styled from "styled-components";
import { NavLinks } from "../ui/NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ReactNode, useContext, useEffect } from "react";
import { ThemeModeContext, ThemeModeContextProps } from "../../contexts/ThemeModeProvider";
import useLocationChange from "../../hooks/useLocationChange";
import { closeMenu } from "../../store/slices/menu.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery, UseMediaQuery } from "../../hooks/useMediaQuery";

type MobileMenuWrapperProps = {
  $isOpened: boolean;
  $backgroundColor: string;
  $isMobileDevices: boolean;
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
  flex-direction: column;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  span {
    ${({$isMobileDevices}) => $isMobileDevices && "line-height: clamp(3vh, 4vh + 2vw, 100vw) !important"};
  }
`;

export const MobileMenu = (): ReactNode => {
  const hasLocationChanged: boolean = useLocationChange();
  const { isTablet, isMobile }: UseMediaQuery = useMediaQuery();
  const isOpened = useSelector(({menu}: RootState) => menu.isOpened);
  const { mode }: ThemeModeContextProps = useContext(ThemeModeContext);
  const dispatch: Dispatch = useDispatch();

  const backgroundColor: string = mode === "dark" ? "black" : "white";

  useEffect(():void => {
    dispatch(closeMenu())
  }, [hasLocationChanged])

  return (
    <>
      <MobileMenuWrapper $isMobileDevices={isMobile || isTablet} $isOpened={isOpened} $backgroundColor={backgroundColor}>
        <NavLinks />
      </MobileMenuWrapper>
    </>
  );
};
