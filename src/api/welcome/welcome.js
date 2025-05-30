import request from "@/api/request.js";

export const userLogin = (welcome) => {
    return request.post('/welcome/login', welcome)
}

export const userLogout = () => {
    return request.get('/welcome/logout')
}

export const getPictureCaptcha = () => {
    return request.get('/welcome/captcha')
}

export const rePassword = (rePassword) => {
    return request.put('/welcome/password', rePassword)
}
