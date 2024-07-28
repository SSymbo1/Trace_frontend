import request from "@/api/request.js";

export const avatarUpload = (avatar) => {
    return request.file('/file/upload/avatar', avatar)
}
