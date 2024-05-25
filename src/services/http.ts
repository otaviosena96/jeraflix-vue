import axios from 'axios'
import { computed } from 'vue'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

const token = computed(() => {
  try {
    const tokenString = localStorage.getItem('user_logged')
    if (!tokenString) return null
    const token = JSON.parse(tokenString)
    return token.token
  } catch (error) {
    console.error('Error parsing token:', error)
    return null
  }
})

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

export default axiosInstance
