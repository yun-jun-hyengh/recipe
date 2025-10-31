import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NoticeUpdatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const notice = location.state?.notice;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [filename, setFileName] = useState("");

    useEffect(() => {
        if(notice) {
            setTitle(notice.title);
            setContent(notice.content);
            setWriter(notice.writer);
            setFileName(notice.filename);
        }
    }, [notice]);
    
    return (
        <div className="min-h-screen px-4 py-10">
            <div className="p-6 mx-auto max-w-screen-2xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b sm:mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">공지사항 글수정</h2>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 lg:p-8">
                    <div className="grid items-center grid-cols-1 gap-4 py-2 border-b border-gray-200 md:grid-cols-4">
                        <label htmlFor="title" className="font-semibold text-gray-700 md:col-span-1">제목</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm md:col-span-3'
                        />
                    </div>

                    <div className="grid items-center grid-cols-1 gap-4 py-2 border-b border-gray-200 md:grid-cols-4">
                        <label htmlFor="author" className="font-semibold text-gray-700 md:col-span-1">작성자</label>
                        <input
                            type="text"
                            id="writer"
                            value={writer}
                            className="block w-full p-2 mt-1 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm md:col-span-3"
                            readOnly // 작성자는 기본값으로 두고 수정 불가하게 설정
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 py-2 border-b border-gray-200 md:grid-cols-4">
                        <label htmlFor="content" className="pt-2 font-semibold text-gray-700 md:col-span-1">내용</label>
                        <div className="md:col-span-3">
                            <div className="overflow-hidden border border-gray-300 rounded-md">
                                <div className="flex flex-wrap gap-1 p-2 text-sm bg-gray-100">
                                    <button className="px-2 py-1 rounded hover:bg-gray-200">HTML 소스</button>
                                    <button className="px-2 py-1 rounded hover:bg-gray-200">글꼴</button>
                                    <button className="px-2 py-1 rounded hover:bg-gray-200">크기</button>
                                    <button className="px-2 py-1 rounded hover:bg-gray-200">B</button>
                                    <button className="px-2 py-1 rounded hover:bg-gray-200">I</button>
                                    <button className="px-2 py-1 rounded hover:bg-gray-200">U</button>
                                </div>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full h-64 p-2 resize-y focus:outline-none sm:text-sm"
                                    placeholder="내용을 입력하세요..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoticeUpdatePage;