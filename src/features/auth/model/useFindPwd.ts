import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { findPassword } from "../api/authApi";

export const useFindPwd = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindPwd = async (id: string, email: string) => {
    setIsLoading(true);

    try {
      const success = await findPassword(email, id);

      if (success) {
        setSubmitted(true);
      } else {
        toast.error("비밀번호 재설정 요청에 실패했습니다.");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "입력한 정보로 등록된 계정을 찾을 수 없습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { submitted, isLoading, handleFindPwd, navigate };
};
