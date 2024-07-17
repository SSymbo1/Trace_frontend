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
            ]
        },
        {
            path: '/analysis', redirect: '/analysis/home', component: () => import('@/view/analysis/index.vue'),
            children: [
                {path: '/analysis/home', component: () => import('@/view/analysis/home.vue')},
            ]
        },
        {
            path: '/construct', redirect: '/construct/home', component: () => import('@/view/construct/index.vue'),
            children: [
                {path: '/construct/home', component: () => import('@/view/construct/home.vue')},
            ]
        },
        {
            path: '/device', redirect: '/device/home', component: () => import('@/view/device/index.vue'),
            children: [
                {path: '/device/home', component: () => import('@/view/device/home.vue')},
            ]
        },
        {
            path: '/emergency', redirect: '/emergency/home', component: () => import('@/view/emergency/index.vue'),
            children: [
                {path: '/emergency/home', component: () => import('@/view/emergency/home.vue')},
            ]
        },
        {
            path: '/monitor', redirect: '/monitor/home', component: () => import('@/view/monitor/index.vue'),
            children: [
                {path: '/monitor/home', component: () => import('@/view/monitor/home.vue')},
            ]
        },
        {
            path: '/operation', redirect: '/operation/home', component: () => import('@/view/operation/index.vue'),
            children: [
                {path: '/operation/home', component: () => import('@/view/operation/home.vue')},
            ]
        },
        {
            path: '/quality', redirect: '/quality/home', component: () => import('@/view/quality/index.vue'),
            children: [
                {path: '/quality/home', component: () => import('@/view/quality/home.vue')},
            ]
        },
        {
            path: '/segment', redirect: '/segment/home', component: () => import('@/view/segment/index.vue'),
            children: [
                {path: '/segment/home', component: () => import('@/view/segment/home.vue')},
            ]
        },
        {
            path: '/subject', redirect: '/subject/home', component: () => import('@/view/subject/index.vue'),
            children: [
                {path: '/subject/home', component: () => import('@/view/subject/home.vue')},
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

