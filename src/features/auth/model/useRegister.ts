import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { register } from "../api/authApi";
import type { RegisterParams } from "./types";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (params: RegisterParams) => {
    setIsLoading(true);
    setError(null);

    const validateEmail = (email: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validateEmail(params.email)) {
      toast.error("이메일 형식이 올바르지 않습니다.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await register(params);
      toast.success("회원가입 성공!");
      navigate({ to: "/auth/login" });
    } catch (err) {
      console.error("회원가입 에러:", err);

      if (err instanceof AxiosError) {
        const errorCode = err.response?.data?.errorCode;
        const errorMessage = err.response?.data?.message;

        setError(errorMessage);

        if (errorCode === "USER_ALREADY_EXISTS") {
          toast.error("이미 존재하는 이메일입니다.");
        } else {
          toast.error(errorMessage || "회원가입 실패");
        }
      } else {
        toast.error("회원가입 실패");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegister, isLoading, error };
};
