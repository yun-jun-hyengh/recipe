import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
   
    return(
        <header className="p-3 bg-white">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <div className="flex items-center justify-between w-full px-4 md:w-2/3 lg:w-1/2">
                <Link to="/" className="text-xl font-bold">식샤를합시다</Link>
                    <button
                        className='md:hidden focus:outline-none'
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label='Toggle menu'
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                                {isOpen ? (
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <div className={`w-full px-4 md:flex md:items-center md:justify-end md:w-1/3 lg:w-1/2 transition-all duration-300 ease-in-out ${
                        isOpen ? 'block' : 'hidden'
                    } md:block`}>
                        <div className="flex flex-col items-center justify-end gap-4 md:flex-row md:gap-6">
                            <div className="relative cursor-pointer">
                            <select className="w-auto min-w-[80px] py-3 pl-4 pr-2 text-sm font-medium transition bg-transparent rounded-lg outline-none appearance-none text-body-color cursor-pointer">
                                <option>English</option>
                                <option>korean</option>
                                <option>japan</option>
                            </select>
                        </div>
                            <Link to="/customer" className="text-sm font-medium cursor-pointer">고객센터</Link>
                            <Link to="/login" className="px-2 py-3 text-sm font-medium cursor-pointer md:px-3">로그인</Link>
                            <Link to="/agreeterm" className="py-3 text-sm font-medium cursor-pointer">회원가입</Link>
                        </div>
                </div>
            </div>
        </header>
    );
};

export default Header;