import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';
import { buttonHoverAnimation } from '@client/animations/styled-button.animation';

/**
 * Props for the `CookieYesStyles` component that controls the dynamic styling of the CookieYes banner.
 * These props must be passed from the parent component using the `useThemeColors` hook,
 * which provides the appropriate colors based on the current theme (light or dark mode).
 * 
 * @property $buttonBackgorundColor Background color for `.cky-btn`, used for the main consent button.
 * @property $backgroundColor General background color used across multiple selectors such as `.cky-preference-center`, `.cky-consent-bar`, and `.cky-preference-content-wrapper`.
 * @property $secondaryBackgorundColor Applied to `[data-cky-tag="detail-powered-by"]` as a secondary visual layer or highlight.
 * @property $textColor Primary text color used in selectors like `.cky-title`, `.cky-notice-des`, `.cky-accordion-btn`, and others.
 * @property $borderColor Border color for `.cky-btn`.
 * @property $hoverColor Hover color used in `.cky-show-desc-btn`.
 * @property $successMessageColor Text color applied to `.cky-always-active`, typically used for confirmed or persistent consent indicators.
*/

type CookieYesStylesProps = {
    $buttonBackgorundColor: string,
    $backgroundColor: string,
    $secondaryBackgorundColor: string
    $textColor: string,
    $borderColor: string,
    $hoverColor: string,
    $successMessageColor: string
}

/**
 * `CookieYesStyles` is a styled-component that applies global styles to the CookieYes banner.
 * The component uses colors passed as props, which should come from the `useThemeColors` hook in the parent component.
 * The appearance of the banner is dynamically adjusted based on the current theme (light or dark mode).
 * 
 * @note The colors must be explicitly passed to this component from the `useThemeColors` hook in the parent component.
 * For more details on the props, refer to the `CookieYesStylesProps`.
 * 
 * @example
 * const { backgroundColorButton, backgroundColor, backgroundColorSecondary, textColor, borderColor, hoverColor, successMessageColor }: ThemeColors = useThemeColors();
 * <CookieYesStyles 
 *   $buttonBackgorundColor={backgroundColorButton} 
 *   $backgroundColor={backgroundColor} 
 *   $secondaryBackgorundColor={backgroundColorSecondary}
 *   $textColor={textColor}
 *   $borderColor={borderColor}
 *   $hoverColor={hoverColor}
 *   $successMessageColor={successMessageColor}
 * />
*/

export type CookieYesStylesType = NamedExoticComponent<CookieYesStylesProps>;

/**
 * The `CookieYesStyles` component applies global styles to the CookieYes banner based on dynamic props, 
 * which are passed from the parent component. For more details on the props, refer to the `CookieYesStylesType`.
*/

export const CookieYesStyles: CookieYesStylesType = createGlobalStyle<CookieYesStylesProps>`
    .cky-btn-revisit-wrapper {
        display: none !important;
    }
    .cky-btn  {
        color: ${({$backgroundColor}) => $backgroundColor} !important;
        background-color: ${({$buttonBackgorundColor}) => $buttonBackgorundColor} !important;
        border-color: ${({$borderColor}) => $borderColor} !important;
        position: relative;
        ${() => buttonHoverAnimation}
        &:hover {
            opacity: 0.9999999 !important;
        }
    }
    .cky-preference-center {
        background-color: ${({$backgroundColor}) => $backgroundColor} !important;
    }
    [data-cky-tag="detail-powered-by"] {
        background-color: ${({$secondaryBackgorundColor}) => $secondaryBackgorundColor} !important;
        color: ${({$textColor}) => $textColor} !important;
    }
    .cky-consent-bar, .cky-preference-content-wrapper {
        color: ${({$textColor}) => $textColor} !important;
        background-color: ${({$backgroundColor}) =>  $backgroundColor} !important;  
    }
    .cky-title, .cky-notice-des, .cky-consent-bar, .cky-preference-title, .cky-accordion-btn, .cky-btn-customize::after, .cky-accordion-header-des, .cky-preference-content-wrapper p {
        color: ${({$textColor}) => $textColor} !important; 
    }
    .cky-show-desc-btn {
        color: ${({$hoverColor}) => $hoverColor} !important;
    }
    .cky-always-active {
        color: ${({$successMessageColor}) => $successMessageColor}
    }
    .cky-consent-bar .cky-btn-customize::after {
        top: 0px !important;
        right: 0px !important;
        border-left: 0px !important;
        border-right: 0px !important;
        border-top: 0px !important;
        border-top-color: unset !important;
    }
    .cky-btn-customize {
        padding: unset !important;
    }
    .cky-consent-container .cky-consent-bar {
        border: unset !important;
    }
`;