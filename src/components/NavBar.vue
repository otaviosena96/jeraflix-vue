<template>
  <div class="page-header-wrapper">
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      v-if="showMenu"
    >
      <el-sub-menu index="1">
        <template #title>Selecionar Perfil</template>
        <el-menu-item
          v-for="profile in profiles"
          :key="profile.id"
          :index="profile.id"
          @click="setProfile(profile.id)"
        >
          {{ profile.name }}
        </el-menu-item>
      </el-sub-menu>
      
      <el-menu-item index="2">Filmes Sugeridos</el-menu-item>
      <el-menu-item index="3">Lista de Desejos</el-menu-item>
      <el-menu-item index="4">Filmes Assistidos</el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useUserStore } from '../stores/userStore.ts';
import { useProfileStore } from '../stores/profileStore.ts';
import { useMovieStore } from '../stores/moviesStore.ts';
import router from '../router/index.ts';

const profileStore = useProfileStore();
const movieStore = useMovieStore();
const userStore = useUserStore();
const activeIndex = ref(profileStore.profile?.id?.toString() || '2');
const showMenu = ref(true);

const profiles = computed(() => profileStore.profiles);
const profile = computed(() => profileStore.profile);

watch(() => userStore.path, (newPath, oldPath) => {
  if (newPath === '/login' || newPath === '/signup' || newPath === '/profile/create') {
    showMenu.value = false;
  } else {
    showMenu.value = true;
  }
});

watch(() => profileStore.profile, (newProfile) => {
  if (newProfile && newProfile.id) {
    activeIndex.value = newProfile.id.toString();
  }
});

const setProfile = (profileId) => {
  const selectedProfile = profiles.value.find(profile => profile.id === profileId);  
    profileStore.profile = selectedProfile;
};

const handleSelect = (index) => {
  
  if (index === "2") {
    router.push({ path: `/filmes/sugeridos/${profile.value.id}` });
  }
  if (index === "3") {
    router.push({ path: `/filmes/wishlist/${profile.value.id}` });
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
