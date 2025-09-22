import axios from "axios";
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
    }
}
