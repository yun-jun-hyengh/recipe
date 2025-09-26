import React, { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import { useNavigate } from "react-router-dom";

const BannerRegisterPage = () => {
    const [ba_img, setBaImg] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    // const [isActive, setIsActive] = useState(true);
    const [ba_descript, setBaDescript] = useState<string>("");
    const [ba_use, setBaUse] = useState(1);
    const navigate = useNavigate();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const width = img.width;
            const height = img.height;
            const ratio = width / height;

            if(Math.abs(ratio - 16 / 5) > 0.01) {
                alert("이미지 비율이 맞지 않습니다. 1536x480 비율에 맞는 이미지를 선택하세요.");
                setBaImg(null);
                setPreview(null);
                e.target.value = "";
                return;
            }
            setBaImg(file);
            setPreview(img.src);
        }
        // if(file) {
        //     setBaImg(file);
        //     setPreview(URL.createObjectURL(file));
        // }
    }

    const handleRegister = () => {

    }

    const handleCancle = () => {
        navigate('/admin/bannerList');
    }

    return(
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <AdminHeader />
                <h2 className="font-bold mb-2">배너등록페이지</h2><br></br>
                <div className="h-[800px] overflow-y-auto">
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">배너 이미지</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full"
                        />
                        {preview && (
                            <div className="w-[458px] h-[258px] bg-gray-100 overflow-hidden rounded-lg shadow-md mt-4">
                                <img
                                    src={preview}
                                    className="w-[458px] h-[258px] object-fill"
                                />
                            </div>
                        )}
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
                        <span className="block font-semibold mb-2">사용 여부:</span>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only"
                                    checked={ba_use === 1}
                                    onChange={() => setBaUse(ba_use === 1 ? 0 : 1)}
                                    aria-checked={ba_use === 1}
                                />

                                {/* 토글 트랙: 부모가 relative가 되어야 dot의 absolute가 동작 */}
                                <span
                                    className={`relative inline-block w-14 h-7 rounded-full transition-colors duration-300 ${
                                        ba_use === 1 ? "bg-green-500" : "bg-gray-300"
                                    }`}
                                    aria-hidden="true"
                                >
                                {/* 움직이는 dot */}
                                <span
                                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                                    ba_use === 1 ? "translate-x-7" : "translate-x-0"
                                    }`}
                                />
                                </span>

                                {/* 상태 텍스트 */}
                                <span className="ml-3 font-medium">{ba_use === 1 ? "사용" : "미사용"}</span>
                            </label>
                    </div>

                    <div className="mb-4 flex gap-4 mt-8">
                        <button
                            className="py-2 font-bold text-white transition duration-300 ease-in-out bg-[#000066] rounded-md shadow-md px-14 hover:bg-[#000033]"
                            onClick={handleRegister}
                        >
                            등록
                        </button>
                        <button
                            className="py-2 font-bold text-gray-800 transition duration-300 ease-in-out bg-gray-200 rounded-md shadow-md px-14 hover:bg-gray-300"
                            onClick={handleCancle}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BannerRegisterPage;