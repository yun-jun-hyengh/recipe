import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HeaderBottom = () => {
    const FiPhoneCall = FiIcons.FiPhoneCall as unknown as React.FC;
    const FiUser = FiIcons.FiUser as unknown as React.FC;
    const FiHeart = FiIcons.FiHeart as unknown as React.FC;
    const FiShoppingCart = FiIcons.FiShoppingCart as unknown as React.FC;
    return (
        <div className="p-4 text-lg border-t border-gray-200">
            <div className="container mx-auto">
                <div className="relative flex items-center justify-between">

                    {/* 중앙 네비게이션 메뉴 hidden ml-4 space-x-7 lg:flex */}
                    <nav className="flex ml-4 space-x-2 text-sm sm:space-x-4 md:space-x-7 sm:text-base">
                        <a href="#" className="hover:text-blue-600 whitespace-nowrap">공개 레시피</a>
                        <a href="#" className="hover:text-blue-600 whitespace-nowrap">비공개 레시피</a>
                        <a href="#" className="hover:text-blue-600 whitespace-nowrap">요리초보가이드</a>
                        <Link to="/noticeList" className="hover:text-blue-600 whitespace-nowrap">공지사항</Link>
                    </nav>

            
                    <div className="flex items-center mr-4 space-x-4">
                        <div className="flex items-center space-x-2">
                        
                            <div className="relative p-2 bg-gray-100 rounded-full">
                                <FiUser />
                            </div>

                            <div className="relative p-2 bg-gray-100 rounded-full">
                                <FiHeart />
                                {/* <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-blue-600 rounded-full -top-1 -right-1"></span> */}
                            </div>

                            <div className="relative p-2 bg-gray-100 rounded-full">
                                <FiShoppingCart />
                                {/* <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-blue-600 rounded-full -top-1 -right-1"></span> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default HeaderBottom;