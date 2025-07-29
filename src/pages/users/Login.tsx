import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '@/lib/api';

function Login() {
  // const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });
      // 쿠키에 넣어야 하는지 생각을 좀 해보자
      const token = res.data.data.token;
      const nickName = res.data.data.nickName;
      const user_email = res.data.data.email;
      const user_role = res.data.data.role;

      if (token && nickName && user_email) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: token,
            nickName: nickName,
            email: user_email,
            role: user_role,
          })
        );
        toast.success('로그인 성공!');
        navigate('/main');
      } else {
        setError('로그인 실패 다시 시도 해주세요.');
      }
    } catch (err) {
      setError(err.response?.data?.message || '아이디 또는 비밀번호를 다시 확인해주세요.');
      toast.error('로그인 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            로그인
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700">이메일</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700">비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </label>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>로그인 중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </button>
          <div className="mt-4 text-center text-sm text-gray-600 space-y-1">
            <p>
              <Link to="/register" className="text-blue-600 hover:underline">
                회원가입
              </Link>
            </p>
            <p>
              <Link to="/find-user" className="text-blue-600 hover:underline mr-2">
                아이디 찾기
              </Link>
              <span className="text-gray-400">|</span>
              <Link to="/find-pwd" className="text-blue-600 hover:underline ml-2">
                비밀번호 찾기
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
