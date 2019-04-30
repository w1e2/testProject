import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import preservation from '@/views/preservationManage/preservation-apply'
import contract from '@/views/preservationManage/contract'
import underwriting from '@/views/preservationManage/underwriting-auto'
import underwritingPersonal from '@/views/preservationManage/underwriting-personal'
import pedorapplyAccept from '@/views/preservationManage/component/pedorapply-accept'

Vue.use(Router)
let routes = [
  {
    path:'/',
    component: Main,
    hidden: true,
    children: [{
        path: '/',
        component:Dashboard,
        name:'首页'
    }]
  },
  {
    path: '/perservationManage',
    name: '保全管理',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      },
      {
        path: '/preservation-apply',
        component: preservation,
        name: '保全申请'
      },
      {
        path: '/underwriting-auto',
        component: underwriting,
        name: '自动核保'
      },
      {
        path: '/underwriting-personal',
        component: underwritingPersonal ,
        name: '人工核保'
      }
    ]
  }
]
export default new Router({
  routes: routes
})

const router = new Router({
  routes: router
})
