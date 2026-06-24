import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-ebac.vercel.app/api/efood'
})

export default api