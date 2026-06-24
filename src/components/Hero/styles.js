import styled from 'styled-components'

export const Container = styled.section`
  background: linear-gradient(
      rgba(255,248,242,.95),
      rgba(255,248,242,.95)
    ),
    url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600');

  background-size: cover;
  background-position: center;

  padding: 80px 16px;
  text-align: center;
`

export const Title = styled.h2`
  max-width: 720px;

  margin: 0 auto;

  color: ${({ theme }) => theme.colors.primary};

  font-size: 46px;
  font-weight: 900;

  line-height: 58px;

  text-shadow: 0 2px 6px rgba(255,255,255,.35);
`