import axios from 'axios';
import {ElMessage} from "element-plus";
import {useToken} from "@/store/base/token.js";
import {useBackend} from "@/store/base/backend.js";
import router from "@/router/index.js";
import {useAccountStore} from "@/store/base/account.js";

const tokenStore = useToken()
const accountStore = useAccountStore()

//  创建一个 Axios 实例
const request = axios.create({
    baseURL: useBackend().backend, // 设置基础 URL
    timeout: 60000, // 设置超时时间
});

//  处理请求操作，在请求接口时请求头携带token
request.interceptors.request.use(
    (config) => {
        //  pinia中是否有token，如果有，请求接口时在请求头中携带token
        if (tokenStore.getToken() !== "" || tokenStore.getToken() !== undefined || tokenStore.getToken() !== null) {
            config.headers = {...config.headers, token: tokenStore.getToken()}
        }
        return config
    },
    (err) => Promise.reject(err)
)

//  封装 GET 请求
export const get = async (url, params = {}) => {
    try {
        const response = await request.get(url, {params});
        if (response.data.code === 300) {
            ElMessage.warning({
                message: response.data.message,
                grouping: true
            })
        }
        //  在响应头中是否有refresh_token续约token字段，如果有则替换pinia中的token
        if ("refresh_token" in response.headers) {
            tokenStore.setToken(response.headers.refresh_token)
        }
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

//  封装 POST 请求
export const post = async (url, data = {}) => {
    try {
        const response = await request.post(url, data);
        if ("refresh_token" in response.headers) {
            tokenStore.setToken(response.headers.refresh_token)
        }
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

//  封装 PUT 请求
export const put = async (url, data = {}) => {
    try {
        const response = await request.put(url, data);
        if ("refresh_token" in response.headers) {
            tokenStore.setToken(response.headers.refresh_token)
        }
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

//  封装 DELETE 请求
export const del = async (url, data = {}) => {
    try {
        const response = await request.delete(url, {data});
        if ("refresh_token" in response.headers) {
            tokenStore.setToken(response.headers.refresh_token)
        }
        return response.data;
    } catch (error) {
        await handleError(error)
    }
};

//  封装文件上传请求
export const file = async (url, data = {}) => {
    const config = {
        headers: {
            'token': tokenStore.getToken(),
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const response = await request.post(url, data, config);
        if ("refresh_token" in response.headers) {
            tokenStore.setToken(response.headers.refresh_token)
        }
        return response.data
    } catch (error) {
        await handleError(error)
    }
}

//  处理错误
const handleError = async (error) => {
    console.log(error.response)
    const errorData = error.response.data.data
    if (errorData.info.code === 410 || errorData.info.code === 420) {
        tokenStore.removeToken()
        accountStore.removeAccount()
        ElMessage.error({
            message: error.response.data.message,
            grouping: true,
        })
        await router.push('/login')
    } else {
        ElMessage.error({
            message: error.response.data.message,
            grouping: true,
        })
    }
    // if (error.response.data.data.info.code === 410) {
    //     ElNotification.error({
    //         title: '失败',
    //         message: error.response.data.data.info.message,
    //         offset: 48
    //     })
    // }
}

//  导出封装的请求方法
export default {
    get,
    post,
    put,
    del,
    file
};
