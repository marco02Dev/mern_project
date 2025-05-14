import { createGlobalStyle } from 'styled-components';
import { mainFont } from '@shared/config/font.config';

/**
 * `FontStyles` is a global style component using `styled-components`' `createGlobalStyle`
 * to apply custom font styles throughout the application.
 * 
 * It sets the base `font-family` to the configured `mainFont` (from `font.config`) and 
 * adjusts font weights and letter spacing for common text elements (`h1`–`h6`, `p`, `a`, `span`, etc.).
 * 
 * This ensures a consistent typographic style aligned with the design system.
 *
 * @example
 * import { FontStyles } from './FontStyles';
 * 
 * function App() {
 *   return (
 *     <>
 *       <FontStyles />
 *       <YourApp />
 *     </>
 *   );
 * }
*/

export const FontStyles = createGlobalStyle`
    body {
        font-family: ${mainFont}, serif;
        font-weight: 400;

        h1, h2, h3, h4, h5, h6, p, span, a, li, div, input, label {
            font-family: ${mainFont}, serif;
            font-weight: normal;
            letter-spacing: clamp(-0.1vh, -0.1vh + 0.1vw, 100vw);
        }

        h1, h2 {
            font-weight: 600 !important;
        }

        a, span {
            font-weight: 500 !important;
        }

        p {
            font-weight: 400 !important; 
        }
    }
`;