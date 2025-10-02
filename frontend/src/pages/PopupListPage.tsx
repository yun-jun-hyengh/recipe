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

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PopupListPage;