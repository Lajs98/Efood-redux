import styled from 'styled-components'

export const Container = styled.header`
  background: linear-gradient(
  90deg,
  #FFEBD9,
  #FFF8F2,
  #FFEBD9
);
  padding: 32px 0;
  text-align: center;
  
`

export const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 42px;
  font-weight: bold;
`