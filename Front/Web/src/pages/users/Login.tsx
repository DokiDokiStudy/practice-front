import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';

function Login() {
  const [id, setId] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 로딩 나중에는 셋타임 대신 실제 통신 붙이고 프로미스 객체 반환된 이후 풀도록 구현 예정
    if (id !== 'admin' || password !== '1234') {
      setError('아이디 또는 비밀번호를 다시 확인해주세요.');
    } else {
      sessionStorage.setItem('isLoggedIn', 'true');
      setError('');
      navigate('/main');
      console.log('로그인 성공:', { id, password });
    }
    setIsLoading(false);
  };

  return (
    <>
      <TopNav />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            로그인
          </h2>

          <label className="block mb-4">
            <span className="text-gray-700">아이디</span>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
