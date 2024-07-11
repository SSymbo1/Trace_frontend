import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router/index.js'
import pinia from '@/store/index.js'
import vuetyped from 'vue3typed'

const app= createApp(App)
app.use(router)
app.use(pinia)
app.use(vuetyped)

app.mount('#app')