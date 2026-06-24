import Button from '../Button'
import * as S from './styles'

function ProductCard({ product, onClick }) {
  return (
    <S.Card>
      <S.Image src={product.foto} alt={product.nome} />

      <S.Title>{product.nome}</S.Title>

      <S.Description>{product.descricao}</S.Description>

      <Button onClick={onClick}>Adicionar ao carrinho</Button>
    </S.Card>
  )
}

export default ProductCard