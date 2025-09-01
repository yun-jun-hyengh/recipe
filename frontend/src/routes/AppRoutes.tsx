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
const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/customer', element: <CustomerPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/agreeterm', element: <AgreeTremPage /> },
        { path: '/signup', element: <SignupPage /> },
        { path: '/noticeList', element: <NoticeListPage /> },
        { path: '/noticeWrite', element: <NoticeWritePage /> },
    ]);
    return routes;
};

export default AppRoutes;