import { css } from "styled-components";

export const mobile = props => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const tablet = props => {
  return css`
    @media only screen and (min-width: 768px) {
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
