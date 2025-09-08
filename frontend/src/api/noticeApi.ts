import axiosInstance from "../service/axiosInstance";
import { NoticeRequest } from "../types/notice";

export const noticeApi = {
    // noticewrite: (formData: FormData) => axiosInstance.post("/api/notice/noticewrite", formData, {
    //     headers: { "Content-Type": "multipart/form-data" }, 
    // }),
    noticewrite: (formData: FormData, token: string | null) => {
        return axiosInstance.post("/api/notice/noticewrite", formData, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "multipart/form-data"
            }
        })
    }
};