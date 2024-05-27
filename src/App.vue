<template>
  <div id="app">  
    <NavBar></NavBar>
    <UserMenu />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import UserMenu from './components/UserMenu.vue'
</script>
