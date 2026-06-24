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
  const [orderId, setOrderId] = useState(null)
  const [deliveryData, setDeliveryData] = useState({
    receiver: '',
    address: '',
    city: '',
    zipCode: '',
    number: '',
    complement: ''
  })

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    cvv: '',
    month: '',
    year: ''
    })
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

function validateDelivery() {
  if (
    !deliveryData.receiver ||
    !deliveryData.address ||
    !deliveryData.city ||
    !deliveryData.zipCode ||
    !deliveryData.number
  ) {
    alert('Preencha todos os campos obrigatórios da entrega.')
    return false
  }

  return true
}

function validatePayment() {
  if (
    !paymentData.cardName ||
    !paymentData.cardNumber ||
    !paymentData.cvv ||
    !paymentData.month ||
    !paymentData.year
  ) {
    alert('Preencha todos os campos obrigatórios do pagamento.')
    return false
  }

  return true
}

function finishOrder() {
  const payload = {
    products: cartItems.map((item) => ({
      id: item.id,
      price: item.preco
    })),
    delivery: {
      receiver: deliveryData.receiver,
      address: {
        description: deliveryData.address,
        city: deliveryData.city,
        zipCode: deliveryData.zipCode,
        number: Number(deliveryData.number),
        complement: deliveryData.complement
      }
    },
    payment: {
      card: {
        name: paymentData.cardName,
        number: paymentData.cardNumber,
        code: Number(paymentData.cvv),
        expires: {
          month: Number(paymentData.month),
          year: Number(paymentData.year)
        }
      }
    }
  }

  api
    .post('/checkout', payload)
    .then((response) => {
      setOrderId(response.data.orderId)
      setCheckoutStep('success')
    })
    .catch((error) => {
      console.log(error)
      alert('Erro ao finalizar pedido. Verifique os dados e tente novamente.')
    })
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
                <input
                  type="text"
                  value={deliveryData.receiver}
                  onChange={(e) =>
                    setDeliveryData({
                      ...deliveryData,
                      receiver: e.target.value
                    })
                  }
                />

                <label>Endereço</label>
                <input
                  type="text"
                  value={deliveryData.address}
                  onChange={(e) =>
                    setDeliveryData({
                      ...deliveryData,
                      address: e.target.value
                    })
                  }
                />

                <label>Cidade</label>
                <input
                  type="text"
                  value={deliveryData.city}
                  onChange={(e) =>
                    setDeliveryData({
                      ...deliveryData,
                      city: e.target.value
                    })
                  }
                />

                <S.Row>
                  <div>
                    <label>CEP</label>
                    <input
                      type="text"
                      value={deliveryData.zipCode}
                      onChange={(e) =>
                      setDeliveryData({
                        ...deliveryData,
                        zipCode: e.target.value.replace(/\D/g, '')
                      })
                    }
                  />
                  </div>

                  <div>
                    <label>Número</label>
                    <input
                      type="text"
                      value={deliveryData.number}
                      onChange={(e) =>
                        setDeliveryData({
                          ...deliveryData,
                          number: e.target.value.replace(/\D/g, '')
                        })
                      }
                    />
                  </div>
                </S.Row>

                <label>Complemento</label>
                  <input
                type="text"
                value={deliveryData.complement}
                onChange={(e) =>
                  setDeliveryData({
                    ...deliveryData,
                    complement: e.target.value
                  })
                }
              />
                
                <S.CheckoutButton
                  onClick={() => {
                    if (validateDelivery()) {
                      setCheckoutStep('payment')
                    }
                  }}
                >
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
                <input
                  type="text"
                  value={paymentData.cardName}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      cardName: e.target.value
                    })
                  }
                />

                <label>Número do cartão</label>
                <input
                  type="text"
                  maxLength="16"
                  value={paymentData.cardNumber}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      cardNumber: e.target.value.replace(/\D/g, '')
                    })
                  }
                />

                <S.Row>
                  <div>
                    <label>CVV</label>
                    <input
                      type="text"
                      maxLength="3"
                      value={paymentData.cvv}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cvv: e.target.value.replace(/\D/g, '')
                        })
                      }
                    />
                  </div>

                  <div>
                    <label>Mês de vencimento</label>
                    <input
                      type="text"
                      maxLength="2"
                      value={paymentData.month}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          month: e.target.value.replace(/\D/g, '')
                        })
                      }
                    />
                  </div>
                </S.Row>

                <label>Ano de vencimento</label>
                <input
                  type="text"
                  maxLength="4"
                  value={paymentData.year}
                  onChange={(e) =>
                    setPaymentData({
                      ...paymentData,
                      year: e.target.value.replace(/\D/g, '')
                    })
                  }
                />

                <S.CheckoutButton
                  onClick={() => {
                    if (validatePayment()) {
                      finishOrder()
                    }
                  }}
                >
                  Finalizar pagamento
                </S.CheckoutButton>

                <S.BackButton onClick={() => setCheckoutStep('delivery')}>
                  Voltar para a entrega
                </S.BackButton>
              </S.Form>
            )}

            {checkoutStep === 'success' && (
              <S.Success>
                <h3>Pedido realizado - {orderId}</h3>

                <p>
                  Pedido realizado em nome de <strong>{deliveryData.receiver}</strong>.
                </p>

                <p>
                  Entrega em: <strong>{deliveryData.address}, {deliveryData.number}</strong> -{' '}
                  <strong>{deliveryData.city}</strong>, CEP{' '}
                  <strong>{deliveryData.zipCode}</strong>.
                </p>

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