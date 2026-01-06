import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { loginUser } from "@/entities/user/api";
import { useAuth } from "@/shared/lib/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      if (response.statusCode !== 200) {
        throw new Error("로그인에 실패하였습니다.", { cause: response });
      }

      const tokenData = JSON.stringify({
        token: response.data.token,
      });
      localStorage.setItem("token", tokenData);
      setIsLogin(tokenData);
      toast.success("로그인에 성공하였습니다.");
      navigate({ to: "/main" });
    },

    onError: (error) => {
      console.error("로그인 에러:", error);
      toast.error("다시 시도 해주세요.");
    },
  });

  return {
    handleLogin: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
