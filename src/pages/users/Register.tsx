import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/shared/api";
import AuthLayout from "@/components/layout/AuthLayout";

function Register() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (password !== confirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    const result = await handleRegister();

    if (result) {
      toast.success("회원가입 성공!");
      navigate({ to: "/login" });
    } else {
      toast.error("회원가입 실패");
    }
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      const response = await api.post("/users", {
        email,
        password,
        name: id,
        nickName,
      });

      // status 200
      return true;
    } catch (error) {
      console.error(error.response?.data || error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={checkRegister}
        className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full border border-blue-100"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-tight drop-shadow-sm">
          회원가입
        </h2>

        <div className="mb-6">
          <label className="text-blue-900 font-semibold block mb-2">
            닉네임
          </label>
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            className="w-full rounded-2xl border border-blue-200 px-5 py-3 bg-blue-50 text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-blue-900 font-semibold block mb-2">
            아이디
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded-2xl border border-blue-200 px-5 py-3 bg-blue-50 text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-blue-900 font-semibold block mb-2">
            이메일
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-blue-200 px-5 py-3 bg-blue-50 text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-blue-900 font-semibold block mb-2">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-blue-200 px-5 py-3 bg-blue-50 text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            required
          />
        </div>

        <div className="mb-8">
          <label className="text-blue-900 font-semibold block mb-2">
            비밀번호 확인
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full rounded-2xl border border-blue-200 px-5 py-3 bg-blue-50 text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-2xl font-bold text-lg shadow-md transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500"
          }`}
        >
          {isLoading ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
