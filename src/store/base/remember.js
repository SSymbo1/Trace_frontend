import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useRemember = defineStore(
    'remember',
    () => {
        const history = ref({
            username: "",
            password: "",
            remember: false
        })
        const setHistory = (remember) => {
            history.value.username=remember.username
            history.value.password=remember.password
            history.value.remember=remember.remember
        }
        const removeHistory = () => {
            history.value.username=""
            history.value.password=""
            history.value.remember=false
        }
        return {history, setHistory, removeHistory}
    }, {
        persist: true
    })