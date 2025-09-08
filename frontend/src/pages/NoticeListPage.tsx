import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
const NoticeListPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const handleNoticeWriter = () => {
        navigate('/noticeWrite');
    }
    const notices = [
        { id: 5, title: "공지사항 제목이 들어갑니다.", writer: "더클라우드", date: "2022.08.14", views: 11 },
        { id: 4, title: "공지사항 제목이 들어갑니다.", writer: "더클라우드", date: "2022.08.14", views: 8 },
        { id: 3, title: "공지사항 제목이 들어갑니다.", writer: "더클라우드", date: "2022.08.14", views: 6 },
        { id: 2, title: "공지사항 제목이 들어갑니다.", writer: "더클라우드", date: "2022.08.14", views: 13 },
        { id: 1, title: "공지사항 제목이 들어갑니다.", writer: "더클라우드", date: "2022.08.14", views: 20 },
    ];
    return (
        <div className="min-h-screen px-4 py-10">
            <div className="p-6 mx-auto max-w-screen-2xl" style={{lineHeight: 2.25}}>
                <div className="flex items-center justify-between pb-2 mb-2 border-b sm:mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">공지사항</h2>
                    {user && user.adminchk === 1 && (
                        <button onClick={handleNoticeWriter} className="bg-black text-white px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded hover:opacity-90">
                            등록
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-end">
                    <select
                        className="w-full px-3 py-2 text-sm border rounded sm:w-48 focus:outline-none focus:ring-2 focus:ring-black"
                        defaultValue="title"
                    >
                        <option value="title">제목</option>
                        <option value="writer">작성자</option>
                        <option value="both">제목 + 작성자</option>
                    </select>
                    <input
                        type="text"
                        placeholder="제목으로 검색"
                        className="w-full px-3 py-2 text-sm border rounded sm:w-64 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-700 hover:opacity-90">
                        검색
                    </button>
                </div>
                
                <div className='overflow-x-auto'>
                    <table className="w-full text-sm text-center border-t border-b sm:text-base">
                        <thead className="bg-gray-50">
                            <tr className="border-b">
                                <th className="px-2 py-2 sm:px-3 whitespace-nowrap">번호</th>
                                <th className="px-2 py-2 text-left sm:px-3 whitespace-nowrap">제목</th>
                                <th className="hidden px-2 py-2 sm:px-3 whitespace-nowrap md:table-cell">작성자</th>
                                <th className="hidden px-2 py-2 sm:px-3 whitespace-nowrap sm:table-cell">작성일</th>
                                <th className="hidden px-2 py-2 sm:px-3 whitespace-nowrap md:table-cell">조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map((notice) => (
                                <tr key={notice.id} className="border-b hover:bg-gray-50">
                                <td className="px-2 py-2 sm:px-3">{notice.id}</td>
                                <td className="px-2 py-2 text-left sm:px-3">{notice.title}</td>
                                <td className="hidden px-2 py-2 sm:px-3 md:table-cell">{notice.writer}</td>
                                <td className="hidden px-2 py-2 sm:px-3 sm:table-cell">{notice.date}</td>
                                <td className="hidden px-2 py-2 sm:px-3 md:table-cell">{notice.views}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-center gap-1 mt-6">
                    <button className="px-2 py-1 text-xs border sm:text-sm">&lt;&lt;</button>
                        {[1, 2, 3, 4, 5].map((page) => (
                            <button
                            key={page}
                            className={`px-3 py-1 text-xs sm:text-sm border ${page === 1 ? "bg-black text-white" : ""}`}
                            >
                            {page}
                            </button>
                        ))}
                        <button className="px-2 py-1 text-xs border sm:text-sm">&gt;&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default NoticeListPage;