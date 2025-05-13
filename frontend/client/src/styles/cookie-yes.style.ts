import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';
import { buttonHoverAnimation } from '@client/animations/styled-button.animation';

type CookieYesStylesProps = {
    $buttonBackgorundColor: string,
    $backgroundColor: string,
    $secondaryBackgorundColor: string
    $textColor: string,
    $borderColor: string,
    $hoverColor: string,
    $successMessageColor: string
}

export type CookieYesStylesType = NamedExoticComponent<CookieYesStylesProps>;

export const CookieYesStyles: CookieYesStylesType = createGlobalStyle<CookieYesStylesProps>`
    .cky-btn-revisit-wrapper, .cky-btn  {
        color: ${({$backgroundColor}) => $backgroundColor} !important;
        background-color: ${({$buttonBackgorundColor}) => $buttonBackgorundColor} !important;
        border-color: ${({$borderColor}) => $borderColor} !important;
    }
    .cky-preference-center {
        background-color: ${({$buttonBackgorundColor}) => $buttonBackgorundColor} !important;
    }
    .cky-btn {
        position: relative;
        ${() => buttonHoverAnimation}
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
`;