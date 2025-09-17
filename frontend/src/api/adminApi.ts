import axiosInstance from "../service/axiosInstance";
import { CustomerRecentList } from "../types/admin";

export const adminApi = {
    // getRecentCustomer: (token?: string) => {
    //     return axiosInstance.get<{ status: string; message: string; data: CustomerRecentList[] }>(
    //         "/api/admin/recent",
    //         {
    //             headers: token ? { Authorization: `Bearer ${token}` } : {},
    //         }
    //     );
    // },
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
    }
}
