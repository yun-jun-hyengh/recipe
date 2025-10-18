import React from "react";

const NoticeDetailPage = () => {
    return (
        <div className="min-h-screen px-4 py-10">
            <div className="p-6 mx-auto max-w-screen-2xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b sm:mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">공지사항</h2>
                </div>

                <h1 className="text-2xl font-extrabold sm:text-3xl mt-4">gfthgth</h1>

                <div className="flex items-center gap-3 mt-4 text-gray-600 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xl">👤</span>
                        </div>
                        <span className="font-medium text-gray-700">최고관리자</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>💬 0건</span>
                        <span>👁️ 3회</span>
                        <span>25-06-22 17:14</span>
                    </div>
                </div>

                <div className="mt-6 text-gray-800 leading-relaxed break-words">
                    gfhfghdhgdf
                </div>

                <div className="mt-10 border-t pt-4 text-gray-600 text-sm">
                    <div className="flex items-center justify-between hover:bg-gray-50 transition p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">▼</span>
                            <span>다음글</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 hover:underline cursor-pointer">tregtrg</span>
                            <span className="text-gray-400">25.06.22</span>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="flex items-center border-b pb-2 mb-4">
                        <h3 className="font-bold text-lg text-gray-800">댓글 <span className="text-blue-600">0</span></h3>
                    </div>
                    <p className="text-center text-gray-500 py-10">등록된 댓글이 없습니다.</p>

                    <div className="border rounded-lg p-4 mt-2 flex flex-col sm:flex-row gap-2">
                        <input
                        type="text"
                        placeholder="댓글내용을 입력해주세요"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetailPage;