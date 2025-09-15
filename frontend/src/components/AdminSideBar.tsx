import React from 'react';

const AdminSideBar = () => {
    return (
        <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-xl font-bold text-indigo-600">Metis</div>
        <nav className="flex-1 px-4 space-y-2">
            <div className="p-2 rounded-lg cursor-pointer bg-indigo-100 text-indigo-600">Dashboard</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Analytics</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Users</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Products</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Orders</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Forms</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Elements</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Reports</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Messages</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Calendar</div>
            <div className="p-2 rounded-lg cursor-pointer hover:bg-indigo-50 transition">Files</div>
        </nav>
    </aside>
    )
}

export default AdminSideBar;