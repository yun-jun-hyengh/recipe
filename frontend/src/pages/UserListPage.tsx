import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import * as FiIcons from "react-icons/fi";
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { CustomerListData, CustomerListResponse, CustomerSearchDTO } from '../types/admin';
import { adminApi } from "../api/adminApi";

const UserListPage = () => {
    const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
    const token = useSelector((state: RootState) => state.auth.accessToken);

    const [customers, setCustomers] = useState<CustomerListData[]>([]);
    const [user_name, setUserName] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = () => {
        const params: CustomerSearchDTO = { page, pageSize, user_name };
        adminApi.getCustomerList(params, token || undefined)
            .then((res: CustomerListResponse[]) => {
                const response = res[0];
                setCustomers(response.data);
                setTotalPages(response.totalPages);
            })
            .catch((err) => {
                console.log("서버에러 : ", err);
            });
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const pageBlock = 10;
    const startPage = Math.floor((page - 1) / pageBlock) * pageBlock + 1;
    const endPage = Math.min(startPage + pageBlock - 1, totalPages);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <AdminHeader />
                <div className="bg-white shadow-md rounded-lg mt-6 p-4 h-[800px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold mb-2">회원 리스트</h3>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="이름검색..."
                                value={user_name}
                                onChange={(e) => setUserName(e.target.value)}
                                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button 
                                onClick={() => {
                                    setPage(1);
                                    fetchData();
                                }}
                                className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
                                <FiSearch className="h-4 w-4" />
                            </button>
                        </div>
                    </div>  
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="text-left text-gray-400">
                                <th className='text-center'>번호</th>
                                <th className='text-center'>아이디</th>
                                <th className='text-center'>이름</th>
                                <th className='text-center'>전화번호</th>
                                <th className='text-center'>이메일</th>
                                <th className='text-center'>닉네임</th>
                                <th className='text-center'>가입일자</th>
                                <th className='text-center'>비공개레시피사용량</th>
                                <th className='text-center'>제한유무</th>
                                <th className='text-center'>비공개레시피사용개수</th>
                                <th className='text-center'>권한</th>
                                <th className='text-center'>회원삭제</th>
                                <th className='text-center'>권한변경</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers?.map((m) => (
                                <tr key={m.user_idx}>
                                    <td className="p-6">{m.user_idx}</td>
                                    <td className="p-6">{m.user_id}</td>
                                    <td className="p-6">{m.user_name}</td>
                                    <td className="p-6">{m.user_phone}</td>
                                    <td className="p-6">{m.user_email}</td>
                                    <td className="p-6">{m.nickname}</td>
                                    <td className="p-6">{m.regdate}</td>
                                    <td className="p-6">{m.remainingInactive}</td>
                                    <td className='p-6'>{m.unlimit_result}</td>
                                    <td className='p-6'>{m.private_recipe_limit}</td>
                                    <td className='p-6'>{m.auth}</td>
                                    <td className='p-6'></td>
                                    <td className='p-6'></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='flex justify-center mt-4 gap-1'>
                        {startPage > 1 && (
                            <button
                                onClick={() => setPage(startPage - 1)}
                                className="px-3 py-1 rounded bg-gray-200"
                            >
                                &lt;
                            </button>
                        )}
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((num) => (
                            <button
                                key={num}
                                onClick={() => setPage(num)}
                                className={`px-3 py-1 rounded ${
                                page === num ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            >
                                {num}
                            </button>
                        ))}

                        {endPage < totalPages && (
                            <button
                                onClick={() => setPage(endPage + 1)}
                                className="px-3 py-1 rounded bg-gray-200"
                            >
                                &gt;
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserListPage;