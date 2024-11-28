import request from "@/api/request.js";

export const getTraceDataList = (query) => {
    return request.get('/analysis/trace', query)
}

export const getTraceReportData = (query) => {
    return request.get('/analysis/trace/report', query)
}
