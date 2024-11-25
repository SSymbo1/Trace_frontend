import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {ElMessage} from "element-plus";
import {useToken} from "@/store/index";

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: () => import('@/view/home/Home.vue')},
        {path: '/login', component: () => import('@/view/welcome/Login.vue')},
        {path: '/platform', component: () => import('@/view/platform/Index.vue')},
        {
            path: '/system', redirect: '/system/home', component: () => import('@/view/system/Index.vue'),
            children: [
                {path: '/system/home', component: () => import('@/view/system/Home.vue')},
                {path: '/system/account', redirect: '/system/account/user'},
                {path: '/system/account/user', component: () => import('@/view/system/account/User.vue')},
                {path: '/system/account/role', component: () => import('@/view/system/account/Role.vue')},
                {path: '/system/account/enterprise', component: () => import('@/view/system/account/Enterprise.vue')},
                {path: '/system/sensitive', redirect: '/system/sensitive/account'},
                {path: '/system/sensitive/account', component: () => import('@/view/system/sensitive/Account.vue')},
                {
                    path: '/system/sensitive/enterprise',
                    component: () => import('@/view/system/sensitive/Enterprise.vue')
                },
                {path: '/system/sensitive/role', component: () => import('@/view/system/sensitive/Role.vue')},
            ]
        },
        {
            path: '/analysis', redirect: '/analysis/home', component: () => import('@/view/analysis/Index.vue'),
            children: [
                {path: '/analysis/home', component: () => import('@/view/analysis/Home.vue')},
                {path: '/analysis/industry', redirect: '/analysis/industry/market'},
                {path: '/analysis/industry/market', component: () => import('@/view/analysis/industry/Market.vue')},
                {
                    path: '/analysis/industry/wholesale',
                    component: () => import('@/view/analysis/industry/Wholesale.vue')
                },
                {path: '/analysis/industry/important', component: () => import('@/view/analysis/industry/ImportantEnterprise.vue')},
                {path: '/analysis/industry/animal', component: () => import('@/view/analysis/industry/Animal.vue')},
                {path: '/analysis/industry/butch', component: () => import('@/view/analysis/industry/Butch.vue')},
                {path: '/analysis/industry/farm', component: () => import('@/view/analysis/industry/Farm.vue')},
                {path: '/analysis/industry/plant', component: () => import('@/view/analysis/industry/Plant.vue')},
                {path: '/analysis/industry/process', component: () => import('@/view/analysis/industry/Process.vue')},
                {path: '/analysis/industry/struct', component: () => import('@/view/analysis/industry/Struct.vue')},
                {path: '/analysis/market', redirect: '/analysis/market/operations'},
                {path: '/analysis/market/operations', component: () => import('@/view/analysis/market/Operations.vue')},
                {path: '/analysis/report', redirect: '/analysis/report/year'},
                {path: '/analysis/report/year', component: () => import('@/view/analysis/report/Year.vue')},
                {path: '/analysis/report/month', component: () => import('@/view/analysis/report/Month.vue')},
                {path: '/analysis/report/quarter', component: () => import('@/view/analysis/report/Quarter.vue')},
                {path: '/analysis/report/struct', component: () => import('@/view/analysis/report/Struct.vue')},
            ]
        },
        {
            path: '/monitor', redirect: '/monitor/home', component: () => import('@/view/monitor/Index.vue'),
            children: [
                {path: '/monitor/home', component: () => import('@/view/monitor/Home.vue')},
                {path: '/monitor/manage', redirect: '/monitor/manage/summary'},
                {path: '/monitor/manage/summary', component: () => import('@/view/monitor/manage/Summary.vue')},
                {path: '/monitor/manage/data', component: () => import('@/view/monitor/manage/Data.vue')},
                {path: '/monitor/manage/info', component: () => import('@/view/monitor/manage/Info.vue')}
            ]
        },
        {
            path: '/segment', redirect: '/segment/home', component: () => import('@/view/segment/Index.vue'),
            children: [
                {path: '/segment/home', component: () => import('@/view/segment/Home.vue')},
                {path: '/segment/manage', redirect: '/segment/manage/entry'},
                {path: '/segment/manage/entry', component: () => import('@/view/segment/manage/Entry.vue')},
                {path: '/segment/manage/appears', component: () => import('@/view/segment/manage/Appears.vue')},
            ]
        },
        {
            path: '/subject', redirect: '/subject/home', component: () => import('@/view/subject/Index.vue'),
            children: [
                {path: '/subject/home', component: () => import('@/view/subject/Home.vue')},
                {path: '/subject/bulk', redirect: '/subject/bulk/supplier'},
                {path: '/subject/bulk/supplier', component: () => import('@/view/subject/bulk/Supplier.vue')},
                {path: '/subject/bulk/vendors', component: () => import('@/view/subject/bulk/Vendors.vue')},
                {path: '/subject/product', redirect: '/subject/product/filings'},
                {path: '/subject/product/filings', component: () => import('@/view/subject/product/Filings.vue')},
                {path: '/subject/product/add', component: () => import('@/view/subject/component/ProductAdd.vue')},
                {
                    path: '/subject/product/process',
                    component: () => import ('@/view/subject/component/ProductRecord.vue')
                }
            ]
        },
    ]
});

router.beforeEach((to) => {
    NProgress.start()
    const tokenStore = useToken()
    if ((to.path !== '/login') && (tokenStore.token === '' || tokenStore.token === null)) {
        ElMessage.error('请先登录!')
        return '/login'
    } else if ((to.path === '/login') && (tokenStore.token !== '' && tokenStore.token !== null)) {
        ElMessage.warning("请先退出当前账户!")
        return '/'
    }
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router;

