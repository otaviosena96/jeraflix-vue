<template>
  <el-form style="width: 35rem;" label-position="top">
    <span class="text-primary mb-5" style="font-size: 2rem;">CADASTRO </span>
    
    <el-form-item label="Nome">
      <el-input v-model="form.name" class="mb-2" placeholder="DIGITE SEU NOME"></el-input>
    </el-form-item>
    
    <el-form-item label="Email">
      <el-input v-model="form.email" type="email" class="mb-2" placeholder="DIGITE SEU EMAIL"></el-input>
    </el-form-item>
    
    <el-form-item label="Senha">
      <el-input v-model="form.password" type="password" class="mb-2" placeholder="DIGITE SUA SENHA"></el-input>
    </el-form-item>
    
    <el-form-item label="Repita a Senha">
      <el-input v-model="form.confirmPassword" type="password" class="mb-2" placeholder="REPITA A SENHA"></el-input>
    </el-form-item>
    
    <el-form-item label="Data de Nascimento">
      <el-input v-model="form.birth_date" type="date" class="mb-2"></el-input>
    </el-form-item>
    
    <el-form-item>
      <el-button @click="signup" type="submit" class="mb-2">Cadastrar</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.ts'
import { useToast } from 'vue-toastification'
import router from '../router/index.ts';

const userStore = useUserStore()
const toast = useToast()
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  birth_date: '',
})

const signup = () => {
  if (form.value.password !== form.value.confirmPassword) {
    toast.error('As senhas não conferem')
    return
  }
  const { confirmPassword, ...signupData } = form.value
  userStore.signup(signupData).then(() => {
    toast.success('Usuário cadastrado com sucesso')
    form.value = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      birth_date: '',
    }
  }).catch(err => {
    if (err.response.status === 400) {toast.warning(err.response.data.errors[0])}
    else {toast.error(err.response.data.message)}
    
  })
}
</script>
