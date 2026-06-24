import styled from 'styled-components'

export const Container = styled.footer`
  margin-top: 80px;
  padding: 48px 16px;
  background: linear-gradient(
    90deg,
    #FFEBD9,
    #FFF8F2,
    #FFEBD9
  );
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};

  h2 {
    font-size:42px;
    margin-bottom: 16px;
  }

  p {
    max-width: 760px;
    margin: 0 auto;
    font-size: 12px;
    line-height: 20px;
  }
`