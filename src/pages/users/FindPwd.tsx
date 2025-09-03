import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import "react-toastify/dist/ReactToastify.css";
import { api } from "@/shared/api";
import { AuthLayout } from "@/widgets";

function FindPwd() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/find-password", {
        email,
        name: id,
      });

      if (res.status === 201 || res.data?.statusCode === 201) {
        setSubmitted(true);
      } else {
        toast.error(
          res.data?.message || "비밀번호 재설정 요청에 실패했습니다."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "입력한 정보로 등록된 계정을 찾을 수 없습니다."
      );
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full border border-blue-100"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8 tracking-tight drop-shadow-sm">
          비밀번호 찾기
        </h2>

        {!submitted ? (
          <>
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

            <div className="mb-8">
              <label className="text-blue-900 font-semibold block mb-2">
                가입된 이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              {isLoading ? "처리 중..." : "비밀번호 찾기"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-semibold mb-6">
              이메일로 임시 비밀번호를 전송했습니다.
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              className="bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 px-6 rounded-2xl font-bold shadow-md hover:from-blue-600 hover:to-blue-500 transition"
            >
              로그인 페이지로 이동
            </button>
          </div>
        )}
      </form>
    </AuthLayout>
  );
}

export default FindPwd;
