import React, { useState } from 'react';
import { authApi } from '../api/authApi';
import { FindIdRequest } from '../types/auth';

const FindIdPage = () => {
    const [form, setForm] = useState<FindIdRequest>({
        user_name: "",
        user_email: "",
    });

    const [resultMessage, setResultMessage] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResultMessage('');
    };
    const handleFindId = () => {
        if(!form.user_name || !form.user_email) {
            alert("이름과 이메일을 모두 입력해주세요");
            return;
        }

        authApi
            .findUserId(form)
            .then((res) => {
                if(res.data.status === 'success') {
                    const msg1 = res.data.message;
                    const msg2 = res.data.data;
                    setResultMessage(msg1 + msg2);
                } else if(res.data.status === 'fail') {
                    setResultMessage(res.data.message);
                }
            })
            .catch((err: any) => {
                setResultMessage('서버 에러: ' + err.response?.data?.message || '알 수 없는 오류');
            });
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem-3rem)] px-4 bg-gray-100">
            <div className="w-full max-w-md p-10 bg-white shadow-md">
                <h2 className="mb-8 text-2xl font-bold text-center">아이디 찾기</h2>
                
                <div className="space-y-3">
                    <input
                        type="text"
                        name='user_name'
                        value={form.user_name}
                        onChange={handleChange}
                        placeholder="이름"
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
                    />
                    <input
                        type="text"
                        name='user_email'
                        value={form.user_email}
                        onChange={handleChange}
                        placeholder="이메일"
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
                    />
                </div>

                <button onClick={handleFindId} className="w-full py-2 mt-6 text-white bg-gray-800 rounded hover:bg-gray-900">
                    아이디 찾기
                </button>

                <div className="mt-4 text-sm text-center text-gray-600">
                    {resultMessage}
                </div>
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                </div>
            </div>
        </div>
    );
};

export default FindIdPage;