import React from "react";

const MyPage = () => {
    return (
        <div className="min-h-screen px-4 py-10">
            <div className="mx-auto max-w-screen-2xl" style={{lineHeight: 2.25}}>
                <div className="flex items-center justify-center pb-2 mb-2 border-b sm:mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">마이페이지</h2>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6 mb-6 text-sm sm:text-base font-medium text-gray-700">
                    <button className="px-3 py-1 border-b-2 border-transparent hover:border-green-600 hover:text-green-600 transition">
                        관심 레시피
                    </button>
                    <button className="px-3 py-1 border-b-2 border-transparent hover:border-green-600 hover:text-green-600 transition">
                        장바구니
                    </button>
                    <button className="px-3 py-1 border-b-2 border-transparent hover:border-green-600 hover:text-green-600 transition">
                        주문목록
                    </button>
                    <button className="px-3 py-1 border-b-2 border-transparent hover:border-green-600 hover:text-green-600 transition">
                        배송조회
                    </button>
                    <button className="px-3 py-1 border-b-2 border-transparent hover:border-green-600 hover:text-green-600 transition">
                        내가 쓴 레시피
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-xl font-bold text-gray-600">
                            
                        </div>

                        <div>
                            <p className="font-semibold text-gray-800">홍길동</p>
                            <p className="text-sm text-gray-500">test@codemstory.com</p>
                        </div>
                        <div className="flex gap-2 mt-4 sm:mt-0">
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">내 정보 수정</button>
                            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100">회원탈퇴</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6 text-center">
                        <div>
                            <p className="text-sm text-gray-500">관심 레시피</p>
                            <p className="text-lg font-semibold">10 개</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">장바구니</p>
                            <p className="text-lg font-semibold">3 개</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">소장레시피</p>
                            <p className="text-lg font-semibold">3 / 10</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">회원등급</p>
                            <p className="text-lg font-semibold">VIP</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-5 gap-2 mt-8 text-center">
                    <div className="py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
                        <p className="text-xs sm:text-sm">입금대기중</p>
                        <p className="text-base font-semibold">10</p>
                    </div>

                    <div className="py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
                        <p className="text-xs sm:text-sm">결제완료</p>
                        <p className="text-base font-semibold">5</p>
                    </div>

                    <div className="py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
                        <p className="text-xs sm:text-sm">배송준비중</p>
                        <p className="text-base font-semibold">7</p>
                    </div>

                    <div className="py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
                        <p className="text-xs sm:text-sm">배송중</p>
                        <p className="text-base font-semibold">0</p>
                    </div>

                    <div className="py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
                        <p className="text-xs sm:text-sm">배송완료</p>
                        <p className="text-base font-semibold">1</p>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="mb-2 text-lg font-bold">상품구매목록</h3>
                    <table className="w-full border-collapse border border-gray-200 text-sm text-center">
                        <thead className="bg-green-700 text-white">
                            <tr>
                                <th className="py-2 px-3 border border-gray-200">주문정보</th>
                                <th className="py-2 px-3 border border-gray-200">상품정보</th>
                                <th className="py-2 px-3 border border-gray-200">상품구매금액</th>
                                <th className="py-2 px-3 border border-gray-200">조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-3">
                                    <p>[1113371]</p>
                                    <p className="text-gray-500 text-xs">2023.02.10</p>
                                </td>
                                <td className="flex items-center justify-center gap-2 py-3">
                                    <img src="/images/shoes.png" alt="상품" className="w-10 h-10 rounded" />
                                    <span>[조잉링] 마로 기버요 스니커즈 - 진베</span>
                                </td>
                                <td className="py-3 text-green-600 font-semibold">2,000원</td>
                                <td className="py-3">
                                    <button className="px-3 py-1 border rounded hover:bg-gray-100">조회</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-3">
                                    <p>[1113352]</p>
                                    <p className="text-gray-500 text-xs">2023.01.16</p>
                                </td>
                                <td className="flex items-center justify-center gap-2 py-3">
                                    <img src="/images/hat.png" alt="상품" className="w-10 h-10 rounded" />
                                    <span>빈 메도라 - 베이지</span>
                                </td>
                                <td className="py-3 text-green-600 font-semibold">8,000원</td>
                                <td className="py-3">
                                    <button className="px-3 py-1 border rounded hover:bg-gray-100">조회</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MyPage;