// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'

Vue.use(ElementUI,VueI18n)

Vue.config.productionTip = false


import './theme/index.css'
import '@/styles/index.scss' // global css


window.Vue = Vue

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
