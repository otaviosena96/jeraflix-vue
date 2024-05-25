import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreateProfile from '../views/CreateProfile.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/perfil/criar',
    name: 'Criar Perfil',
    component: CreateProfile,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
