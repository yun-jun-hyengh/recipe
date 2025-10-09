import axios, { AxiosResponse } from "axios";
import axiosInstance from "../service/axiosInstance";
import { CustomerRecentList } from "../types/admin";
import { CustomerSearchDTO, CustomerListResponse } from "../types/admin";

export const adminApi = {
    getRecentCustomer: (token?: string) => {
        return axiosInstance.get<{
            status: string;
            message: string;
            data: CustomerRecentList[];
        }[]>(
            "/api/admin/recent",
            {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            }
        )
    },

    getCustomerList: (params: CustomerSearchDTO, token?: string) => {
        return axiosInstance.get<CustomerListResponse[]>("/api/admin/userList", {
            params,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        }).then((res) => res.data);
    },

    deleteCustomer: (user_idx: number, token?: string) => {
        return axiosInstance.delete(`/api/admin/userdel`, {
            data: { user_idx },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((res) => res.data);
    },

    updateCustomer: (customer: {user_idx: number; private_recipe_limit: number; unlimit: number; adminchk: number}, token?: string) => {
        return axiosInstance.post(`/api/admin/userupdate`, customer, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    },

    bannerRegister: (formData: FormData, token?: string) => {
        return axiosInstance
            .post("/api/admin/bannerreg", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });
    },

    getBannerList: (page: number, size: number, token?: string): Promise<AxiosResponse<any>> => {
        // return axiosInstance.get(`/api/admin/bannerList?page=${page}&size=${size}`, {
        //     headers: token ? { Authorization: `Bearer ${token}` } : {},
        // });

        return axiosInstance.get(`/api/admin/bannerList`, {
            params: { page, size },
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
    },

    // getBannerImage: (path: string, token?: string) => {
    //     return 
    // }

    getBannerImage: (path: string, token: string) => {
        // return axiosInstance.get(`/api/admin/bannerImage`, {
        //     params: { path },
        //     responseType: "blob",
        //     headers: token ? { Authorization: `Bearer ${token}` } : {},
        // }) as Promise<AxiosResponse<Blob, any>>;
        return `${axiosInstance.defaults.baseURL}/api/admin/bannerImage?path=${encodeURIComponent(
            path
        )}&token=${encodeURIComponent(token)}`;
    },

    deleteBanners: (ba_idx_list: number[], token: string) => {
        return axiosInstance.post(
            `/api/admin/bannerDelete`,
            { ba_idx_list },
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
    }
}
