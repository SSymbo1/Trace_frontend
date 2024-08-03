import request from "@/api/request.js";

export const avatarUpload = (avatar) => {
    return request.file('/file/upload/avatar', avatar)
}

export const productExcelUpload = (excel) => {
    return request.file('/file/upload/product', excel)
}

export const productImgUpload = (product) => {
    return request.file('/file/upload/goods', product)
}
