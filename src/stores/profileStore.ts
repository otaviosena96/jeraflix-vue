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
  color: string
  user_id: number
  created_at: Date
  updated_at: Date
}
export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile>({
    id: 0,
    uuid: '',
    name: '',
    color: '',
    user_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
  })

  const profiles = ref<Profile[]>([])

  async function create(payload: CreatePayload) {
    payload.name = payload.name.trim()
    payload.name = payload.name.toUpperCase()
    const { data } = await http.post(`profiles/create`, payload)
    profile.value = data.data
    return data
  }

  async function getProfiles() {
    const { data } = await http.get(`profiles`)
    profiles.value = data.data
    return data.data
  }
  return {
    profile,
    profiles,
    create,
    getProfiles,
  }
})
