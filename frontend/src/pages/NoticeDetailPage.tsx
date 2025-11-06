import React, { useEffect, useRef, useState } from "react";
import * as FiIcons from "react-icons/fi";
import type { IconType } from "react-icons";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { CommentSaveDTO, NoticeDetail } from "../types/notice";
import { noticeApi } from "../api/noticeApi";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { PrevNextResponse, ApiWrapper } from "../types/notice";
import { CommentList } from "../types/notice";

const NoticeDetailPage = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const notice = location.state;
    const params = useParams<{ idx: string }>();
    const idx  = Number(params.idx);
    const navigate = useNavigate();
    const location = useLocation();
    const prevPage = location.state?.page || 1;
    const MessageIcon = FiIcons.FiMessageCircle as React.ComponentType<{ size?: number }>;
    const EyeIcon = FiIcons.FiEye as React.ComponentType<{ size?: number }>;
    const EditIcon = FiIcons.FiEdit2 as React.ComponentType<{ size?: number }>;
    const TrashIcon = FiIcons.FiTrash2 as React.ComponentType<{ size?: number }>;
    const MoreIcon = FiIcons.FiMoreVertical as React.ComponentType<{ size?: number }>;

    const user = useSelector((state: RootState) => state.auth.user);
    const [notice, setNotice] = useState<NoticeDetail | null>(null);
    const [prevNext, setPrevNext] = useState<PrevNextResponse | null>(null);
    const hasFetched = useRef(false);
    const [re_content, setReContent] = useState("");

    const [comments, setComments] = useState<CommentList[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalElements, setTotalElements] = useState("");
    const size = 5;
    useEffect(() => {
        if (!idx || hasFetched.current) return;
        if (idx) {
            noticeApi.noticedetail(Number(idx))
                .then((res) => {
                    if (res.data.status === "success") {
                        setNotice(res.data.data);
                        // console.log(res.data.data);
                    } else {
                        alert("데이터를 불러올 수 없습니다.");
                        navigate("/noticeList", { state: { page: prevPage }});
                    }
                })
                .catch((err) => {
                    console.error("상세 조회 실패:", err);
                });
            
            noticeApi.prevNext(Number(idx))
                .then((res) => {
                    const wrapper = res.data as ApiWrapper<PrevNextResponse>;
                    if(wrapper.status === "success") {
                        setPrevNext(wrapper.data);
                    } else {
                        setPrevNext(null);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            loadComments(1);
            setPage(1);
        }
    }, [idx]);

    const loadComments = (newPage: number) => {
        if (totalPages && newPage > totalPages) {
            return;
        }
        //setLoading(true);
        console.log("idx : ", newPage + "호출됨");
        noticeApi.fetchComments(idx, newPage, size)
            .then((res) => {
                const data = res.data[0];
                console.log("data : ", data);
                if (data.status === "success") {
                    setComments((prev) => [...prev, ...data.data]);
                    setTotalPages(data.totalPages);
                    setPage(newPage);
                    setTotalElements(data.totalElements);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

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

    const handleUpdate = () => {
        if(!notice) {
            return;
        }
        navigate(`/noticeupdate/${notice.idx}`, { state: { notice }});
    }

    const handleCommentSubmit = () => {
        if (!re_content.trim()) {
            alert("댓글 내용을 입력해 주세요");
            return;
        }

        if(!user) {
            alert("로그인 후 댓글을 작성할 수 있습니다.");
            navigate("/login");
            return;
        }

        const data: CommentSaveDTO = {
            idx: idx,
            user_idx: user?.user_idx ?? 0,
            re_writer: user?.nickname ?? "",
            re_content: re_content,
        };

        noticeApi.insertComment(data)
            .then((res) => {
                if(res.data.status === "success") {
                    alert(res.data.message);
                    setReContent("");
                    loadComments(1);
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
                    <h2 className="text-xl font-bold sm:text-2xl">공지사항</h2>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-2xl font-extrabold sm:text-3xl mt-4">{notice?.title}</h1>
                    <div className="flex items-center gap-3 text-gray-600">
                        {user && user.adminchk === 1 && (
                            <div className="flex items-center gap-3 text-gray-600">
                                <button
                                    type="button"
                                    className="p-2 hover:text-blue-600 transition"
                                    aria-label="수정"
                                    onClick={handleUpdate}
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
                            </div>
                        )}
                        
                        <button
                            type="button"
                            className="p-2 hover:text-gray-800 transition"
                            onClick={() => navigate('/noticeList', { state: { page: prevPage }})}
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
                        <EyeIcon size={16} />{notice?.viewcount ? notice?.viewcount : 0}회
                        <span>{notice?.regdate}</span>
                    </div>
                </div>

                <div className="mt-6 text-gray-800 leading-relaxed break-words whitespace-pre-line">
                   { /* 공지사항 내용 들어갈 부분 */}
                   {notice?.content}

                   {notice?.filepath && (
                    <div className="mt-4 flex justify-center">
                        <img 
                            src={noticeApi.getNoticeImage(`${notice.filepath}`)}
                            className="max-w-full h-auto rounded shadow-md border border-gray-200" 
                        />
                    </div>
                   )}
                </div>

                <div className="mt-10 border-t pt-4 text-gray-600 text-sm space-y-2">
                    {prevNext?.prev ? (
                        <div className="flex items-center justify-between hover:bg-gray-50 transition p-2 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">▲</span>
                                <span>이전글 : </span>
                                <span 
                                    className="text-gray-700 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/noticedetail/${prevNext.prev!.idx}`, { state: { page: prevPage } })}
                                >
                                    {prevNext.prev.title}    
                                </span>
                            </div>
                            <span className="text-gray-400">{prevNext.prev.regdate}</span>
                        </div>
                    ) : (
                        <div className="text-gray-400">이전글 없음</div>
                    )}

                    {prevNext?.next ? (
                        <div className="flex items-center justify-between hover:bg-gray-50 transition p-2 rounded-lg">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">▼</span>
                                <span>다음글 : </span>
                                <span 
                                    className="text-gray-700 hover:underline cursor-pointer"
                                    onClick={() => navigate(`/noticedetail/${prevNext.next!.idx}`, { state: { page: prevPage } })}
                                >
                                    {prevNext.next.title}
                                </span>
                            </div>
                            <span className="text-gray-400">{prevNext.next.regdate}</span>
                        </div>
                    ) : (
                        <div className="text-gray-400">다음글 없음</div>
                    )}
                </div>

                <div className="mt-10">
                    <div className="flex items-center border-b pb-2 mb-4">
                        <h3 className="font-bold text-lg text-gray-800">댓글 <span className="text-blue-600">{totalElements}</span></h3>
                    </div>
                    {comments.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">등록된 댓글이 없습니다.</p>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div
                                    key={comment.re_idx}
                                    className="border-b pb-3 text-gray-700"
                                >
                                    <div className="font-semibold text-gray-800">
                                        {comment.re_writer}
                                    </div>
                                    <div className="mt-1 whitespace-pre-line">
                                        {comment.re_content}
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">
                                        {comment.re_regdate}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {page < totalPages && (
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => {
                                    loadComments(page + 1)
                                    console.log(page + 1);
                                    //setPage(page + 1)
                                }}
                            >
                                댓글 더보기
                            </button>
                        </div>
                    )}
                    
                    <div className="relative border rounded-lg p-4 mt-2 flex flex-col gap-2 items-stretch">
                        <div className="relative flex-1">
                            <textarea
                                id="re_content"
                                className="w-full h-28 border border-gray-300 rounded-lg px-3 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={(e) => setReContent(e.target.value)}
                                value={re_content}
                            />
                            <label
                                htmlFor="comment"
                                className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none"
                            >
                                댓글내용을 입력해주세요
                            </label>
                        </div>
                        <button 
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
                            onClick={handleCommentSubmit}
                        >
                            등록
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoticeDetailPage;