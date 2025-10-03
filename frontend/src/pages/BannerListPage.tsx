import React, { useEffect, useState } from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { BannerList } from '../types/admin';
import { adminApi } from '../api/adminApi';
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const BannerListPage = () => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const [banners, setBanners] = useState<BannerList[]>([]);
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);

    const handleRegister = () => {
        navigate('/admin/bannerjoin');
    }

    const loadBanners = (p: number) => {
        // adminApi.getBannerList(page, size, token || undefined)
        //     .then(res => {
        //         const listData = res.data[0].data as BannerList[];
        //         setBanners(listData);
        //         setTotalPages(res.data[0].totalPages);
        //     });
        const reqPage = Math.max(1, p);
        adminApi.getBannerList(reqPage, size, token || undefined).then((res) => {
            const payload = Array.isArray(res.data) ? res.data[0] : res.data;
            const data = payload?.data ?? [];
            const tp = payload?.totalPages ?? 1;
            setBanners(data);
            setTotalPages(tp);
            setPage(reqPage);
        })
    }

    useEffect(() => {
        if (!token) return;
        loadBanners(page);
    }, [page, token]);

    const goPage = (p: number) => {
        if(p < 1 || p > totalPages) return;
        setPage(p);
    }

    const maxButtons = 10;
    const startPage = Math.floor((page - 1) / maxButtons) * maxButtons + 1;
    const endPage = Math.min(startPage + maxButtons - 1, totalPages);

    return(
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <AdminHeader />
                <div className="bg-white shadow-md rounded-lg mt-6 p-4 h-[800px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold mb-2">배너 리스트</h3>
                        <div className="flex items-center space-x-2">
                            <button
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition">
                                배너삭제
                            </button>
                            <button
                                onClick={handleRegister} 
                                className="px-4 py-2 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900 transition">
                                배너등록
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="text-left text-gray-400">
                                <th className='text-center'>번호</th>
                                <th className='text-center'>배너 이미지</th>
                                <th className='text-center'>배너 설명</th>
                                <th className='text-center'>노출 상태</th>
                                <th className='text-center'>배너 수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map((b, idx) => (
                                <tr key={b.ba_idx}>
                                    <td className="p-4">{b.ba_idx}</td>
                                    <td className="p-4 text-center">
                                        <img
                                            src={adminApi.getBannerImage(`${b.ba_img_path}`, token!)}
                                            className='mx-auto'
                                            width={200}
                                        />
                                    </td>
                                    <td className="p-4">{b.ba_descript}</td>
                                    <td className="p-4">{b.ba_use === 1 ? "사용" : "미사용"}</td>
                                    <td className="p-4">
                                        <button
                                            className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                        >
                                            수정
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center mt-4">
                        <button
                          onClick={() => goPage(page - 1)}
                          disabled={page <= 1}
                          className="px-3 py-1 bg-gray-200 rounded mr-2"
                        >
                          이전
                        </button>

                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                          const pageNumber = startPage + i;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => goPage(pageNumber)}
                              className={`px-3 py-1 mx-1 rounded ${
                                pageNumber === page ? "bg-purple-700 text-white font-bold" : "bg-gray-200"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}

                        <button
                          onClick={() => goPage(page + 1)}
                          disabled={page >= totalPages}
                          className="px-3 py-1 bg-gray-200 rounded ml-2"
                        >
                          다음
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default BannerListPage;