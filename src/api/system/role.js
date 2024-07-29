import request from "@/api/request.js";

export const getRoleInfoPaged = (query) => {
    return request.get('/system/role', query)
}

export const addRole = (role) => {
    return request.post('/system/role', role)
}
