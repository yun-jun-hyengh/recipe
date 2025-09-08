import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { noticeApi } from '../api/noticeApi';
import { NoticeRequest } from '../types/notice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

const NoticeWritePage = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const [notice, setNotice] = useState<NoticeRequest>({
        writer: '',
        title: '',
        content: '',
        file: undefined
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value} = e.target;
        setNotice(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length > 0) {
            setNotice(prev => ({ ...prev, file: e.target.files![0] }));
        }
    };

    const handleFileRemove = () => {
        setNotice(prev => ({ ...prev, file: undefined }));
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('writer', user?.nickname || '');
        formData.append('title', notice.title);
        formData.append('content', notice.content);
        if(notice.file) {
            formData.append('file', notice.file);
        }
        console.log(token);
        noticeApi.noticewrite(formData, token)
            .then(res => {
                if(res.data.status === 'success') {
                    alert(res.data.message);
                    navigate("/noticeList");
                } else {
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.error(err);
                alert('공지사항 등록 실패: ' + err.message);
            });
    }

    const handleNoticeList = () => {
        navigate('/noticeList');
    }
    return (
        <div className="min-h-screen px-4 py-10">
            <div className="p-6 mx-auto max-w-screen-2xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b sm:mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">공지사항 글작성</h2>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 lg:p-8">
                    <div className="grid items-center grid-cols-1 gap-4 py-2 border-b border-gray-200 md:grid-cols-4">
                        <label htmlFor="title" className="font-semibold text-gray-700 md:col-span-1">제목</label>
                        <input
                            type='text'
                            id='title'
                            value={notice.title}
                            onChange={handleChange}
                            className='block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm md:col-span-3'
                        />
                    </div>

                    <div className="grid items-center grid-cols-1 gap-4 py-2 border-b border-gray-200 md:grid-cols-4">
                        <label htmlFor="author" className="font-semibold text-gray-700 md:col-span-1">작성자</label>
                        <input
                            type="text"
                            id="writer"
                            value={user?.nickname}
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
                                    value={notice.content}
                                    onChange={handleChange}
                                    className="w-full h-64 p-2 resize-y focus:outline-none sm:text-sm"
                                    placeholder="내용을 입력하세요..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-4">
                        <label className="pt-2 font-semibold text-gray-700 md:col-span-1">첨부파일</label>
                        <div className="flex flex-col items-start gap-2 md:col-span-3 sm:flex-row sm:items-center">
                            <input 
                                type="file" 
                                id="attach-file" 
                                onChange={handleFileChange} 
                                className="hidden" 
                            />
                            <div className="flex gap-2">
                                {/* 파일 선택 버튼 */}
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('attach-file')?.click()}
                                    className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    파일 선택
                                </button>

                                {/* 파일 삭제 버튼 */}
                                <button
                                    type="button"
                                    onClick={handleFileRemove}
                                    disabled={!notice.file}
                                    className={`px-4 py-2 text-sm rounded-md ${
                                        notice.file 
                                            ? "text-gray-800 bg-gray-200 hover:bg-gray-300" 
                                            : "text-gray-400 bg-gray-100 cursor-not-allowed"
                                    }`}
                                >
                                    선택된 파일 삭제
                                </button>
                                
                            </div>
                            <p className="mt-2 text-xs text-gray-500 sm:mt-0">
                                {notice.file && (
                                    <span className="ml-2 text-sm text-gray-600">
                                        {notice.file.name}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={handleSubmit} className="py-2 font-bold text-white transition duration-300 ease-in-out bg-black rounded-md shadow-md px-14 hover:bg-gray-800">
                        저장
                    </button>
                    <button onClick={handleNoticeList} className="py-2 font-bold text-gray-800 transition duration-300 ease-in-out bg-gray-200 rounded-md shadow-md px-14 hover:bg-gray-300">
                        목록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeWritePage;