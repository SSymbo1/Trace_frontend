import axios from 'axios';
import {ElMessage} from "element-plus";
import {useToken} from "@/store/index";
import {useBackend} from "@/store/base/backend.js";
import router from "@/router/index.js";
import {useAccountStore} from "@/store/base/account.js";

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
    try {
        const response = await request.get(url, {params});
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

// 封装 POST 请求
export const post = async (url, data = {}) => {
    try {
        const response = await request.post(url, data);
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

// 封装 PUT 请求
export const put = async (url, data = {}) => {
    try {
        const response = await request.put(url, data);
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

// 封装 DELETE 请求
export const del = async (url, data = {}) => {
    try {
        const response = await request.delete(url, {data});
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

// 封装文件上传请求
export const file = async (url, data = {}) => {
    const tokenStore = useToken()
    const config = {
        headers: {
            'token': tokenStore.token,
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const response = await request.post(url, data, config);
        return response.data
    } catch (error) {
        await handleError(error)
    }
}

const handleError = async (error) => {
    console.log(error.response)
    const errorData = error.response.data.data
    if (errorData.info.code === 401 || errorData.info.code === 402) {
        const tokenStore = useToken()
        const accountStore = useAccountStore()
        tokenStore.removeToken()
        accountStore.removeAccount()
        ElMessage.error({
            message: error.response.data.msg,
            grouping: true,
        })
        await router.push('/login')
    } else {
        ElMessage.error({
            message: error.response.data.msg,
            grouping: true,
        })
    }
}

// 导出封装的请求方法
export default {
    get,
    post,
    put,
    del,
    file
};
