import request from "@/api/request.js";

export const getAccountInfoPaged = (query) => {
    return request.get("/system/get_account_info", query)
}

export const addAccountInfo = (account) => {
    return request.post('/system/add_account_info', account)
}

export const setAccountStatue = (statue) => {
    return request.put('/system/set_account_statue', statue)
}

export const editAccountInfo = (account) => {
    return request.put('/system/edit_account_info', account)
}
