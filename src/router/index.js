import {createRouter, createWebHistory} from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {ElMessage} from "element-plus";
import {useToken} from "@/store/index";

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {path: '/', component: () => import('@/view/home/home.vue')},
        {path: '/login', component: () => import('@/view/welcome/login.vue')},
        {path: '/platform', component: () => import('@/view/platform/index.vue')},
        {
            path: '/system', redirect: '/system/home', component: () => import('@/view/system/index.vue'),
            children: [
                {path: '/system/home', component: () => import('@/view/system/home.vue')},
                {path: '/system/account', redirect: '/system/account/user'},
                {path: '/system/account/user', component: () => import('@/view/system/account/user.vue')},
                {path: '/system/account/role', component: () => import('@/view/system/account/role.vue')},
                {path: '/system/account/enterprise', component: () => import('@/view/system/account/enterprise.vue')},
                {path: '/system/sensitive', redirect: '/system/sensitive/account'},
                {path: '/system/sensitive/account', component: () => import('@/view/system/sensitive/account.vue')},
            ]
        },
        {
            path: '/analysis', redirect: '/analysis/home', component: () => import('@/view/analysis/index.vue'),
            children: [
                {path: '/analysis/home', component: () => import('@/view/analysis/home.vue')},
                {path: '/analysis/industry', redirect: '/analysis/industry/market'},
                {path: '/analysis/industry/market', component: () => import('@/view/analysis/industry/market.vue')},
                {
                    path: '/analysis/industry/wholesale',
                    component: () => import('@/view/analysis/industry/wholesale.vue')
                },
                {path: '/analysis/industry/process', component: () => import('@/view/analysis/industry/process.vue')},
                {path: '/analysis/industry/struct', component: () => import('@/view/analysis/industry/struct.vue')},
                {path: '/analysis/market', redirect: '/analysis/market/operations'},
                {path: '/analysis/market/operations', component: () => import('@/view/analysis/market/operations.vue')},
                {path: '/analysis/report', redirect: '/analysis/report/year'},
                {path: '/analysis/report/year', component: () => import('@/view/analysis/report/year.vue')},
                {path: '/analysis/report/month', component: () => import('@/view/analysis/report/month.vue')},
                {path: '/analysis/report/quarter', component: () => import('@/view/analysis/report/quarter.vue')},
            ]
        },
        {
            path: '/monitor', redirect: '/monitor/home', component: () => import('@/view/monitor/index.vue'),
            children: [
                {path: '/monitor/home', component: () => import('@/view/monitor/home.vue')},
                {path: '/monitor/manage', redirect: '/monitor/manage/summary'},
                {path: '/monitor/manage/summary', component: () => import('@/view/monitor/manage/summary.vue')},
                {path: '/monitor/manage/data', component: () => import('@/view/monitor/manage/data.vue')},
            ]
        },
        {
            path: '/segment', redirect: '/segment/home', component: () => import('@/view/segment/index.vue'),
            children: [
                {path: '/segment/home', component: () => import('@/view/segment/home.vue')},
                {path: '/segment/manage', redirect: '/segment/manage/entry'},
                {path: '/segment/manage/entry', component: () => import('@/view/segment/manage/entry.vue')},
                {path: '/segment/manage/appears', component: () => import('@/view/segment/manage/appears.vue')},
            ]
        },
        {
            path: '/subject', redirect: '/subject/home', component: () => import('@/view/subject/index.vue'),
            children: [
                {path: '/subject/home', component: () => import('@/view/subject/home.vue')},
                {path: '/subject/bulk', redirect: '/subject/bulk/supplier'},
                {path: '/subject/bulk/supplier', component: () => import('@/view/subject/bulk/supplier.vue')},
                {path: '/subject/bulk/vendors', component: () => import('@/view/subject/bulk/vendors.vue')},
                {path: '/subject/product', redirect: '/subject/product/filings'},
                {path: '/subject/product/filings', component: () => import('@/view/subject/product/filings.vue')},
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

