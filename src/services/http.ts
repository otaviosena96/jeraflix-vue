import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Função que retorna o token atualizado
const getToken = () => {
  try {
    const tokenString = localStorage.getItem('user_logged')
    if (!tokenString) return null
    const token = JSON.parse(tokenString)
    return token.token
  } catch (error) {
    console.error('Error parsing token:', error)
    return null
  }
}

// Interceptador para atualizar dinamicamente o cabeçalho de autorização com o token atualizado
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
