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

    <div>
      <h2>Login com Facebook</h2>
      <el-button @click="loginWithFacebook">
        <span class="text-primary">Login com Facebook</span>
      </el-button>
    </div>

    <el-button @click="signup">
      <span class="text-primary">Cadastrar</span>
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore.ts'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const form = ref({
  email: '',
  password: ''
})

const signup = async () => {
  router.push({ path: '/signup' })
}

const login = async () => {
  await userStore.login(form.value).then(() => {
    router.push('perfil/criar')
  }).catch(e => {
    toast.error(e.response.data.message)
  })
}

const loginWithFacebook = () => {
  FB.login(response => {
    if (response.authResponse) {
      FB.api('/me', { fields: 'name,email' }, async (profile) => {
        try {
          await userStore.loginWithFacebook(profile)
          router.push('perfil/criar')
        } catch (e) {
          toast.error(e.response.data.message)
        }
      })
    } else {
      toast.error('Falha no login com Facebook')
    }
  }, { scope: 'public_profile,email' })
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '{your-app-id}',
    cookie: true,
    xfbml: true,
    version: '{api-version}'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
</script>
