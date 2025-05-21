import { css, RuleSet } from 'styled-components';

export const fadeInWrapperAnimation: RuleSet<{$delayed?: string}> = css<{$delayed?: string}>`
  opacity: 0;
  transition: opacity 1s ease-in-out ${({$delayed}) => $delayed && $delayed};

  &.in-view {
    opacity: 1;
  }
`;