import request from "@/api/request.js";

export const getHomeMenue = () => {
    return  request.get('/menue/home')
}
