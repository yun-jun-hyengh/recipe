import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { noticeApi } from "../api/noticeApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

const NoticeUpdatePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const notice = location.state?.notice;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");
    const [filename, setFileName] = useState("");
    const [filepath, setFilePath] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    //const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        if(notice) {
            setTitle(notice.title);
            setContent(notice.content);
            setWriter(notice.writer);
            setFileName(notice.filename);
            setFilePath(notice.filepath);
        }
    }, [notice]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setFilePath(URL.createObjectURL(selectedFile));
        }
    }

    const handleUpdateSubmit = () => {
        const formData = new FormData();
        formData.append("idx", notice.idx);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("wriiter", writer);
        if (file) {
            formData.append("file", file);
        } else {
            formData.append("filename", filename);
            formData.append("filepath", filepath);
        }

        noticeApi.updateNotice(formData, token)
            .then((res) => {
                if(res.data.status === "success") {
                    alert(res.data.message);
                    navigate(-1);
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                console.log(err);
            })
    }
    
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

                    <div className="grid grid-cols-1 gap-4 py-2 md:grid-cols-4">
                        <label className="pt-2 font-semibold text-gray-700 md:col-span-1">첨부파일</label>
                        <div className="flex flex-col items-start gap-2 md:col-span-3 sm:flex-row sm:items-center">
                            <input 
                                type="file" 
                                id="attach-file" 
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('attach-file')?.click()}
                                    className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                                >
                                    파일 선택
                                </button>
                            </div>
                            {filename && (
                                <p className="mt-2 text-xs text-gray-500 sm:mt-0">
                                    <span 
                                        className="ml-2 text-sm text-gray-600"
                                        onClick={() => setPreviewOpen(true)}
                                    >
                                        {filename}
                                    </span>
                                </p>
                            )}
                            
                        </div>

                        {previewOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-xl">
                                    <button
                                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                        onClick={() => setPreviewOpen(false)}
                                    >
                                        ✕
                                    </button>
                                    <img
                                        src={
                                            filepath.startsWith("blob:") ? filepath : 
                                            noticeApi.getNoticeImage(`${filepath}`)
                                        }
                                        className="max-h-[70vh] rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                    <button 
                        className="py-2 font-bold text-white transition duration-300 ease-in-out bg-black rounded-md shadow-md px-14 hover:bg-gray-800"
                        onClick={handleUpdateSubmit}
                    >
                        수정
                    </button>
                    <button 
                        onClick={() => navigate(-1)}
                        className="py-2 font-bold text-gray-800 transition duration-300 ease-in-out bg-gray-200 rounded-md shadow-md px-14 hover:bg-gray-300"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoticeUpdatePage;