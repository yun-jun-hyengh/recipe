import React from "react";
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";

const BannerRegisterPage = () => {
    return(
        <div className="flex min-h-screen bg-gray-50">
            <AdminSideBar />
            <main className="flex-1 p-6">
                <AdminHeader />
                <h2>배너등록페이지</h2>
            </main>
        </div>
    );
};

export default BannerRegisterPage;