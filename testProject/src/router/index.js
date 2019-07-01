import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import Login from '@/components/Login'
import cardAndUsersQuery from '@/views/cardAndUsersManage/cardAndUsersQuery'
import cardAndUsersAdd from '@/views/cardAndUsersManage/cardAndUsersAdd'
import posQuery from '@/views/posManage/posQuery'
import posAdd from '@/views/posManage/posAdd'
import bankQuery from '@/views/bankManage/bankQuery'
import bankAdd from '@/views/bankManage/bankAdd'
import ruleAdd from '@/views/ruleManage/ruleAdd'
import baseDataAdd from '@/views/ruleManage/baseDataAdd'
import dailyFinancialQuery from '@/views/dailyFinancialManage/dailyFinancialQuery'
import clientRepaymentQuery from '@/views/clientRepayment/clientRepaymentQuery'
import clientDetailInfo from '@/views/clientRepayment/clientDetailInfo'
import clientDetailThird from '@/views/clientRepayment/clientDetailThird'
import dailyOperationQuery from '@/views/dailyOperation/dailyOperationQuery'
import dailyOperationUpdate from '@/views/dailyOperation/dailyOperationUpdate'
import clientRepaymentAdd from '@/views/clientRepayment/clientRepaymentAdd'

Vue.use(Router)
let routes = [
  {
    path:'/',
    component: Main,
    hidden: true,
    children: [
      {
        path: '/',
        component:Dashboard,
        name:'首页'
    }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
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
      },
      {
        path: '/cardAndUsersAdd',
        component: cardAndUsersAdd,
        name: '卡/用户录入'
      }
    ]
  },
  {
    path: '/posManage',
    name: 'POS机管理',
    component: Main,
    children: [
      {
        path: '/posQuery',
        component: posQuery,
        name: 'pos机查询'
      },
      {
        path: '/posAdd',
        component: posAdd,
        name: 'pos机录入'
      }
    ]
  },
  {
    path: '/dailyOperation',
    name: '日常操作',
    component: Main,
    children: [
      {
        path: '/dailyOperationQuery',
        component: dailyOperationQuery,
        name: '操作清单生成'
      },
      {
        path: '/dailyOperationUpdate',
        component: dailyOperationUpdate,
        name: '操作清单确认'
      },
      {
        path: '/dailyFinancialQuery ',
        component: dailyFinancialQuery,
        name: '日常财务录入'
      }
    ]
  },
  {
    path: '/clientRepayment',
    name: '客户还款',
    component: Main,
    children: [
      {
        path: '/clientRepaymentQuery',
        component: clientRepaymentQuery,
        name: '客户还款查询'
      },
      {
        path: '/clientRepaymentAdd',
        component: clientRepaymentAdd,
        name: '客户还款录入'
      },
      {
        path: '/clientDetailInfo',
        component: () => import('@/views/clientRepayment/clientDetailInfo'),
        name: '客户还款详情',
        hidden: true
      },
      {
        path: '/clientDetailThird',
        component: clientDetailThird,
        name: '客户还款详情页',
        hidden: true
      }
    ]
  },
  {
    path: '/bankManage',
    name: '本方银行',
    component: Main,
    children: [
      {
        path: '/bankQuery',
        component: bankQuery,
        name: '本方银行查询'
      },
      {
        path: '/bankAdd',
        component: bankAdd,
        name: '本方银行录入'
      }
    ]
  },
  {
    path: '/ruleManage',
    name: '基础数据配置',
    component: Main,
    children: [
      {
        path: '/ruleAdd',
        component: ruleAdd,
        name: '规则配置'
      },
      {
        path: '/baseDataAdd',
        component: baseDataAdd,
        name: '基础数据配置'
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
