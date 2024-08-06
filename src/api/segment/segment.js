import request from "@/api/request.js";

export const getAppearsPaged = (query) => {
    return request.get('/segment/approach', query)
}

export const getEntryPaged = (query) => {
    return request.get('/segment/entrance', query)
}

export const requestQrCode = (trace) => {
    return request.get('/segment/QRCode',{trace})
}
