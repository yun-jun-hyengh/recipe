import React, { useEffect, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
// const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiSettings = FiIcons.FiSettings as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiBell = FiIcons.FiBell as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiUser = FiIcons.FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
import { adminApi } from '../api/adminApi';
import { CustomerRecentList } from '../types/admin';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const AdminMainPage = () => {
  const [users, setUsers] = useState<CustomerRecentList[]>([]);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  useEffect(() => {
    adminApi.getRecentCustomer(token || undefined)
      .then((res) => {
        const response = res.data[0];
        if (response.status === "success") {
          setUsers(response.data);
        }
      })
      .catch((err) => console.error("서버에러", err));
    }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSideBar />

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header */}
        <AdminHeader />

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">Revenue Overview</h3>
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Graph Placeholder]
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">Recent Activity</h3>
            <div className="flex-1 space-y-2 overflow-y-auto">
              {[
                "New user registered (2m ago)",
                "Order #1234 completed (5m ago)",
                "Server maintenance scheduled (1h ago)"
              ].map((act, i) => (
                <div key={i} className="text-sm text-gray-600">{act}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">User Growth (Last 7 Days)</h3>
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Bar Chart Placeholder]
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">Order Status Distribution</h3>
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Pie Chart Placeholder]
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-md rounded-lg mt-6 p-4">
          <h3 className="font-bold mb-2">신규 가입자(최근 1개월)</h3>
          {users.length === 0 ? (
            <p>최근 가입 회원이 없습니다.</p>
          ) : (
            <table className="w-full text-sm text-center">
            <thead>
              <tr className="text-left text-gray-400">
                <th className='text-center'>번호</th>
                <th className='text-center'>이름</th>
                <th className='text-center'>전화번호</th>
                <th className='text-center'>이메일</th>
                <th className='text-center'>가입일자</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_idx} className="border-b hover:bg-gray-50">
                  <td className="p-2">{user.user_idx}</td>
                  <td className="p-2">{user.user_name}</td>
                  <td className="p-2">{user.user_phone}</td>
                  <td className="p-2">{user.user_email}</td>
                  <td className="p-2">{user.regdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminMainPage;
