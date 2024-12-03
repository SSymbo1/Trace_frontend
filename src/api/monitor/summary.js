import request from "@/api/request.js";

export const getHistogramData = (query) => {
    return request.get('/monitor/summary/histogram', query)
}

export const getSummaryData = (query) => {
    return request.get('/monitor/summary', query)
}

export const getDataMonitorHistogramData = (query) => {
    return request.get('/monitor/node/histogram', query)
}

export const getDataMonitorPieData = (query) => {
    return request.get('/monitor/node/pie', query)
}

export const getDataMonitorTableData = (query) => {
    return request.get('/monitor/node', query)
}

export const getInfoPieData = (query) => {
    return request.get('/monitor/info/pie', query)
}

export const getInfo = (query) => {
    return request.get('/monitor/info', query)
}
