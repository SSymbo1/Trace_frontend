import request from "@/api/request.js";

export const getWhoIs = () => {
    return request.get("/common/whois")
}

export const decodePass = (decode) => {
    return request.post("/common/decode_password", decode)
}

export const getAccountEditInfo = (accountId) => {
    return request.get('/common/edit_account_info', {accountId})
}
