export interface CustomerRecentList {
    user_idx: number;
    user_name: string;
    user_phone: string;
    user_email: string;
    regdate: string;
}

export interface CustomerSearchDTO {
    page: number;
    pageSize: number;
    user_name?: string;
}

export interface CustomerListData {
    user_idx: number;
    user_id: string;
    user_name: string;
    user_phone: string;
    user_email: string;
    nickname: string;
    regdate: string;
    private_recipe_limit: number;  
    unlimit: number;
    adminchk: number;
    unlimit_result: string;
    auth: string;
    remainingInactive: string;
}

export interface CustomerListResponse {
    status: string;
    message: string;
    data: CustomerListData[];
    totalElements: number;
    currentPage: number;
    totalPages: number;
}

export interface BannerList {
    ba_idx: number;
    ba_img: string;
    ba_img_path: string;
    ba_descript: string;
    ba_use: number;
}