import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

type CookieYesStylesProps = {
    $buttonBackgorundColor: string,
    $backgroundColor: string,
    $textColor: string,
    $borderColor: string
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
    .cky-title, .cky-notice-des, .cky-consent-bar .cky-btn-customize::after {
        color: ${({$textColor}) => $textColor} !important; 
    }
`;