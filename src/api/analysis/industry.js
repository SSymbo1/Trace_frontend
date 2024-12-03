import request from "@/api/request.js";

export const getSupermarketData = (query) => {
    return request.get("/analysis/supermarket", query)
}
