<template>
  <el-button class="search-button" @click="openModal">
    Pesquisar Filmes
  </el-button>
 </template>

<script setup>

  import { ref } from 'vue'
  import {useDefaultStore} from '../stores/defaultStore'
  const defaultStore = useDefaultStore()
  


  const openModal = () => {
    defaultStore.modalOpen = true
  }



</script>

<style scoped>
  .search-button{ 
    position: fixed;
    top: 15%;
    right: 2%;
    background-color: aliceblue;
    width: 7rem;
    height: 5rem;
  }


</style>