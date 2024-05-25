<!-- src/views/ProfileList.vue -->

<template>
  <div class="container mt-5">
    <h2 class="text-primary text-center mb-4">ESCOLHA UM PERFIL</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(profile, index) in profiles" :key="index">
        <el-card :style="{ backgroundColor: profile.color, minHeight: '10rem', minWidth: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }">          
            <span class="text-center">{{ profile.name }}</span>        
        </el-card>
      </div>
      <div class="col-md-4 mb-4">
        <el-card @click="addProfile" :style="{ backgroundColor:'#007bff', minHeight: '10rem', minWidth: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }">
              <font-awesome-icon icon="plus" />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const profiles = ref([{
  name: 'Perfil 1',
  color: '#007bff'
}]);

const addProfile = () => {
  // Lógica para adicionar um novo perfil
  console.log('Add new profile');
};

onMounted(() => {
  console.log('mounted');
});
</script>

<style scoped>
.add-profile {
  font-size: 3em; /* Tornar o ícone maior */
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Centralizar verticalmente */
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
