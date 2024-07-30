import request from "@/api/request.js";

export const getRoleInfoPaged = (query) => {
    return request.get('/system/role', query)
}

export const addRole = (role) => {
    return request.post('/system/role', role)
}

export const editRoleStatue = (role) => {
    return request.put('/system/role', role)
}

export const setRoleStatue = (statue) => {
    return request.put('/system/role/statue', statue)
}

export const enableAllRole = (able) => {
    return request.put('/system/role/enable', able)
}

export const disableAllRole = (able) => {
    return request.put('/system/role/disable', able)
}
