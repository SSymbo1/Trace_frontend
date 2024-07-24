import request from "@/api/request.js";

export const getAccountInfoPaged = (query) => {
    return request.get("/system/get_account_info", query)
}
