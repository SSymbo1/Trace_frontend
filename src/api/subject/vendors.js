import request from "@/api/request.js";

export const getVendorsPaged = (query) => {
    return request.get('/subject/vendors',query)
}
