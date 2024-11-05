import request from "@/api/request.js";

export const getAnimalData = (query) => {
    return request.get('/analysis/animal', query)
}
