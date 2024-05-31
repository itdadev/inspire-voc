import { css, Global } from '@emotion/react';
// phone input styling
import 'react-phone-number-input/style.css';
import Theme from '@/theme';

const style = css`
  //  Nanum Sqaure
  @import url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css');

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    line-height: 1.2;
    overflow-x: hidden;
  }

  body {
    font-family: ${Theme.fontFamily.primaryFont};
    overflow-x: hidden;
    box-sizing: border-box;
    font-size: 1.6rem;
    padding: 0;
    margin: 0;
    word-break: keep-all;
    max-width: 100vw;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  a {
    color: inherit;
    font-size: inherit;
    text-decoration: none;
  }

  ul,
  li {
    list-style: none;
  }

  button {
    color: inherit;
    font: inherit;
    cursor: pointer;
    background: inherit;
  }
`;

function GlobalStyles() {
  return <Global styles={style} />;
}

export default GlobalStyles;
