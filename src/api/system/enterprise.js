import request from "@/api/request.js";

export const getEnterpriseInfoPaged = (query) => {
    return request.get('/system/enterprise', query)
}

export const addEnterprise = (enterprise) => {
    return request.post('/system/enterprise', enterprise)
}

export const editEnterprise = (enterprise) => {
    return request.put('/system/enterprise', enterprise)
}
