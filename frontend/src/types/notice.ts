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