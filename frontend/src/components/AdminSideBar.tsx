import path from 'path';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
    const menus = [
        { name: "회원관리", path: "/admin/userList" },
        { name: "배너관리", path: "/admin/bannerList" },
        { name: "팝업관리", path: "/admin/popupList" },
        { name: "상품목록", path: "/admin/productList" },
        { name: "주문관리", path: "/admin/orderList" },
        { name: "배송관리", path: "/admin/deliveryList" },
        { name: "결제내역", path: "/admin/paymentList" },
        { name: "상품 카테고리 관리", path: "/admin/cateList" },
        { name: "초보가이드등록", path: "/admin/noviceRegister" },
    ];

    return (
        <aside className="w-64 bg-white shadow-lg flex flex-col">
            <div className="p-6 text-xl font-bold text-indigo-600"><Link to="/admin">밥묵자AdminPage</Link></div>
            <nav className="flex-1 px-4 space-y-2">
                {menus.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                        `block p-2 rounded-lg cursor-pointer transition ${
                            isActive
                            ? "bg-indigo-100 text-indigo-600"
                            : "hover:bg-indigo-50"
                        }`
                        }
                    >
                        {menu.name}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}

export default AdminSideBar;