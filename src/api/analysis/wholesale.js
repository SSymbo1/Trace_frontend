import request from "@/api/request.js";

export const getBatchData = (query) => {
    return request.get('/analysis/batch', query)
}
