import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userDefaultStore = defineStore('default', () => {
  const filtered = ref<boolean>(false)

  return {
    filtered,
  }
})
