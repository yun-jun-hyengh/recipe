import React, { useEffect, useState } from "react";
import * as FiIcons from "react-icons/fi";
import type { IconType } from "react-icons";
import { useParams, useNavigate } from "react-router-dom";
import { NoticeDetail } from "../types/notice";
import { noticeApi } from "../api/noticeApi";
const NoticeDetailPage = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const notice = location.state;
    const params = useParams<{ idx: string }>();
    const idx  = Number(params.idx);
    const navigate = useNavigate();

    const MessageIcon = FiIcons.FiMessageCircle as React.ComponentType<{ size?: number }>;
    const EyeIcon = FiIcons.FiEye as React.ComponentType<{ size?: number }>;
    const EditIcon = FiIcons.FiEdit2 as React.ComponentType<{ size?: number }>;
    const TrashIcon = FiIcons.FiTrash2 as React.ComponentType<{ size?: number }>;
    const MoreIcon = FiIcons.FiMoreVertical as React.ComponentType<{ size?: number }>;

    const [notice, setNotice] = useState<NoticeDetail | null>(null);

    useEffect(() => {
        if (idx) {
            noticeApi.noticedetail(Number(idx))
                .then((res) => {
                    if (res.data.status === "success") {
                        setNotice(res.data.data);
                        // console.log(res.data.data);
                    } else {
                        alert("데이터를 불러올 수 없습니다.");
                        navigate("/noticeList");
                    }
                })
                .catch((err) => {
                    console.error("상세 조회 실패:", err);
                });
        }
    }, [idx, navigate]);

    const handleDelete = () => {
        const ok = window.confirm("정말 삭제하시겠습니까?");
        if(!ok) {
            return;
        }
        noticeApi.deleteNotice(Number(idx))
            .then((res) => {
                if(res.data.status === "success") {
                    alert(res.data.message);
                    navigate('/noticeList');
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="min-h-screen px-4 py-10">
            <div className="p-6 mx-auto max-w-screen-2xl">
                <div className="flex items-center justify-between pb-2 mb-2 border-b sm:mb-4">
                    <h2 className="text-xl font-bold sm:text-2xl">공지사항</h2>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-2xl font-extrabold sm:text-3xl mt-4">{notice?.title}</h1>
                    <div className="flex items-center gap-3 text-gray-600">
                        <button
                            type="button"
                            className="p-2 hover:text-blue-600 transition"
                            aria-label="수정"
                            >
                            <EditIcon size={20} />
                        </button>
                        <button
                            type="button"
                            className="p-2 hover:text-red-600 transition"
                            onClick={handleDelete}
                            aria-label="삭제"
                            >
                            <TrashIcon size={20} />
                        </button>
                        <button
                            type="button"
                            className="p-2 hover:text-gray-800 transition"
                            onClick={() => navigate('/noticeList')}
                            aria-label="목록"
                            >
                            <MoreIcon size={20} />
                        </button>
                    </div>
                </div>



                <div className="flex items-center gap-3 mt-4 text-gray-600 text-sm flex-wrap">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        </div>
                        <span className="font-medium text-gray-700">{notice?.writer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MessageIcon size={16} />
                        <EyeIcon size={16} />3회
                        <span>{notice?.regdate}</span>
                    </div>
                </div>

                <div className="mt-6 text-gray-800 leading-relaxed break-words whitespace-pre-line">
                   { /* 공지사항 내용 들어갈 부분 */}
                   {notice?.content}
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