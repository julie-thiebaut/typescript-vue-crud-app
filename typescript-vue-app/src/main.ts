import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueCookies from 'vue-cookies'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
axios.defaults.headers.ContentType = "application/json"

Vue.config.productionTip = false
Vue.use(VueCookies)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
