import axiosInstance from "../service/axiosInstance";
import { SignupRequest, LoginRequest, IdChkRequest } from "../types/auth";

export const authApi = {
    signup: (data: SignupRequest) => axiosInstance.post("/api/customer/join"),
    login: (data: LoginRequest) => axiosInstance.post("/api/customer/login"),
    findId: (data: IdChkRequest) => axiosInstance.post("/api/customer/idchk"),
};