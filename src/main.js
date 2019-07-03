// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})