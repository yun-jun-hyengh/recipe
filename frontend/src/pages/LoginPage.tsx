import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem-3rem)] px-4 bg-gray-100">
            <div className="w-full max-w-md p-10 bg-white shadow-md">
                <h2 className="mb-8 text-2xl font-bold text-center">로그인</h2>
                
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="아이디"
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
                    />
                </div>

                <button className="w-full py-2 mt-6 text-white bg-gray-800 rounded hover:bg-gray-900">
                    로그인
                </button>

                <div className="mt-4 text-sm text-center text-gray-600">
                    <Link to="/agreeterm" className="hover:underline">
                        회원가입
                    </Link>{" "}
                    |{" "}
                    <Link to="/findidpage" className="hover:underline">
                        아이디 찾기
                    </Link>{" "}
                    |{" "}
                    <Link to="/findpwpage" className="hover:underline">
                        비밀번호 찾기
                    </Link>
                </div>
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;