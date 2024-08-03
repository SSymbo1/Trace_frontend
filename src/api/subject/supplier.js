import request from "@/api/request.js";

export const getSupplierPaged = (query) => {
    return request.get('/subject/supplier', query)
}
