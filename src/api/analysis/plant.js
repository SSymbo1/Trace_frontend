import request from "@/api/request.js";

export const getPlantData = (query) => {
    return request.get('/analysis/plant', query)
}
