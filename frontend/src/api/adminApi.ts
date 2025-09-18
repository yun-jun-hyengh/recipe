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
    }
}
