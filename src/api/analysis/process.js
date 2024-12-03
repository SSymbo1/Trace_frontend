import request from "@/api/request.js";

export const getProcessData = (query) => {
    return request.get('/analysis/process', query)
}
