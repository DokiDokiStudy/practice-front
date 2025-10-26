import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { register } from "../api/authApi";
import type { RegisterParams } from "./types";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (
    params: RegisterParams & { confirm: string }
  ) => {
    setIsLoading(true);
    setError(null);

    // 이메일 검증
    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validateEmail(params.email)) {
      toast.error("이메일 형식이 올바르지 않습니다.");
      setIsLoading(false);
      return false;
    }

    if (params.password !== params.confirm) {
      toast.error("비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
      return false;
    }

    try {
      const res = await register(params);

      if (res.accessToken && res.user) {
        toast.success("회원가입 성공!");
        navigate({ to: "/auth", search: { mode: "login" } });
        return true;
      } else {
        toast.error("회원가입 실패");
        return false;
      }
    } catch (err) {
      console.error(err);
      toast.error("회원가입 실패");
      setError("회원가입 실패");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading, error };
};
