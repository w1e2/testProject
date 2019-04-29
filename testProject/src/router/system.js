import Main from '@/components/Main'
import contract from '@/components/system/contract'
import preservationApply from '@/components/system/preservation-apply'

const SystemRouter = [{
    path: '/system',
    name: '保全管理',
    component: Main,
    iconCls: 'fa fa-address-card',
    children: [
        {
        path: '/system/contract',
        component: contract,
        name: '无扫描申请'
    },
    {
        path: '/system/preservation-apply',
        component: preservationApply,
        name: '保全申请'
    },
]
}]

export {
    SystemRouter
}