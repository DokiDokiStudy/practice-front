import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from '@/components/common/TopNav';
import api from '@/lib/api';

function FindPwd() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const checkValidate = (id, email) => {
  //   const dummy = { id: 'doky123', email: 'doky@doky.com' };
  //   return dummy.id == id && dummy.email == email;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post('/auth/find-password', {
        email,
        name: id,
      });

      console.log(res);
      // 아, 이거 비밀번호 암호화된 채로 내려주는거 좋지 않습니다.
      // 일단 이메일로 보냈다는 메시지는 유지할게요

      if (res.status === 201 || res.data?.statusCode === 201) {
        setSubmitted(true);
      } else {
        toast.error(res.data?.message || '비밀번호 재설정 요청에 실패했습니다.');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || '입력한 정보로 등록된 계정을 찾을 수 없습니다.'
      );
    }

    setIsLoading(false);
  };

  return (
    <>
      <TopNav />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            비밀번호 찾기
          </h2>

          {!submitted ? (
            <>
              <div className="mb-4">
                <label className="text-gray-700 block mb-1">아이디</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="text-gray-700 block mb-1">가입된 이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-xl font-semibold transition ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? '처리 중...' : '비밀번호 찾기'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-6">
                이메일로 임시 비밀번호를 전송했습니다.
              </p>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                로그인 페이지로 이동
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default FindPwd;
