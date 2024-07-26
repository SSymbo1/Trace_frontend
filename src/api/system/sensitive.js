import request from "@/api/request.js";

export const getSensitiveAccountPaged = (keyword, currentPage, pageSize) => {
    return request.get('/system/get_sensitive_account_info', {keyword, currentPage, pageSize})
}
