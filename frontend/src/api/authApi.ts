import axiosInstance from "../service/axiosInstance";
import { SignupRequest, LoginRequest, IdChkRequest, FindIdRequest } from "../types/auth";

export const authApi = {
    signup: (data: SignupRequest) => axiosInstance.post("/api/customer/join", data, {headers: { "Content-Type": "application/json" },}),
    login: (data: LoginRequest) => axiosInstance.post("/api/customer/login", data, {headers: { "Content-Type": "application/json" },}),
    findId: (data: IdChkRequest) => axiosInstance.post("/api/customer/idchk", data, {headers: { "Content-Type": "application/json" },}),
    findUserId: (data: FindIdRequest) => axiosInstance.post("/api/customer/findid", data, {headers: { "Content-Type": "application/json" },}),
    refresh: (refreshToken: string) => axiosInstance.post(`/api/customer/refresh=${refreshToken}`),
};