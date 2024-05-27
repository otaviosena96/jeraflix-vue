// src/main.ts

import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons' // Importe o ícone necessário
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router/index'
import '../src/scss/styles.scss'
import { createPinia } from 'pinia'
import Toast, { PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
//import FacebookLogin from 'vue3-facebook-login'

library.add(faPlus)

const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus)
app.component('font-awesome-icon', FontAwesomeIcon)
//app.component('facebook-login', FacebookLogin)
app.use(router)
app.use(pinia)

const options: PluginOptions = {
  timeout: 1700,
}

app.use(Toast, options)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
