import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
        overflow-x: hidden;
        height: 100%;
        #root {
            position: relative;
            height: 100vh;
        }
    }
`;