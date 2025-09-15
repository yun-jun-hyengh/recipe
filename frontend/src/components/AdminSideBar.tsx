import React from 'react';

const AdminSideBar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg flex flex-col">
            <div className="p-6 text-xl font-bold text-indigo-600">밥묵자AdminPage</div>
            <nav className="flex-1 px-4 space-y-2">
                <div className="p-2 rounded-lg cursor-pointer bg-indigo-100 text-indigo-600">회원관리</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">배너관리</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">팝업관리</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">상품등록</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">주문관리</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">배송관리</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">결제내역</div>
                <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">상품 카테고리 관리</div>
            </nav>
        </aside>
    )
}

export default AdminSideBar;