import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useToken = defineStore(
    'token',
    () => {
        const token = ref('')
        const setToken = (newToken) => {
            token.value = newToken
        }
        const removeToken = () => {
            token.value = ''
        }
        const getToken = () => {
            return token.value
        }
        return {token, setToken, removeToken, getToken}
    },
    // 是否持久化存储
    {
        persist: true
    }
)
