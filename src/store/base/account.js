import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAccountStore = defineStore(
    'account',
    () => {
        const account = ref({})
        const setAccount = (newAccount) => {
            account.value = newAccount
        }
        const removeAccount = () => {
            account.value = {}
        }
        return {account, setAccount, removeAccount}
    },
    // 是否持久化存储
    {
        persist: true
    }
)
