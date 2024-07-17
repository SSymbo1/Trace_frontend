import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router/index.js'
import pinia from '@/store/index.js'
import vuetyped from 'vue3typed'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const app= createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetyped)
app.config.globalProperties.$echarts = echarts
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
