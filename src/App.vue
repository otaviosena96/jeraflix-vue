<template>
  <div id="app">  

    <UserMenu />
    <SearchModal />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">

import UserMenu from './components/UserMenu.vue'
import SearchModal from './components/SearchModal.vue'
</script>
