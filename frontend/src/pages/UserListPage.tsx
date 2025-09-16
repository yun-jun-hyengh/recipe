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
                                <th>번호</th><th>이름</th><th>전화번호</th><th>이메일</th><th>가입일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["#1000","Sarah Wilson","$462.14","Cancelled","02/08/2025"],
                                ["#7002","Sarah Wilson","$299.90","Shipped","02/08/2025"],
                                ["#6802","John Doe","$442.68","Shipped","02/08/2025"],
                                ["#5034","Jane Smith","$223.79","Completed","02/08/2025"],
                                ["#9102","Mike Johnson","$96.73","Cancelled","04/08/2025"],
                            ].map((order, i) => (
                                <tr key={i} className="border-t">{order.map((col, j) => <td key={j} className="py-4">{col}</td>)}</tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default UserListPage;