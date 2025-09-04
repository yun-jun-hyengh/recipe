import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { SignupRequest } from '../types/auth';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<SignupRequest>({
        user_id: "",
        user_pw: "",
        user_name: "",
        nickname: "",
        user_email: "",
        user_phone: "",
    });
    
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isIdChecked, setIsIdChecked] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if(e.target.name === "user_id") {
            setIsIdChecked(false);
        }
    };

    const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(e.target.value);
    }

    const handleIdCheck = () => {
        if(!form.user_id) {
            alert("아이디를 입력해주세요");
            return;
        }

        authApi
            .findId({ user_id: form.user_id })
            .then((res) => {
                //console.log(res.data);
                const exists = res.data.data.exists;
                if(!exists) {
                    alert(res.data.message);
                    setIsIdChecked(true);
                } else {
                    alert(res.data.message);
                    setIsIdChecked(false);
                }
            });
    };

    const handleSubmit = () => {
        if(!form.user_id) {
            alert("아이디를 입력해 주세요.");
            return;
        }
        if(!form.user_pw) {
            alert("비밀번호를 입력해 주세요.");
            return;
        }
        if(form.user_pw !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if(!form.user_name) {
            alert("이름을 입력해 주세요.");
            return;
        }
        if(!form.nickname) {
            alert("사용하실 닉네임을 입력해 주세요.");
            return;
        }
        if(!form.user_email) {
            alert("이메일을 등록해 주세요");
            return;
        }
        if(!form.user_phone) {
            alert("전화번호를 입력해 주세요.");
            return;
        }
        if(!isIdChecked) {
            alert("아이디 중복확인을 해주세요");
            return;
        }

        authApi
            .signup(form)
            .then((res) => {
                if(res.data.status === "success") {
                    alert(res.data.message);
                    navigate("/");
                } else if(res.data.status === "fail") {
                    alert(res.data.message);
                } else if(res.data.status === "error") {
                    alert(res.data.message);
                }
            })
            .catch((err: any) => {
                alert("서버 에러: " + err.response?.data?.message || "알 수 없는 오류");
            });
    };

    const handleCancel = () => {
        navigate("/");
    };

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
                                name='user_id'
                                className="min-w-[300px] sm:w-[350px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="아이디를 입력하세요"
                                onChange={handleChange}
                                value={form.user_id}
                            />
                            <button
                                type="button"
                                onClick={handleIdCheck}
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
                            name="user_pw"
                            className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="비밀번호를 입력하세요"
                            value={form.user_pw}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700 shrink-0">비밀번호 확인</label>
                        <input
                            type="password"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="입력하신 비밀번호를 확인해 주세요"
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">이름</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                name='user_name'
                                value={form.user_name}
                                onChange={handleChange}
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
                                name='nickname'
                                value={form.nickname}
                                onChange={handleChange}
                                className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="닉네임을 입력해 주세요"
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className="text-sm font-medium text-gray-700 w-18 shrink-0">이메일</label>
                        <div className="flex flex-wrap items-center gap-2">
                            <input
                                type="text"
                                name='user_email'
                                value={form.user_email}
                                onChange={handleChange}
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
                                name='user_phone'
                                value={form.user_phone}
                                onChange={handleChange}
                                className="min-w-[400px] sm:w-[450px] px-7 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="휴대폰 번호를 입력해 주세요 (-) 제외"
                            />
                        </div>
                    </div>
                </form>
                <div className="flex gap-3 mt-6 max-w-[600px] mx-auto justify-center">
                        <button onClick={handleCancel} className="flex-1 px-6 py-2 text-gray-700 border rounded hover:bg-gray-100">
                            가입취소
                        </button>
                        <button onClick={handleSubmit} className="flex-1 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            가입완료
                        </button>
                </div>
                <br></br>
            </div>
        </div>
    );
};

export default SignupPage;