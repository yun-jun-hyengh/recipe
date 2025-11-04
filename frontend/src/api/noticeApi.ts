import NoticeDetailPage from "../pages/NoticeDetailPage";
import axiosInstance from "../service/axiosInstance";
import { NoticeRequest } from "../types/notice";
import { NoticeDetail } from "../types/notice";
import { NoticeListResponse } from "../types/notice";
import { CommentSaveDTO } from "../types/notice";
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
    getList: (params: { searchType: string; keyword: string; page: number}) => {
        return axiosInstance.get<NoticeListResponse>(
            `/api/notice/noticelist`,
            { params }
        );
    },

    noticedetail: (idx: number) => {
        return axiosInstance.get<{ status: string; message: string; data: NoticeDetail}>(
            `/api/notice/noticedetail`,
            { params: { idx }}
        );
    },

    deleteNotice: (idx: number) => {
        return axiosInstance.post<{ status: string; message: string; data: any }>(
            `/api/notice/noticedelete`,
            {idx}
        );
    },

    getNoticeImage: (path: string) => {
        return `${axiosInstance.defaults.baseURL}/api/notice/noticeimage?path=${encodeURIComponent(path)}`;
    },

    prevNext: (idx: number) => axiosInstance.get(`/api/notice/prevnext`, { params: { idx }}),

    updateNotice: (formdata: FormData, token: string | null) => {
        return axiosInstance.post(`/api/notice/noticeupdate`, formdata, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                "Content-Type": "multipart/form-data"
            }
        })
    },

    insertComment: (data: CommentSaveDTO) => {
        return axiosInstance.post(`/api/notice/replyjoin`, data, {
            headers: { "Content-Type": "application/json" },
        });
    }
};