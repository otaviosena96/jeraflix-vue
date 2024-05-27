declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue3-facebook-login' {
  import { ComponentOptions } from 'vue'

  const FacebookLogin: ComponentOptions

  export default FacebookLogin
}
