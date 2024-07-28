import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBackend = defineStore(
    'backend',
    () => {
        const backend = ref('http://localhost:11451')
        const setBackend = (newBackend) => {
            backend.value = newBackend
        }
        const removeBackend = () => {
            backend.value = ''
        }
        return { backend,setBackend,removeBackend }
    },
    // 是否持久化存储
    {
        persist: true
    }
)
