import React from 'react';
import AdminSideBar from '../components/AdminSideBar';
import AdminHeader from '../components/AdminHeader';

const PopupListPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <AdminHeader />
                <div className="bg-white shadow-md rounded-lg mt-6 p-4 h-[800px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold mb-2">팝업 리스트</h3>
                        <div className="flex items-center space-x-2">
                            <button
                                className="px-4 py-2 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-900 transition">
                                팝업등록
                            </button>
                        </div>
                    </div>
                    <table className='w-full text-sm text-center'>
                        <thead>
                            <tr className="text-left text-gray-400">
                                <th className='text-center'>번호</th>
                                <th className='text-center'>팝업 제목</th>
                                <th className='text-center'>배너 설명</th>
                                <th className='text-center'>시작일</th>
                                <th className='text-center'>종료일</th>
                                <th className='text-center'>배너 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default PopupListPage;