import request from "@/api/request.js";

export const roleSubMenue = () => {
    return request.get('/menue/sub/role')
}

export const enterpriseSubMenue = (keyword) => {
    return request.get('/menue/sub/enterprise', {keyword})
}
