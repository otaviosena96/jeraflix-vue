<template>
  
  <div class="container"> 
    <div class="col">
      <div class="row">
        <span class="mb-4 text-success" style="font-size: 3.5rem;">JERAFLIX</span>
      </div>
      <div class="row">
        <span class="text-primary" style="font-size: 1.5rem;">LOGIN</span>    
      </div>
    </div>
    <el-input class="mt-5 mb-3" v-model="form.email" type="email" placeholder="Digite seu email" />
    <el-input class="mb-3" type="password" v-model="form.password" placeholder="Digite sua senha" />
    <el-button @click="login">
      <span class="text-primary">Entrar</span>
    </el-button>
    <el-button @click="signup">
      <span class="text-primary">Cadastrar</span>
    </el-button>
  </div>

<!--   <facebook-login
    :appId="appId"
    @loggedIn="handleLogin"
    
  >
  </facebook-login> -->

</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useUserStore} from '../stores/userStore.ts'
import {useToast} from 'vue-toastification'
import {useRouter} from 'vue-router'

//const appId = '803687398374055'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const form = ref({
  email: '',
  password: ''
})



/* const handleLogin = async () => {
  console.log()
}
 */
const signup = async () => {
  router.push({path: '/signup'})
}
const login = async () => {
  await userStore.login(form.value).then(() =>{    
      router.push('perfil/criar');  
  }).catch(e => {    
    toast.error(e.response.data.message)
  })
}


</script>