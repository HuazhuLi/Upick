/**
 * Created by faraway on 17-7-24.
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import tip from './plugins/errorTip'
import http from './plugins/http'

Vue.use(tip)
Vue.use(http)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// (async function () {
//   const Vue = await import('vue')
//   const App = await import('./App.vue')
//   const router = await import('./router')
//   const store = await import('./store')
//   const tip = await import('./plugins/errorTip')
//   const http = await import('./plugins/http')
//
//   Vue.use(tip)
//   Vue.use(http)
//   Vue.config.productionTip = false
//
//   /* eslint-disable no-new */
//   new Vue({
//     el: '#app',
//     router,
//     store,
//     template: '<App/>',
//     components: { App }
//   })
// })()
