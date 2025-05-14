import styled from "styled-components";
import { NavLinksLayout } from "../layouts/NavLinksLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { FC, ReactNode, useEffect } from "react";
import useLocationChange, { UseLocationChange } from "../../hooks/navigation/useLocationChange";
import { closeMenu } from "../../store/slices/menu.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useMediaQuery, UseMediaQuery } from "../../hooks/ui/useMediaQuery";
import { ThemeColors, useThemeColors } from "../../hooks/theme/useThemeColors";

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

export const MobileMenu: FC = (): ReactNode => {
  const hasLocationChanged: UseLocationChange = useLocationChange();
  const { isTablet, isMobile }: UseMediaQuery = useMediaQuery();
  const isOpened: boolean = useSelector(({menu}: RootState) => menu.isOpened);
  const { backgroundColor }: ThemeColors = useThemeColors();
  const dispatch: Dispatch = useDispatch();

  useEffect(():void => {
    dispatch(closeMenu())
  }, [hasLocationChanged])

  return (
    <>
      <MobileMenuWrapper $isMobileDevices={isMobile || isTablet} $isOpened={isOpened} $backgroundColor={backgroundColor}>
        <NavLinksLayout />
      </MobileMenuWrapper>
    </>
  );
};
