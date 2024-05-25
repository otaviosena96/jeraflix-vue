<!-- src/views/ProfileList.vue -->

<template>
  <div class="container mt-5">
    <h2 class="text-primary text-center mb-4">ESCOLHA UM PERFIL</h2>
    <div class="row">
      <div class="col-md-4 mb-4 me-5" v-for="(profile, index) in profiles" :key="index">
        <el-card class="d-flex align-items-center justify-content-center" :style="{ backgroundColor: profile.color, minHeight: '10rem', minWidth: '12rem', marginRight: '10px' }">
          <span class="text-center align-item-center">{{ profile.name }}</span>
        </el-card>
      </div>
      <div class="col-md-4 mb-4">
        <el-card @click="showModal" class="d-flex align-items-center justify-content-center" :style="{ backgroundColor:'#007bff', minHeight: '10rem', minWidth: '12rem', cursor: 'pointer' }">
          <font-awesome-icon icon="plus" />
        </el-card>
      </div>
    </div>
  </div>
  <CreateProfileModal v-model:visible="isModalVisible"></CreateProfileModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CreateProfileModal from './modals/CreateProfileModal.vue';

const isModalVisible = ref(false);

const profiles = ref([{
  name: 'Perfil 1',
  color: '#007ff'
}]);

const showModal = () => {
  isModalVisible.value = true;
}

onMounted(() => {
  console.log('mounted');
});
</script>
