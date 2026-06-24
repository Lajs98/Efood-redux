import styled from 'styled-components'

export const Container = styled.main`
  max-width: 1024px;
  width: 100%;
  margin:64px auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px 80px;
`