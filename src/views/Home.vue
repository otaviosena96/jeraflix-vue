<template>
  <div class="container mt-5">
    <div class="text-center">
      <h2 class="text-primary mb-4">ESCOLHA UM PERFIL</h2>
      <div class="row">
        <div class="col-md-4 mb-4 me-5" v-for="(profile, index) in profiles" :key="index">
          <el-card class="d-flex align-items-center justify-content-center" @click="goHome(index)" :style="{ backgroundColor: profile.color, minHeight: '8rem', minWidth: '10rem', marginRight: '10px' }">
            <span class="text-center align-item-center">{{ profile.name }}</span>
          </el-card>
        </div>
        <div class="col-md-4 mb-4">
          <el-card @click="showModal" class="d-flex align-items-center justify-content-center" :style="{ backgroundColor:'#007bff', minHeight: '8rem', minWidth: '10rem', cursor: 'pointer' }">
            <font-awesome-icon icon="plus" />
          </el-card>
        </div>
      </div>
    </div>
  </div>
  <CreateProfileModal v-model:visible="isModalVisible"></CreateProfileModal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CreateProfileModal from './modals/CreateProfileModal.vue';
import { useProfileStore } from '../stores/profileStore';
import router from '../router';

const isModalVisible = ref(false);
const profileStore = useProfileStore();
const profiles = computed(() => profileStore.profiles);


const showModal = () => {
  isModalVisible.value = true;
}

const goHome = (index: any) => {
  profileStore.profile = profileStore.profiles[index];
  router.push(`/filmes/sugeridos/${profileStore.profile.id}`);
}

onMounted( async () => {
  await profileStore.getProfiles();
});
</script>
