export interface NoticeRequest {
    writer: string;
    title: string;
    content: string;
    file?: File;
}

export interface NoticeDetail {
    idx: number;
    writer: string;
    title: string;
    content: string;
    filename?: string;
    filepath?: string;
    viewcount: number;
    regdate: string;
}

export interface NoticeListResponse {
    status?: string;
    message?: string;
    data?: NoticeItem[];
    totalElements?: number;
    currentPage?: number;
    totalPages?: number;
}

export interface NoticeItem {
    idx: number;
    writer: string;
    title: string;
    content: string;
    filename?: string;
    filepath?: string;
    viewcount: number;
    regdate: string;
}

export interface PrevNextResponse {
    prev: { idx: number; title: string; regdate: string } | null;
    next: { idx: number; title: string; regdate: string } | null;
}

export interface ApiWrapper<T> {
    status: string;
    message: string;
    data: T;
}

export interface CommentSaveDTO {
    idx: number;
    user_idx: number;
    re_writer: string;
    re_content: string;
}

export interface CommentList {
    re_idx: number;
    idx: number;
    user_idx: number;
    re_writer: string;
    re_content: string;
    re_regdate: string;
}