import { defineStore } from 'pinia'
import http from '../services/http'
import { ref } from 'vue'

interface LoginPayload {
  email: string
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
    localStorage.setItem('user_logged', JSON.stringify(data.data))
    userLogged.value = data.data
    return data
  }

  async function signup(payload: SingupPayload) {
    const { data } = await http.post(`users/signup`, payload)
    return data.data
  }
  async function logout() {
    await localStorage.removeItem('user_logged')
    userLogged.value = {
      id: 0,
      name: '',
      email: '',
      token: '',
      expires_at: new Date(),
    }
    window.location.reload()
  }
  return {
    userLogged,
    login,
    signup,
    logout,
  }
})
