export interface SignupRequest {
    user_id: string;
    user_pw: string;
    user_name: string;
    nickname: string;
    user_email: string;
    user_phone: string;
}

export interface LoginRequest {
    user_id: string;
    user_pw: string;
}

export interface IdChkRequest {
    user_id: string;
}