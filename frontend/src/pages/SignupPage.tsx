import React from 'react';

const SignupPage = () => {
    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            <div className="p-6 mx-auto bg-white rounded shadow-md max-w-screen-2xl" style={{lineHeight: 2.25}}>
                <div className="p-3 mb-4 text-3xl font-semibold text-center rounded">회원가입</div>

                <form className='max-w-lg mx-auto space-y-4'>
                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">아이디</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                className="min-w-[300px] sm:w-[350px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="아이디를 입력하세요"
                            />
                            <button
                                type="button"
                                className="px-4 py-3 text-sm text-white bg-blue-900 rounded hover:bg-blue-700 shrink-0"
                            >
                                중복확인
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 shrink-0">비밀번호</label>
                        <input
                            type="password"
                            className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="비밀번호를 입력하세요"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 shrink-0">비밀번호 확인</label>
                        <input
                            type="password"
                            className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="입력하신 비밀번호를 확인해 주세요"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">이름</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="이름을 입력해 주세요"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">닉네임</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="닉네임을 입력해 주세요"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">이메일</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="email"
                                className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="이메일을 입력해 주세요"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">휴대폰 번호</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="휴대폰 번호를 입력해 주세요 (-) 제외"
                            />
                        </div>
                    </div>
                </form>
                <div className="flex gap-3 mt-6 max-w-[600px] mx-auto justify-center">
                        <button className="flex-1 px-6 py-2 text-gray-700 border rounded hover:bg-gray-100">
                            가입취소
                        </button>
                        <button className="flex-1 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            가입완료
                        </button>
                </div>
                <br></br>
            </div>
        </div>
    );
};

export default SignupPage;