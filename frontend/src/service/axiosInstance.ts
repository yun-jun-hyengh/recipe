import axios from "axios";
import { error } from "console";
import { config } from "process";

const axiosInstance = axios.create({
    baseURL: "http://localhost:10000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if(token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            console.error("인증 오류 발생, 다시 로그인 필요");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
