import axios from 'axios';
import {ElMessage} from "element-plus";
import {useToken} from "@/store/index";
import {useBackend} from "@/store/base/backend.js";
import {useRouter} from 'vue-router'

// 创建一个 Axios 实例
const request = axios.create({
    baseURL: useBackend().backend, // 设置基础 URL
    timeout: 60000, // 设置超时时间
});

// 处理请求操作，在请求接口时请求头携带token
request.interceptors.request.use(
    (config) => {
        const tokenStore = useToken()
        if (tokenStore.token) {
            config.headers.token = tokenStore.token
        }
        return config
    },
    (err) => Promise.reject(err)
)

// 封装 GET 请求
export const get = async (url, params = {}) => {
    let router = useRouter()
    try {
        const response = await request.get(url, {params});
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            console.log(error)
            const tokenStore = useToken()
            tokenStore.removeToken()
            ElMessage.error({
                message: '登录失效，请重新登录',
                grouping: true,
            })
            router.push('/login')
        } else if (error.response.status === 500) {
            ElMessage.error({
                message: '服务器出错啦',
                grouping: true,
            })
        }
    }
};

// 封装 POST 请求
export const post = async (url, data = {}) => {
    let router = useRouter()
    try {
        const response = await request.post(url, data);
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            console.log(error)
            const tokenStore = useToken()
            tokenStore.removeToken()
            ElMessage.error({
                message: '登录失效，请重新登录',
                grouping: true,
            })
            router.push('/login')
        } else if (error.response.status === 500) {
            ElMessage.error({
                message: '服务器出错啦',
                grouping: true,
            })
        }
    }
};

// 封装 PUT 请求
export const put = async (url, data = {}) => {
    let router = useRouter()
    try {
        const response = await request.put(url, data);
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            console.log(error)
            const tokenStore = useToken()
            tokenStore.removeToken()
            ElMessage.error({
                message: '登录失效，请重新登录',
                grouping: true,
            })
            router.push('/login')
        } else if (error.response.status === 500) {
            ElMessage.error({
                message: '服务器出错啦',
                grouping: true,
            })
        }
    }
};

// 封装 DELETE 请求
export const del = async (url, data = {}) => {
    let router = useRouter()
    try {
        const response = await request.delete(url, {data});
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            console.log(error)
            const tokenStore = useToken()
            tokenStore.removeToken()
            ElMessage.error({
                message: '登录失效，请重新登录',
                grouping: true,
            })
            router.push('/login')
        } else if (error.response.status === 500) {
            ElMessage.error({
                message: '服务器出错啦',
                grouping: true,
            })
        }
    }
};

// 导出封装的请求方法
export default {
    get,
    post,
    put,
    del,
};
