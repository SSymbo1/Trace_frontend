import request from "@/api/request.js";

export const getImportantEnterpriseData = () => {
    return request.get('/analysis/struct/important')
}

export const addImportantEnterprise = (enterprise) => {
    return request.post('/analysis/struct/important', enterprise)
}

export const deleteImportantEnterpriseAll = () => {
    return request.put('/analysis/struct/important/clear')
}

export const deleteImportantEnterprise = (enterprise) => {
    return request.put('/analysis/struct/important/remove', enterprise)
}

export const deleteImportantEnterpriseBatched = (range) => {
    return request.put('/analysis/struct/important/batch', range)
}

export const getStructData = (query) => {
    return request.get('/analysis/struct', query)
}

export const generateStructReport = (query) => {
    return request.post('/analysis/struct/report', query)
}

export const getStructReportData = (query) => {
    return request.get('/analysis/struct/report', query)
}
