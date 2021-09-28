import { css } from "styled-components";

export const mobile = props => {
  return css`
    @media only screen and (max-width: 900px) {
      ${props}
    }
  `;
};

export const tablet = props => {
  return css`
    @media only screen and (max-width: 769px) {
      ${props}
    }
  `;
};

export const laptop = props => {
  return css`
    @media only screen and (min-width: 992px) {
      ${props}
    }
  `;
};

export const desktop = props => {
  return css`
    @media only screen and (min-width: 1200px) {
      ${props}
    }
  `;
};
