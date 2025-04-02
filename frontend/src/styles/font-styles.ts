import { createGlobalStyle } from 'styled-components';

export const FontStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap');

    body {
        font-family: 'Source Serif 4', serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, p, span, a, li, div {
        font-family: 'Source Serif 4', serif;
        font-weight: normal;
        letter-spacing: 0.1vh;
    }

    h2, a {
        font-weight: 700;
    }

    p {
        font-weight: 500; 
    }
`;