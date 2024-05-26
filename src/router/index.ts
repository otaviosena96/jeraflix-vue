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
  // Adicione outras rotas aqui conforme necessário
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guardião de rota global
router.beforeEach((to, _from, next) => {
  const publicPages = ['/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user_logged')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
