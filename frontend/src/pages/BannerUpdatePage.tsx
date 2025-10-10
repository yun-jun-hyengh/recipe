import React, { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { BannerList } from "../types/admin";
import { adminApi } from '../api/adminApi';

const BannerUpdatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const banner = location.state as BannerList;

    const [ba_descript, setBaDescript] = useState(banner.ba_descript);
    const [ba_use, setBaUse] = useState(banner.ba_use);
    const [ba_idx] = useState<number>(banner.ba_idx);
    // const [ba_img_path, setBaImgPath] = useState(banner.ba_img_path);

    const handleDelete = () => {
        const baIdxArray = [banner.ba_idx];
        adminApi.deleteBanners(baIdxArray, token ?? "")
            .then((res) => {
                if(res.data.status === "success") {
                    alert(res.data.message);
                    navigate("/admin/bannerList")
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleUpdate = () => {
        adminApi.updateBanner(ba_idx, ba_descript, ba_use, token ?? "")
            .then((res) => {
                if(res.data.status === "success") {
                    alert(res.data.message);
                    navigate("/admin/bannerList");
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <AdminHeader />
                <h2 className="font-bold mb-2">배너수정페이지</h2><br></br>
                <div className="h-[800px] overflow-y-auto">
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">배너 이미지</label>
                            <div className="w-[458px] h-[258px] bg-gray-100 overflow-hidden rounded-lg shadow-md mt-4">
                                <img
                                    src={adminApi.getBannerImage(`${banner.ba_img_path}`, token!)}
                                    className="w-[458px] h-[258px] object-fill"
                                />
                            </div>
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">배너 상세설명</label>
                        <textarea
                            value={ba_descript}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                                setBaDescript(e.target.value)
                            }
                            className="w-[850px] border rounded-lg p-2"
                            rows={4}
                            placeholder="배너 상세 설명을 입력하세요"
                        />
                    </div>
                    <div className="mb-4">
                        <span className="block font-semibold mb-2">노출 상태:</span>
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={ba_use === 1}
                                onChange={() => setBaUse(ba_use === 1 ? 0 : 1)}
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300 relative">
                            <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6"></div>
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-700">
                                {ba_use === 1 ? "사용" : "미사용"}
                            </span>
                        </label>
                    </div>

                    <div className="mb-4 flex gap-4 mt-8">
                        <button
                            onClick={handleUpdate}
                            className="py-2 font-bold text-white transition duration-300 ease-in-out bg-[#000066] rounded-md shadow-md px-14 hover:bg-[#000033]"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="py-2 font-bold text-white transition duration-300 ease-in-out bg-red-600 rounded-md shadow-md px-14 hover:bg-red-700"
                        >
                            삭제
                        </button>
                        <button
                            onClick={() => navigate("/admin/bannerList")}
                            className="py-2 font-bold text-gray-800 transition duration-300 ease-in-out bg-gray-200 rounded-md shadow-md px-14 hover:bg-gray-300"
                        >
                            취소
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default BannerUpdatePage;