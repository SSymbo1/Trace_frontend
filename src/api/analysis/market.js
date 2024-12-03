import request from "@/api/request.js";

export const getOperationsData = (query) => {
    return request.get('/analysis/operations', query)
}
