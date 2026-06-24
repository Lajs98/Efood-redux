import styled from 'styled-components'

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 32px 0;
`

export const HeaderContent = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.primary};

  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 32px;
  }

  span,
  button {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    background: transparent;
  }
`

export const Banner = styled.section`
  height: 280px;
  background:
    linear-gradient(
      rgba(230, 103, 103, 0.45),
      rgba(0, 0, 0, 0.35)
    ),
    url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop');

  background-size: cover;
  background-position: center;
`

export const BannerContent = styled.div`
  max-width: 1024px;
  height: 100%;
  margin: 0 auto;
  padding: 32px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);

  span {
    font-size: 24px;
    font-weight: 400;
  }

  h2 {
    font-size: 40px;
    font-weight: 900;
  }
`

export const Container = styled.main`
  max-width: 1024px;
  margin: 56px auto;
  padding: 0 16px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`

export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

export const ModalContent = styled.div`
  position: relative;
  z-index: 11;
  max-width: 1024px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 32px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;

  h3 {
    font-size: 18px;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }

  button {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 4px 8px;
    font-weight: bold;
  }
`

export const ModalImage = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
`

export const Close = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;
`

export const Cart = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
`

export const CartOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
`

export const CartContent = styled.aside`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 21;
  width: 360px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 32px 8px;
  color: ${({ theme }) => theme.colors.white};

  h3 {
    margin-bottom: 16px;
  }
`

export const CloseCart = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: bold;
`

export const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  padding: 8px;
  margin-bottom: 16px;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }

  strong,
  span {
    display: block;
    margin-bottom: 8px;
  }

  button {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0 16px;
`

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const Form = styled.div`
  h3 {
    margin-bottom: 16px;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    height: 32px;
    margin-bottom: 8px;
    border: none;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`

export const BackButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`

export const Success = styled.div`
  h3 {
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 24px;
  }
`