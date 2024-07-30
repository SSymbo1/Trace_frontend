import request from "@/api/request.js";

export const getSensitiveAccountPaged = (keyword, currentPage, pageSize) => {
    return request.get('/system/sensitive/account', {keyword, currentPage, pageSize})
}

export const getSensitiveEnterprisePaged = (keyword, currentPage, pageSize) => {
    return request.get('/system/sensitive/enterprise', {keyword, currentPage, pageSize})
}

export const getSensitiveRolePaged = (keyword, currentPage, pageSize) => {
    return request.get('/system/sensitive/role',{keyword, currentPage, pageSize})
}
