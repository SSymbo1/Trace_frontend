import request from "@/api/request.js";

export const getAccountInfoPaged = (query) => {
    return request.get("/system/account", query)
}

export const addAccountInfo = (account) => {
    return request.post('/system/account', account)
}

export const setAccountStatue = (statue) => {
    return request.put('/system/account/statue', statue)
}

export const editAccountInfo = (account) => {
    return request.put('/system/account', account)
}
