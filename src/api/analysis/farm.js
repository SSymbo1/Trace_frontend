import request from "@/api/request.js";

export const getFarmData = (query) => {
    return request.get('/analysis/farm', query)
}
