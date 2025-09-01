import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgreeTremPage = () => {
    const navigate = useNavigate();

    const [termsChecked, setTermsChecked] = useState(false);
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [allChecked, setAllChecked] = useState(false);

    const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAllChecked(checked);
        setTermsChecked(checked);
        setPrivacyChecked(checked);
    };


    const handleIndividualCheck = (
        type: 'terms' | 'privacy',
        checked: boolean
    ) => {
        if (type === 'terms') setTermsChecked(checked);
        else setPrivacyChecked(checked);
    };

    React.useEffect(() => {
        setAllChecked(termsChecked && privacyChecked);
    }, [termsChecked, privacyChecked]);

    const handleSubmit = () => {
        if(termsChecked && privacyChecked) {
            navigate('/signup');
        } else {
            alert('약관에 모두 동의하셔야 회원가입을 진행하실 수 있습니다.');
        }
    }

    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100">
            <div className="p-6 mx-auto bg-white rounded shadow-md max-w-screen-2xl" style={{lineHeight: 2.25}}>
                <div className="p-3 mb-4 text-sm font-semibold text-center rounded">
                    회원가입약관 및 개인정보 수집 및 이용의 내용에 동의하셔야 회원가입 하실 수 있습니다.
                </div>
                <div className="p-3 mb-4 border rounded">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">회원가입약관</h3>
                        <input type="checkbox" checked={termsChecked} onChange={(e) => handleIndividualCheck('terms', e.target.checked)}/>
                    </div>
                    <textarea
                        className="w-full h-32 p-2 text-sm border resize-none"
                        defaultValue={`홈페이지 이용약관

제1조 (목적)  
이 약관은 [회사명] (이하 "회사")이 운영하는 [홈페이지 주소] (이하 "사이트")에서 제공하는 서비스의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.

제2조 (약관의 효력 및 변경)  
1. 본 약관은 사이트에 게시함으로써 효력을 발생합니다.  
2. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경된 약관은 사이트에 공지함으로써 효력을 발생합니다.

제3조 (용어의 정의)  
1. "이용자"란 사이트에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.  
2. "회원"이란 사이트에 개인정보를 제공하여 회원 등록을 한 자를 의미합니다.

제4조 (서비스의 제공 및 변경)  
1. 회사는 다음과 같은 서비스를 제공합니다.  
   - 홈페이지 콘텐츠 제공  
   - 기타 회사가 정하는 서비스  
2. 회사는 서비스의 내용, 기술적 사양 등을 변경할 수 있으며, 변경된 사항은 공지합니다.

제5조 (서비스의 중단)  
1. 회사는 다음과 같은 경우 서비스 제공을 일시적으로 중단할 수 있습니다.  
   - 시스템 점검, 유지보수 등  
   - 천재지변, 불가항력적 사유 발생  
2. 회사는 사전 통지 없이 서비스를 중단할 수 있으며, 이로 인해 발생한 손해에 대해 책임지지 않습니다.

제6조 (회원가입)  
1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입하여 회원가입을 신청합니다.  
2. 회사는 가입신청자 중 다음에 해당하는 경우 승낙하지 않을 수 있습니다.  
   - 타인의 명의로 신청한 경우  
   - 허위 정보를 기재한 경우  
   - 기타 부적절하다고 판단되는 경우

제7조 (회원의 의무)  
1. 회원은 관계법령, 본 약관의 규정, 이용안내 및 공지사항 등을 준수해야 합니다.  
2. 회원은 서비스 이용과 관련하여 다음 행위를 해서는 안 됩니다.  
   - 타인의 정보 도용  
   - 회사의 지적재산권 침해  
   - 공공질서 및 미풍양속에 반하는 행위

제8조 (회사의 의무)  
회사는 관련 법령 및 본 약관이 금지하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 노력합니다.

제9조 (개인정보 보호)  
회사는 이용자의 개인정보를 보호하기 위해 노력하며, 관련 법령에 따라 개인정보처리방침을 수립·공개합니다.

제10조 (지적재산권)  
사이트에 게시된 모든 콘텐츠에 대한 저작권 및 지적재산권은 회사에 있으며, 무단 복제, 배포, 사용을 금지합니다.

제11조 (면책조항)  
1. 회사는 천재지변, 기술적 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.  
2. 회사는 이용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임지지 않습니다.

제12조 (준거법 및 재판관할)  
1. 본 약관에 따른 분쟁에 대하여는 대한민국 법을 적용합니다.  
2. 서비스 이용과 관련하여 분쟁이 발생할 경우, 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.`}
                    />
                    </div>
                    <div className="p-3 mb-4 border rounded">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">개인정보 수집 및 이용</h3>
                            <input type="checkbox" checked={privacyChecked} onChange={(e) => handleIndividualCheck('privacy', e.target.checked)}/>
                        </div>

                        <table className="w-full text-sm border">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="p-2 border">목적</th>
                                    <th className="p-2 border">항목</th>
                                    <th className="p-2 border">보유기간</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="p-2 border">이용자 식별 및 본인여부 확인</td>
                                    <td className="p-2 border">아이디, 이름, 비밀번호</td>
                                    <td className="p-2 border">회원 탈퇴 시까지</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="p-2 border">고객서비스 이용에 관한 통지</td>
                                    <td className="p-2 border">연락처 (이메일, 휴대전화번호)</td>
                                    <td className="p-2 border">회원 탈퇴 시까지</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 mb-4 border rounded">
                        <div className="flex items-center justify-between pt-4 mt-4 text-sm border-t">
                            <span className="w-full text-center text-gray-600">회원가입 약관에 모두 동의합니다</span>
                            <input type="checkbox" checked={allChecked} onChange={handleAllCheck} />
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 px-6 py-2 text-gray-700 border rounded hover:bg-gray-100">
                            취소
                        </button>
                        <button onClick={handleSubmit} className="flex-1 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            회원가입
                        </button>
                    </div>
                </div>
        </div>
    );
};

export default AgreeTremPage;