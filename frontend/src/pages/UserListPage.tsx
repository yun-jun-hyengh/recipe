import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
import * as FiIcons from "react-icons/fi";

const UserListPage = () => {
    const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
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
                                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition">
                                <FiSearch className="h-4 w-4" />
                            </button>
                        </div>
                    </div>  
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-gray-400">
                                <th>번호</th>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>전화번호</th>
                                <th>이메일</th>
                                <th>닉네임</th>
                                <th>가입일자</th>
                                <th>비공개레시피사용량</th>
                                <th>제한유무</th>
                                <th>권한</th>
                                <th>회원삭제</th>
                                <th>권한변경</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default UserListPage;