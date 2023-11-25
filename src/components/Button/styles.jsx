import styled, { css } from 'styled-components'

export const Button = styled.button`
  position: relative;
  overflow: hidden;
  display: inline-block;
  outline: none;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  border: 0px;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  & > span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.8s linear;
    background-color: rgba(255, 255, 255, 0.7);
  }

  ${({ theme, styleType, danger }) => {
    switch (styleType) {
      case 'primary': {
        return css`
          color: #fff;
          background-color: ${danger ? theme.colors.danger : theme.colors.primary};
          /* 
          &:hover {
            background-color: ${danger ? theme.colors.dangerHover : theme.colors.primaryHover};
          } */

          &:hover {
            background-color: ${danger ? theme.colors.dangerActive : theme.colors.primaryActive};
          }

          & > span.ripple {
            background-color: ${danger ? theme.colors.dangerHover : theme.colors.primaryHover};
          }
        `
      }
      case 'text': {
        return css`
          color: ${danger ? theme.colors.danger : theme.colors.text};
          background-color: transparent;

          &:hover {
            color: ${danger ? theme.colors.danger : theme.colors.text};
            background-color: ${danger ? theme.colors.dangerTextHover : theme.colors.textButtonHover};
          }

          &:active {
            color: ${danger ? theme.colors.danger : theme.colors.text};
            background-color: ${danger ? theme.colors.dangerTextActive : theme.colors.textButtonActive};
          }
        `
      }
      case 'default':
      default: {
        return css`
          background-color: #fff;
          border: 1px solid #d9d9d9;
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);

          &:hover {
            color: ${theme.colors.primaryHover};
            border-color: ${theme.colors.primaryHover};
          }

          &:active {
            color: ${theme.colors.primaryActive};
            border-color: ${theme.colors.primaryActive};
          }
        `
      }
    }
  }}

  ${({ theme, size }) => {
    switch (size) {
      case 'small': {
        return css`
          padding: 0 7px;
          height: 24px;
          border-radius: 4px;
          font-size: ${theme.fontSize.md};
        `
      }
      case 'large': {
        return css`
          font-size: ${theme.fontSize.lg};
          height: 40px;
          padding: 6px 15px;
          border-radius: 8px;
        `
      }
      case 'default':
      default: {
        return css`
          padding: 4px 15px;
          height: 32px;
          border-radius: 6px;
          font-size: ${theme.fontSize.md};
        `
      }
    }
  }}

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
