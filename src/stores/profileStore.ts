import { defineStore } from 'pinia'
import http from '../services/http'
import { ref } from 'vue'

interface CreatePayload {
  user_id: string
  name: string
}

interface Profile {
  id: number
  uuid: string
  name: string
  user_id: number
  created_at: Date
  updated_at: Date
}
export const useUserStore = defineStore('user', () => {
  const profile = ref<Profile>({
    id: 0,
    uuid: '',
    name: '',
    user_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
  })

  const profiles = ref<Profile[]>([])

  async function create(payload: CreatePayload) {
    const { data } = await http.post(`profiles/create`, payload)
    profile.value = data.data
    return data
  }

  async function getProfiles(payload: string) {
    const { data } = await http.get(`profiles/${payload}`)
    return data.data
  }
  return {
    profile,
    profiles,
    create,
    getProfiles,
  }
})
