<template>
  <div class="page-header-wrapper">
    <el-menu      
      mode="horizontal"
      @select="handleSelect"
      :ellipsis="false"     
    >           
      <el-menu-item index="1">Filmes Sugeridos</el-menu-item>
      <el-menu-item index="2">Lista de Desejos</el-menu-item>
      <el-menu-item index="3">Filmes Assistidos</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '../stores/userStore.ts';
import { useProfileStore } from '../stores/profileStore.ts';
import { useMovieStore } from '../stores/moviesStore.ts';
import { useRouter } from 'vue-router';

const router = useRouter();
const profileStore = useProfileStore();
const movieStore = useMovieStore();
const userStore = useUserStore();

const handleSelect = (index) => { 
  
  if (index === "1") {    
    const id = router.currentRoute.value.params.id;    
    router.push({ path: `/filmes/sugeridos/${id}` });
  }
 
  if (index === "2") {    
    const id = router.currentRoute.value.params.id;    
    router.push({ path: `/filmes/wishlist/${id}` });
  }

  if (index === "3") {    
    const id = router.currentRoute.value.params.id;    
    router.push({ path: `/filmes/watched/${id}` });
  }
};

</script>

<style scoped>
.page-header-wrapper {
  position: fixed;
  top: 3rem;
  left: 50%; 
  transform: translateX(-50%);
  width: auto; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
}
</style>
