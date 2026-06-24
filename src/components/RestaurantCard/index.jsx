import { Link } from 'react-router-dom'

import Button from '../Button'
import * as S from './styles'

function RestaurantCard({ restaurant }) {
  return (
    <S.Card>
      <S.Image src={restaurant.capa} alt={restaurant.titulo} />

      <S.Content>
        <S.Header>
          <S.Title>{restaurant.titulo}</S.Title>
          <S.Rating>{restaurant.avaliacao} ★</S.Rating>
        </S.Header>

        <S.Description>{restaurant.descricao}</S.Description>

        <Button as={Link} to={`/perfil/${restaurant.id}`}>
          Saiba mais
        </Button>
      </S.Content>
    </S.Card>
  )
}

export default RestaurantCard