import { createGlobalStyle, css } from "styled-components";

const cssVariables = css`
  --sp-xs: 0.25rem;
  --sp-s: 0.5rem;
  --sp-m: 1rem;
  --sp-l: 1.5rem;
  --sp-xl: 3rem;

  --textbox-x: 0.8rem;
  --textbox-y: 0.4rem;
  --textbox: 0.4rem 1rem;

  --pagePadding: calc(var(--sp-s) + 2vw);

  --buttonHeight: 1.75rem;

  --c-fieldHover: hsla(0, 0%, 0%, 0.15);
  --c-fieldFocus: hsla(0, 0%, 0%, 0.3);
  --c-background: hsl(0, 0%, 100%);
  --c-body: hsl(0, 0%, 20%);
  --c-body-secondary: hsl(0, 0%, 60%);
  --c-button: hsla(0, 0%, 0%, 0.08);
  --c-buttonHover: hsla(0, 0%, 0%, 0.15);
  --c-buttonActive: hsla(0, 0%, 0%, 0.2);
  --c-fade: hsla(0, 0%, 0%, 0.4);
  --c-backgroundAlt: hsla(0, 0%, 0%, 0.07);
`;

const BaseStyles = createGlobalStyle`
  :root {
    ${cssVariables}
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    background-color: var(--c-background);
    color: var(--c-body);
  }

  a {
    text-decoration: none;
  }
`;

export default BaseStyles;
