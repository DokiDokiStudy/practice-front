import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { login } from "@/features/auth/api";
import type { LoginParams } from "@/features/auth/model";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (params: LoginParams) => {
    setIsLoading(true);

    try {
      const res = await login(params);

      if (res && res.data && res.data.token) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: res.data.token,
          })
        );
        toast.success("로그인에 성공하였습니다.");
        navigate({ to: "/main" });
      } else {
        toast.error("다시 시도 해주세요.");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      toast.error("다시 시도 해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading };
};
