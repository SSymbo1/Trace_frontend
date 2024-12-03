import request from "@/api/request.js";

export const homeHistogram = () => {
    return request.get('/common/statistics/line')
}

export const homeCardData = () => {
    return request.get('/common/statistics/card')
}

export const getWhoIs = () => {
    return request.get("/common/whois")
}

export const decodePass = (decode) => {
    return request.post("/common/decode/password", decode)
}

export const getAccountEditInfo = (accountId) => {
    return request.get('/common/account', {accountId})
}

export const getEnterpriseEditInfo = (enterpriseId) => {
    return request.get('/common/enterprise', {enterpriseId})
}

export const getRoleEditInfo = (roleId) => {
    return request.get('/common/role', {roleId})
}

export const getProductEditInfo = (productId) => {
    return request.get('/common/product', {productId})
}

export const getApproverInfo = (approverId) => {
    return request.get('/common/approver', {approverId})
}

export const getPlatformDataCollectRingData = () => {
    return request.get('/common/platform/collect/ring')
}

export const getPlatformEnterpriseCollectData = () => {
    return request.get('/common/platform/enterprise')
}

export const getPlatformProductCollectData = () => {
    return request.get('/common/platform/product')
}

export const getPlatformTraceCollectData = () => {
    return request.get('/common/platform/trace')
}

export const getPlatformMapData = () => {
    return request.get('/common/platform/map')
}
