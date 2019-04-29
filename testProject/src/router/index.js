import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home/home'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'

Vue.use(Router)



let routes = [{
    path:'/',
    component: Main,
    hidden: true,
    children: [{
        path: '/',
        component:Dashboard,
        name:'首页'
    }]
}]
export default new Router({
  routes: routes
//     {
//       path: '/home/home',
//       component: () => import('@/views/home/home'),
//       // component: home,
//       name: 'home',
//       iconCls: 'el-icon-message',//图标样式class
//       // children: [
//       //     { path: '/main', component: Main, name: '主页', hidden: true },
//       //     { path: '/table', component: Table, name: 'Table' },
//       //     { path: '/form', component: Form, name: 'Form' },
//       //     { path: '/user', component: user, name: '列表' },
//       // ]
//     },
  // ]
})
import {
  SystemRouter
} from './system'

for (let i in SystemRouter){
  routes.push(SystemRouter[i])
}

const router = new Router({
  routes: routes
})
