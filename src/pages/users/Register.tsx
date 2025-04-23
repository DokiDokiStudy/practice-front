import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import TopNav from '../../components/common/TopNav';

function Register() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error('이메일 형식이 올바르지 않습니다.');
      return;
    }

    if (password !== confirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    await handleRegister();

    toast.success('회원가입 성공!');
    navigate('/login');
  };

  const handleRegister = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log('회원가입 시도:', { id, email, password });
  };

  return (
    <>
      <TopNav />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form
          onSubmit={checkRegister}
          className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            회원가입
          </h2>

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

          <div className="mb-4">
            <label className="text-gray-700 block mb-1">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-700 block mb-1">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-700 block mb-1">비밀번호 확인</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-xl transition ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? '처리 중...' : '회원가입'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
