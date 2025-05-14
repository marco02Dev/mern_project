import { NamedExoticComponent } from 'react';
import { createGlobalStyle } from 'styled-components';

/**
 * `GlobalStyles` defines global CSS rules applied across the entire application.
 * 
 * It includes base layout settings such as:
 * - Hiding horizontal overflow on the body
 * - Making the `#root` element fill the viewport height
 * - Hiding scrollbars on WebKit-based browsers
 * 
 * This component should be included once at the root of the app to ensure consistent global behavior.
 *
 * @example
 * import { GlobalStyles } from './GlobalStyles';
 * 
 * function App() {
 *   return (
 *     <>
 *       <GlobalStyles />
 *       <MainRoutes />
 *     </>
 *   );
 * }
*/

export const GlobalStyles: NamedExoticComponent = createGlobalStyle`
    body {
        overflow-x: hidden;
        height: 100%;
        #root {
            position: relative;
            height: 100vh;
        }
        
    }

    ::-webkit-scrollbar {
        display: none;
    }
`;