import styled from 'styled-components'

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding:12px;
  border-radius: 8px;

  box-shadow: 0 8px 20px rgba(230,103,103,.25);

  transition: .3s;

  &:hover{
    transform: translateY(-5px);
  }
`

export const Image = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  margin-bottom:12px;
`

export const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom:12px;
`

export const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom:12px;
`