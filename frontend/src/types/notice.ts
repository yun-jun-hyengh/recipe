export interface NoticeRequest {
    writer: string;
    title: string;
    content: string;
    file?: File;
}