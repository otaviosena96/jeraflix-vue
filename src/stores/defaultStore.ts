import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDefaultStore = defineStore('default', () => {
  const filtered = ref<boolean>(false)
  const modalOpen = ref(false)

  return {
    filtered,
    modalOpen,
  }
})
