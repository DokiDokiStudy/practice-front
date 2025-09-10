import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { checkEmailExists } from "../api/authApi";

export const useFindUser = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindUser = async (email: string) => {
    setIsLoading(true);

    const exists = await checkEmailExists(email);

    if (exists) {
      setSubmitted(true);
    } else {
      toast.error("입력하신 이메일로 가입된 계정을 찾을 수 없습니다.");
    }

    setIsLoading(false);
  };

  return { submitted, isLoading, handleFindUser, navigate };
};
