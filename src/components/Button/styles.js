import styled from 'styled-components'

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  letter-spacing:.4px;

  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  font-weight: bold;
  font-size: 14px;

  border: none;
  border-radius: 6px;

  transition: .25s;

  &:hover{
    filter: brightness(1.08);
    transform: scale(1.02);
  }
`