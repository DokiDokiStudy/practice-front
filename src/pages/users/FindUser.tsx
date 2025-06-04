import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import api from '../../lib/api';

function FindUser() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const res = await api.get('/users/check-email', {
        params: { email },
      });

      return res.data.message !== '사용가능한 이메일입니다.';
    } catch (err) {
      console.error('이메일 중복 확인 실패:', err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 음.. 일단 임시로 이 라우트 사용
    const exists = await checkEmailExists(email);

    if (exists) {
      setSubmitted(true);
      // 나중에 메일 전송하는 라우트도 태워야 함
    } else {
      toast.error('입력하신 이메일로 가입된 계정을 찾을 수 없습니다.');
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
            아이디 찾기
          </h2>

          {!submitted ? (
            <>
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
                className={`w-full py-2 rounded-xl transition font-semibold ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? '처리 중...' : '아이디 찾기'}
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-green-600 font-semibold mb-6">
                입력한 이메일로 아이디 정보를 전송했습니다.
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

export default FindUser;
