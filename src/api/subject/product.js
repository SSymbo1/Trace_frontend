import request from "@/api/request.js";

export const getProductPaged = (query) => {
    return request.get('/subject/product', query)
}

export const addProduct = (product) => {
    return request.post('/subject/product', product)
}

export const editProduct = (product) => {
    return request.put('/subject/product', product)
}

export const getProductRecordPaged = (query) => {
    return request.get('/subject/product/record', query)
}

export const processApprove = (product) => {
    return request.put('/subject/product/process/approve', product)
}

export const processReject = (product) => {
    return request.put('/subject/product/process/reject', product)
}

export const processBatched = (product) => {
    return request.put('/subject/product/process/batched', product)
}
