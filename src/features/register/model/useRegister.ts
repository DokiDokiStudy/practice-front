import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { createUser } from "@/entities/user/api";
import type { RegisterParams } from "@/entities/user/model";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const useRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createUser,
    onMutate: (params) => {
      if (!validateEmail(params.email)) {
        toast.error("이메일 형식이 올바르지 않습니다.");
        throw new Error("Invalid email format");
      }
    },
    onSuccess: () => {
      toast.success("회원가입 성공!");
      navigate({ to: "/login" });
    },
    onError: (err) => {
      console.error("회원가입 에러:", err);

      if (err instanceof AxiosError) {
        const errorCode = err.response?.data?.errorCode;
        const errorMessage = err.response?.data?.message;

        if (errorCode === "USER_ALREADY_EXISTS") {
          toast.error("이미 존재하는 이메일입니다.");
        } else {
          toast.error(errorMessage || "회원가입 실패");
        }
      } else if (err.message !== "Invalid email format") {
        toast.error("회원가입 실패");
      }
    },
  });

  return {
    handleRegister: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
