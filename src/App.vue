<template>
  <div id="app">  

    <UserMenu />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">

import UserMenu from './components/UserMenu.vue'
</script>
