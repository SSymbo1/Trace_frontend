import request from "@/api/request.js";

export const roleSubMenue = () => {
    return request.get('/menue/popup/role')
}

export const enterpriseSubMenue = (keyword) => {
    return request.get('/menue/popup/enterprise', {keyword})
}
