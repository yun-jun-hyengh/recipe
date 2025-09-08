import axiosInstance from "../service/axiosInstance";
import { NoticeRequest } from "../types/notice";

export const noticeApi = {
    noticewrite: (data: NoticeRequest) => axiosInstance.post("/api/notice/noticewrite", data),
};