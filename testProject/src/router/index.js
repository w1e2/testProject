import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import cardAndUsersQuery from '@/views/cardAndUsersManage/cardAndUsersQuery'
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
    path: '/cardAndUsersManage',
    name: '卡/用户管理',
    component: Main,
    children: [
      {
        path: '/cardAndUsersQuery',
        component: cardAndUsersQuery,
        name: '卡/用户查询'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '本方银行',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '卡/用户管理',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '规则配置',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '日常财务操作',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '日常操作',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '客户还款记录',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
      }
    ]
  },
  {
    path: '/perservationManage',
    name: '客户还款查询',
    component: Main,
    children: [
      {
        path: '/contract',
        component: contract,
        name: '无扫描申请'
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
