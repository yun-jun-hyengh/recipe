import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { noticeApi } from '../api/noticeApi';
import { NoticeListResponse } from '../types/notice';
import { NoticeItem } from '../types/notice';
import { AxiosResponse } from "axios";

const NoticeListPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state: RootState) => state.auth.user);
    const handleNoticeWriter = () => {
        navigate('/noticeWrite');
    }
    
    const [noticeList, setNoticeList] = useState<NoticeItem[]>([]);
    const [searchType, setSearchType] = useState("title");
    const [keyword, setKeyword] = useState("");
    //const [page, setPage] = useState(1);
    const [page, setPage] = useState<number>(location.state?.page || 1);
    const [totalPages, setTotalPages] = useState(1);

    const pageGroupStart = Math.floor((page - 1) / 10) * 10 + 1;
    const pageGroupEnd = Math.min(pageGroupStart + 9, totalPages);

    const fetchNotices = () => {
        noticeApi.getList({ searchType, keyword, page })
            .then((res: AxiosResponse<any>) => {
                const raw = res.data;
                // console.log(JSON.stringify(result.status));
                const arr: NoticeListResponse[] = Array.isArray(raw) ? raw : [raw];
                const result = arr[0];
                // console.log(result.status);
                if(result.status === "success") {
                    setNoticeList(result.data ?? []);
                    setTotalPages(result.totalPages ?? 1);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchNotices();
    },[searchType, keyword, page]);

    // const goDetail = (notice: NoticeItem) => {
    //     // navigate(`/noticedetail/${state: notice}`);
    //     navigate("/noticedetail", { state: notice });
    // }

    const handleSearch = () => {
        setPage(1);
        fetchNotices();
        // noticeApi.getList({ searchType, keyword, page: 1 })
        //     .then((res) => {
        //         const result = res.data;
        //         if(result.status === "success") {
        //             // setNoticeList(result.data);
        //             // setTotalPages(result.totalPages);
        //         }
        //     })
        //     .catch((err) => console.error(err));
    }

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
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="title">제목</option>
                        <option value="writer">작성자</option>
                        <option value="both">제목 + 작성자</option>
                    </select>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        className="w-full px-3 py-2 text-sm border rounded sm:w-64 focus:outline-none focus:ring-2 focus:ring-black"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button 
                        className="px-4 py-2 text-sm text-white bg-gray-500 rounded hover:bg-gray-700 hover:opacity-90"
                        onClick={handleSearch}
                    >
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
                                <th className="hidden px-2 py-2 sm:px-3 whitespace-nowrap md:table-cell">조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticeList.map((notice, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="px-2 py-2 sm:px-3">{notice.idx}</td>
                                <td 
                                    className="px-2 py-2 text-left sm:px-3 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/noticedetail/${notice.idx}`, { state: { page } })}
                                >
                                    {notice.title}
                                </td>
                                    <td className="hidden px-2 py-2 sm:px-3 md:table-cell">{notice.writer}</td>
                                    <td className="hidden px-2 py-2 sm:px-3 sm:table-cell">{notice.regdate}</td>
                                    <td className="hidden px-2 py-2 sm:px-3 md:table-cell">{notice.viewcount ? notice.viewcount : 0}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-center gap-1 mt-6">
                    {pageGroupStart > 1 && (
                        <button 
                            className="px-2 py-1 text-xs border sm:text-sm"
                            onClick={() => setPage(pageGroupStart - 1)}
                        >
                            &lt;&lt;
                        </button>
                    )}
                    {Array.from({ length: 10}, (_, i) => pageGroupStart + i)
                        .filter((p) => p <= totalPages)
                        .map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`px-3 py-1 text-xs sm:text-sm border 
                                    ${page === p ? "bg-black text-white" : ""}`}
                            >
                                {p}
                            </button>
                        ))
                    }
                    {pageGroupEnd < totalPages && (
                        <button 
                            className="px-2 py-1 text-xs border sm:text-sm"
                            onClick={() => setPage(pageGroupEnd + 1)}
                        >
                            &gt;&gt;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticeListPage;