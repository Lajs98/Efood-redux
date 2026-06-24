import styled from 'styled-components'

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(230, 103, 103, 0.15);

  transition: all .3s ease;

  &:hover{
    transform: translateY(-6px);
    box-shadow: 0 18px 35px rgba(230,103,103,.25);
  }
`

export const Image = styled.img`
  width: 100%;
  height: 230px;
  object-fit: cover;
`

export const Content = styled.div`
  padding:12px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: bold;
`

export const Rating = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  font-weight: bold;
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`