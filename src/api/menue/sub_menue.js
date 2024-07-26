import request from "@/api/request.js";

export const roleSubMenue = () => {
    return request.get('/menue/role_sub_menue')
}

export const enterpriseSubMenue = (keyword) => {
    return request.get('/menue/enterprise_sub_menue', {keyword})
}
