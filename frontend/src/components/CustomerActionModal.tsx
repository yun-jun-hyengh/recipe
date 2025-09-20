import React, { useEffect, useState } from "react";
import { CustomerListData } from "../types/admin";
import { adminApi } from "../api/adminApi";
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
interface CustomerActiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    customer: CustomerListData | null;
    onDelete: () => void;
}

export default function CustomerActionModal({
    isOpen,
    onClose,
    customer,
    onDelete,
}: CustomerActiveModalProps) {
    //const [selectedAdmin, setSelectedAdmin] = useState<number>(customer?.)
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const [adminchk, setAdminchk] = useState<number>(0);
    const [unlimit, setUnlimit] = useState<number>(0);
    useEffect(() => {
        if(customer) {
            setAdminchk(customer.adminchk);
            setUnlimit(customer.unlimit);
        }
    }, [customer]);
    if(!isOpen || !customer) {
        return null;
    }
    const handleDel = () => {
        adminApi.deleteCustomer(customer.user_idx, token || undefined)
            .then((res) => {
                if(res.status === "success") {
                    alert(res.message);
                    onDelete();
                    onClose();
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => console.log("에러 : ", err));
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
                    onClick={onClose}
                    >
                    ✕
                </button>
                <h2 className="text-lg font-bold mb-4 text-center">회원 정보</h2>
                <div className="mb-4 space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">아이디</label>
                        <input
                            type="text"
                            value={customer.user_id}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이름</label>
                        <input
                            type="text"
                            value={customer.user_name}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">전화번호</label>
                        <input
                            type="text"
                            value={customer.user_phone}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">이메일</label>
                        <input
                            type="text"
                            value={customer.user_email}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">닉네임</label>
                        <input
                            type="text"
                            value={customer.nickname}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">가입일자</label>
                        <input
                            type="text"
                            value={customer.regdate}
                            readOnly
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">레시피사용개수</label>
                        <input
                            type="text"
                            value={customer.private_recipe_limit}
                            className="w-full border rounded px-3 py-2 bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">레시피사용권한</label>
                        <select
                            value={unlimit}
                            onChange={(e) => setUnlimit(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2 bg-gray-100 text-center"
                        >
                            {customer.unlimit === 1 ? (
                                <>
                                    <option value={1}>제한없음</option>
                                    <option value={0}>제한</option>
                                </>
                            ) : (
                                <>
                                    <option value={0}>제한</option>
                                    <option value={1}>제한없음</option>
                                </>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">권한</label>
                        <select
                            value={adminchk}
                            onChange={(e) => setAdminchk(Number(e.target.value))}
                            className="w-full border rounded px-3 py-2 bg-gray-100 text-center"
                        >
                            {customer.adminchk === 1 ? (
                                <>
                                    <option value={1}>관리자</option>
                                    <option value={0}>일반사용자</option>
                                </>
                            ) : (
                                <>
                                    <option value={0}>일반사용자</option>
                                    <option value={1}>관리자</option>
                                </>
                            )}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                    <button className="px-4 py-2 rounded border" onClick={onClose}>취소</button>
                    <button
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
                        onClick={() => handleDel()}
                    >
                        삭제
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-700"
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    )
}