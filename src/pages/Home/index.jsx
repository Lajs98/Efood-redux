import { useEffect, useState } from 'react'

import Header from '../../components/Header'
import Hero from '../../components/Hero'
import RestaurantCard from '../../components/RestaurantCard'
import Footer from '../../components/Footer'

import api from '../../services/api'

import * as S from './styles'

function Home() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    api.get('/restaurantes').then((response) => {
      setRestaurants(response.data)
    })
  }, [])

  return (
    <>
      <Header />
      <Hero />

      <S.Container>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </S.Container>

      <Footer />
    </>
  )
}

export default Home