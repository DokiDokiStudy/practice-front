import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { login } from "@/features/auth/api";
import type { LoginParams } from "@/features/auth/model";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (params: LoginParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await login(params);

      if (res.accessToken && res.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: res.accessToken,
            nickName: res.user.nickName,
          })
        );
        toast.success("로그인 성공!");
        navigate({ to: "/main" });
        return true;
      } else {
        setError("로그인 실패 다시 시도 해주세요.");
        toast.error("로그인 실패");
        return false;
      }
    } catch (err) {
      setError("아이디 또는 비밀번호를 다시 확인해주세요.");
      toast.error("로그인 실패");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, error };
};
