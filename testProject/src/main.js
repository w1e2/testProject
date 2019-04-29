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

const message = {
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}

const i18n = new VueI18n({
    locale: 'zh',    // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale 
    messages: {
      'zh-CN': require('./common/lang/zh.json'),   // 中文语言包
      'en-US': require('./common/lang/en.json')    // 英文语言包
    },
    // messages:{
      
    // },
    // data: { path: 'lang' }
})


// // Hot updates
// if (module.hot) {
//   module.hot.accept(['./en', './ja'], function () {
//     i18n.setLocaleMessage('en', require('./en').default)
//     i18n.setLocaleMessage('ja', require('./ja').default)
//     // Or the following hot updates via $i18n property
//     // app.$i18n.setLocaleMessage('en', require('./en').default)
//     // app.$i18n.setLocaleMessage('ja', require('./ja').default)
//   })
// }


//   const i18n = new VueI18n({
//     locale: 'zh-CN',
//     messages: {
//     'zh-CN': {
//     'detail1': '详情1', 
//     'detail2': '详情2',
//     'detail3': '详情3',
//      'year': '年'
//     },
//     'en-US': {
//     'detail1': 'Detail1',
//     'detail2': 'Detail2',
//     'detail3': 'Detail3',
//     'year': 'year'
//     }
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
