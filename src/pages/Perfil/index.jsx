import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import ProductCard from '../../components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove, clear } from '../../store/reducers/cart'
import Footer from '../../components/Footer'
import * as S from './styles'

function Perfil() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState('cart')
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  useEffect(() => {
    api.get(`/restaurantes/${id}`).then((response) => {
      setRestaurant(response.data)
    })
  }, [id])

  function addToCart(product) {
    dispatch(add(product))
    setSelectedProduct(null)
    setIsCartOpen(true)
    setCheckoutStep('cart')
  }

  function removeFromCart(indexToRemove) {
    dispatch(remove(indexToRemove))
  }

  function closeCart() {
    setIsCartOpen(false)
    setCheckoutStep('cart')
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco,
    0
  )

  return (
    <>
      <S.Header>
        <S.HeaderContent>
          <span>Restaurantes</span>
          <strong>efood</strong>
          <button onClick={() => setIsCartOpen(true)}>
            {cartItems.length} produto(s) no carrinho
          </button>
        </S.HeaderContent>
      </S.Header>

      <S.Banner>
        <S.BannerContent>
          <span>{restaurant?.tipo}</span>
          <h2>{restaurant?.titulo}</h2>
        </S.BannerContent>
      </S.Banner>

      <S.Container>
        {restaurant?.cardapio.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </S.Container>

      <Footer />

      {selectedProduct && (
        <S.Modal>
          <S.ModalContent>
            <S.ModalImage
              src={selectedProduct.foto}
              alt={selectedProduct.nome}
            />

            <div>
              <S.Close onClick={() => setSelectedProduct(null)}>x</S.Close>

              <h3>{selectedProduct.nome}</h3>

              <p>{selectedProduct.descricao}</p>

              <button onClick={() => addToCart(selectedProduct)}>
                Adicionar ao carrinho -{' '}
                {selectedProduct.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </button>
            </div>
          </S.ModalContent>

          <S.Overlay onClick={() => setSelectedProduct(null)} />
        </S.Modal>
      )}

      {isCartOpen && (
        <S.Cart>
          <S.CartContent>
            <S.CloseCart onClick={closeCart}>x</S.CloseCart>

            {checkoutStep === 'cart' && (
              <>
                <h3>Carrinho</h3>

                {cartItems.map((item, index) => (
                  <S.CartItem key={`${item.id}-${index}`}>
                    <img src={item.foto} alt={item.nome} />

                    <div>
                      <strong>{item.nome}</strong>
                      <span>
                        {item.preco.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </span>
                      <button onClick={() => removeFromCart(index)}>Remover</button>
                    </div>
                  </S.CartItem>
                ))}

                <S.Total>
                  <strong>Valor total</strong>
                  <strong>
                    {total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </strong>
                </S.Total>

                <S.CheckoutButton
                  disabled={cartItems.length === 0}
                  onClick={() => setCheckoutStep('delivery')}
                >
                  Continuar com a entrega
                </S.CheckoutButton>
              </>
            )}

            {checkoutStep === 'delivery' && (
              <S.Form>
                <h3>Entrega</h3>

                <label>Quem irá receber</label>
                <input type="text" />

                <label>Endereço</label>
                <input type="text" />

                <label>Cidade</label>
                <input type="text" />

                <S.Row>
                  <div>
                    <label>CEP</label>
                    <input type="text" />
                  </div>

                  <div>
                    <label>Número</label>
                    <input type="text" />
                  </div>
                </S.Row>

                <label>Complemento</label>
                <input type="text" />

                <S.CheckoutButton onClick={() => setCheckoutStep('payment')}>
                  Continuar com o pagamento
                </S.CheckoutButton>

                <S.BackButton onClick={() => setCheckoutStep('cart')}>
                  Voltar para o carrinho
                </S.BackButton>
              </S.Form>
            )}

            {checkoutStep === 'payment' && (
              <S.Form>
                <h3>
                  Pagamento - Valor a pagar{' '}
                  {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </h3>

                <label>Nome no cartão</label>
                <input type="text" />

                <label>Número do cartão</label>
                <input type="text" />

                <S.Row>
                  <div>
                    <label>CVV</label>
                    <input type="text" />
                  </div>

                  <div>
                    <label>Mês de vencimento</label>
                    <input type="text" />
                  </div>
                </S.Row>

                <label>Ano de vencimento</label>
                <input type="text" />

                <S.CheckoutButton onClick={() => setCheckoutStep('success')}>
                  Finalizar pagamento
                </S.CheckoutButton>

                <S.BackButton onClick={() => setCheckoutStep('delivery')}>
                  Voltar para a entrega
                </S.BackButton>
              </S.Form>
            )}

            {checkoutStep === 'success' && (
              <S.Success>
                <h3>Pedido realizado - 123456</h3>

                <p>
                  Estamos felizes em informar que seu pedido já está em processo
                  de preparação e, em breve, será entregue no endereço fornecido.
                </p>

                <p>
                  Gostaríamos de ressaltar que nossos entregadores não estão
                  autorizados a realizar cobranças extras.
                </p>

                <S.CheckoutButton
                  onClick={() => {
                    dispatch(clear())
                    closeCart()
                  }}
                >
                  Concluir
                </S.CheckoutButton>
              </S.Success>
            )}
          </S.CartContent>

          <S.CartOverlay onClick={closeCart} />
        </S.Cart>
      )}
    </>
  )
}

export default Perfil