<template>
  <div class="user-menu" v-if="showLogoutButton">
    <button @click="logout" class="logout-button">Logout</button>  
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore.ts'

const showMenu = ref(false)
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const user = computed(() => userStore.userLogged)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const logout = () => {
  userStore.logout()
  router.push('/login')
}

const showLogoutButton = computed(() => {
  return route.path !== '/login' && route.path !== '/signup'
})
</script>

<style scoped>
.user-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.logout-button {
  background: #f56;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;
  text-align: left;
}
</style>
