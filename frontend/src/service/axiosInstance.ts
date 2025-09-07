import axios from "axios";
import { error } from "console";
import { config } from "process";
import { store } from "../store/store";
import { setAuth, logout } from "../store/authSlice";

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
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry) {
            //console.error("인증 오류 발생, 다시 로그인 필요");
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if(!refreshToken) {
                store.dispatch(logout());
                return Promise.reject(error);
            }

            return axiosInstance.post(`/api/customer/refresh=${refreshToken}`)
                .then((res) => {
                    const data = res.data;
                    store.dispatch(
                        setAuth({
                            accessToken: data.accessToken,
                            refreshToken: data.refresh_token,
                            user: JSON.parse(localStorage.getItem("user")!),
                        })
                    );
                    originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
                    return axiosInstance(originalRequest);
                })
                .catch((err) => {
                    store.dispatch(logout());
                    return Promise.reject(err);
                });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
