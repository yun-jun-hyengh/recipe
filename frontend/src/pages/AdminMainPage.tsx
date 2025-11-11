import React, { useEffect, useState } from 'react';
import * as FiIcons from 'react-icons/fi';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';
// const FiSearch = FiIcons.FiSearch as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiSettings = FiIcons.FiSettings as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiBell = FiIcons.FiBell as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
// const FiUser = FiIcons.FiUser as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
import { adminApi } from '../api/adminApi';
import { CustomerRecentList, NoticeTop3Data } from '../types/admin';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const AdminMainPage = () => {
  const [users, setUsers] = useState<CustomerRecentList[]>([]);
  const [notices, setNotices] = useState<NoticeTop3Data[]>([]);
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
    
    adminApi.getNoticeTop3(token)
      .then((res) => {
        const response = res.data[0];
        if (response.status === "success") {
          setNotices(response.data);
        }
      }).catch((err) => {
        console.log(err);
      })
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
            <h3 className="font-bold mb-2">접속자 통계</h3>
            <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              [Graph Placeholder]
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">인기 레시피</h3>
            <div className="flex-1 space-y-2 overflow-y-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2">레시피번호</th>
                    <th className="border border-gray-300 p-2">레시피제목</th>
                    <th className="border border-gray-300 p-2">작성자</th>
                    <th className="border border-gray-300 p-2">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-1">1</td>
                    <td className="border border-gray-300 p-1">김치찌개</td>
                    <td className="border border-gray-300 p-1">홍길동</td>
                    <td className="border border-gray-300 p-1">2025-09-18</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1">2</td>
                    <td className="border border-gray-300 p-1">된장찌개</td>
                    <td className="border border-gray-300 p-1">이몽룡</td>
                    <td className="border border-gray-300 p-1">2025-09-17</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1">3</td>
                    <td className="border border-gray-300 p-1">비빔밥</td>
                    <td className="border border-gray-300 p-1">성춘향</td>
                    <td className="border border-gray-300 p-1">2025-09-16</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1">4</td>
                    <td className="border border-gray-300 p-1">불고기</td>
                    <td className="border border-gray-300 p-1">임꺽정</td>
                    <td className="border border-gray-300 p-1">2025-09-15</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-1">5</td>
                    <td className="border border-gray-300 p-1">삼계탕</td>
                    <td className="border border-gray-300 p-1">강감찬</td>
                    <td className="border border-gray-300 p-1">2025-09-14</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Middle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">최근공지사항</h3>
            <div className="flex-1 rounded-lg flex items-center justify-center">
              {notices.length === 0 ? (
                <p>최근 공지사항 게시글이 없습니다.</p>
              ) : (
                <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 p-2">번호</th>
                      <th className="border border-gray-300 p-2">제목</th>
                      <th className="border border-gray-300 p-2">작성자</th>
                      <th className="border border-gray-300 p-2">조회수</th>
                      <th className="border border-gray-300 p-2">등록일</th>
                      <th className="border border-gray-300 p-2">댓글수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notices.map((notice, index) => (
                      <tr key={notice.idx}>
                        <td className="border border-gray-300 p-2">{index + 1}</td>
                        <td className="border border-gray-300 p-2">{notice.title}</td>
                        <td className="border border-gray-300 p-2">{notice.writer}</td>
                        <td className="border border-gray-300 p-2">{notice.viewcount}</td>
                        <td className="border border-gray-300 p-2">{notice.regdate}</td>
                        <td className="border border-gray-300 p-2">{notice.cnt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col min-h-60">
            <h3 className="font-bold mb-2">최근 고객 문의사항</h3>
            <div className="flex-1 rounded-lg flex items-center justify-center">
              <table className="table-auto border-collapse border border-gray-300 w-full text-center">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2">번호</th>
                    <th className="border border-gray-300 p-2">제목</th>
                    <th className="border border-gray-300 p-2">작성자</th>
                    <th className="border border-gray-300 p-2">등록일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">배송이 너무 늦어요</td>
                    <td className="border border-gray-300 p-2">김철수</td>
                    <td className="border border-gray-300 p-2">2025-09-18</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2</td>
                    <td className="border border-gray-300 p-2">제품 불량 문의</td>
                    <td className="border border-gray-300 p-2">이영희</td>
                    <td className="border border-gray-300 p-2">2025-09-17</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">3</td>
                    <td className="border border-gray-300 p-2">환불 절차가 어떻게 되나요?</td>
                    <td className="border border-gray-300 p-2">박민수</td>
                    <td className="border border-gray-300 p-2">2025-09-16</td>
                  </tr>
                </tbody>
              </table>
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
