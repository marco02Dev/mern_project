// animations/fadeIn.ts
import { css, RuleSet } from 'styled-components';

export const fadeIn: RuleSet = css`
  opacity: 0;
  transition: opacity 1s ease-in-out;

  &.in-view {
    opacity: 1;
  }
`;