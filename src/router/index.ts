import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Home from '../views/Home.vue'
import MoviesSuggested from '../views/MoviesSuggested.vue'
import Wishlist from '../views/Wishlist.vue'
import Watched from '../views/Watched.vue'

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
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/filmes/sugeridos/:id',
    name: 'Filmes Sugeridos',
    component: MoviesSuggested,
  },
  {
    path: '/filmes/wishlist/:id',
    name: 'Lista de Desejos',
    component: Wishlist,
  },
  {
    path: '/filmes/watched/:id',
    name: 'Lista de Assistidos',
    component: Watched,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

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
