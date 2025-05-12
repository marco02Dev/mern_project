import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

type CookieYesStylesProps = {
    $buttonBackgorundColor: string,
    $backgroundColor: string,
    $textColor: string
}

export type CookieYesStylesType = NamedExoticComponent<CookieYesStylesProps>;

export const CookieYesStyles: CookieYesStylesType = createGlobalStyle<CookieYesStylesProps>`
    .cky-btn-revisit-wrapper, .cky-btn  {
        color: ${({$backgroundColor}) => $backgroundColor} !important;
        background-color: ${({$buttonBackgorundColor}) => $buttonBackgorundColor} !important;
    }
    .cky-consent-bar, .cky-preference-center {
        color: ${({$textColor}) => $textColor} !important;
        background-color: ${({$backgroundColor}) =>  $backgroundColor} !important;  
    }
`;