import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

type CookieYesStylesProps = {
    $buttonBackgorundColor: string,
    $backgroundColor: string,
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
        border-color: ${({$borderColor}) => $borderColor};
    }
    .cky-consent-bar, .cky-preference-center {
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
`;