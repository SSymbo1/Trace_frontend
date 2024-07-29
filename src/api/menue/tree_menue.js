import request from "@/api/request.js";

export const roleMenueTree = () => {
    return request.get('/menue/tree/role')
}
