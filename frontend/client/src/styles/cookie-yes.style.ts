import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

type CookieYesStylesProps = {
    $buttonBackgorundColor: string
}

export type CookieYesStylesType = NamedExoticComponent<CookieYesStylesProps>;

export const CookieYesStyles: CookieYesStylesType = createGlobalStyle<CookieYesStylesProps>`
    .cky-btn-revisit-wrapper {
        background-color: ${({$buttonBackgorundColor}) => $buttonBackgorundColor} !important;
    }
`;