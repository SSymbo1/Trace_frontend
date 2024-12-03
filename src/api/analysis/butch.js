import request from "@/api/request.js";

export const getButchData = (query) => {
    return request.get('/analysis/butch', query)
}
