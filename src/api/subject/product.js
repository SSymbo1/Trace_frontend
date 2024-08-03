import request from "@/api/request.js";

export const getProductPaged = (query) => {
    return request.get('/subject/product', query)
}
