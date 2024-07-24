import request from "@/api/request.js";

export const getWhoIs = () => {
    return  request.get("/common/whois")
}
