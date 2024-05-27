<template>
  
    <el-button class="profile" @click="goToProfile">
      Trocar Perfil
    </el-button>
  


</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()


const goToProfile = () => {
  router.push('/perfil/criar')
}
</script>

<style scoped>

  .profile{ 
    background-color: aliceblue;
    width: fit-content;
    position: fixed;
    top: 2%;
    left: 2%;
  }

</style>