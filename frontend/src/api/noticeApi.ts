import NoticeDetailPage from "../pages/NoticeDetailPage";
import axiosInstance from "../service/axiosInstance";
import { NoticeRequest } from "../types/notice";
import { NoticeDetail } from "../types/notice";

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
    },
    getList: () => axiosInstance.get("/api/notice/noticelist"),

    noticedetail: (idx: number) => {
        return axiosInstance.get<{ status: string; message: string; data: NoticeDetail}>(
            `/api/notice/noticedetail`,
            { params: { idx }}
        );
    },

    deleteNotice: (idx: number) => {
        axiosInstance.post<{ status: string; message: string; data: any }>(
            `/api/notice/noticedelete`,
            { params: { idx }}
        );
    }
};