import styled, { css } from 'styled-components'

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ padding }) => padding};

  ${({ active }) =>
    active &&
    css`
      background-color: yellow;
      border: 3px solid red;
    `}
`

export const Wrapper = styled.div`
  & > ${Button} {
    background-color: blue;
  }
`
