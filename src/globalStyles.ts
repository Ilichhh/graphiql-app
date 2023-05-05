import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import theme from './theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const GlobalStyles = createGlobalStyle`
  ${normalize}
  body {
    height: 100vh;
    font-family: 'Roboto', sans-serif;
  }
  * {
    box-sizing: border-box;
  }
  .cm-scroller {
    overflow-x: visible !important;
  }
`;

export default GlobalStyles;
