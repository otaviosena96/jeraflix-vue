import { defineStore } from 'pinia'
import http from '../services/http'
import { ref } from 'vue'

interface LoginPayload {
  username: string
  password: string
}

interface UserLogged {
  id: number
  name: string
  email: string
  token: string
  expires_at: Date
}
interface SingupPayload {
  name: string
  email: string
  password: string
  birth_date: string
}
export const useUserStore = defineStore('user', () => {
  const userLogged = ref<UserLogged>({
    id: 0,
    name: '',
    email: '',
    token: '',
    expires_at: new Date(),
  })

  async function login(payload: LoginPayload) {
    const { data } = await http.post(`users/signin`, payload)
    userLogged.value = data.data
    localStorage.setItem('user_logged', JSON.stringify(userLogged.value))
    return data
  }

  async function signup(payload: SingupPayload) {
    const { data } = await http.post(`users/signup`, payload)
    return data.data
  }
  return {
    userLogged,
    login,
    signup,
  }
})
