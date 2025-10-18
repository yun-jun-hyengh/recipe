import { useRoutes } from "react-router-dom";
import CustomerPage from "../pages/CustomerPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
//import Home from "../pages/Home";
// import App from "../App";
import AgreeTremPage from "../pages/AgreeTermPage";
import NoticeListPage from "../pages/NoticeListPage";
import NoticeWritePage from "../pages/NoticeWritePage";
import FindIdPage from "../pages/FindIdPage";
import AdminMainPage from "../pages/AdminMainPage";
import UserListPage from "../pages/UserListPage";
import BannerListPage from "../pages/BannerListPage";
import BannerRegisterPage from "../pages/BannerRegisterPage";
import PopupListPage from "../pages/PopupListPage";
import BannerUpdatePage from "../pages/BannerUpdatePage";
import NoticeDetailPage from "../pages/NoticeDetailPage";
const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/admin', element: <AdminMainPage /> },
        { path: '/admin/userList', element: <UserListPage /> },
        { path: '/admin/bannerList', element: <BannerListPage /> },
        { path: '/admin/bannerjoin', element: <BannerRegisterPage /> },
        { path: '/admin/bannerupdate', element: <BannerUpdatePage /> },
        { path: '/admin/popupList', element: <PopupListPage /> },
        { path: '/customer', element: <CustomerPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/agreeterm', element: <AgreeTremPage /> },
        { path: '/signup', element: <SignupPage /> },
        { path: '/noticeList', element: <NoticeListPage /> },
        { path: '/noticeWrite', element: <NoticeWritePage /> },
        { path: '/noticedetail', element: <NoticeDetailPage /> },
        { path: '/findidpage', element: <FindIdPage /> },
    ]);
    return routes;
};

export default AppRoutes;