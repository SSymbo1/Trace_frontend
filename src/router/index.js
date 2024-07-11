import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path:'/login',component:()=>import('@/view/welcome/login.vue') }
    ]
});

router.beforeEach((to) => {
    NProgress.start()
})

router.afterEach((to,from)=>{
    NProgress.done()
})

export default router;

