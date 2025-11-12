import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

interface UseAuthGuardOptions {
  redirectTo?: string;
  message?: string;
  enabled?: boolean;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    redirectTo = "/auth/login",
    message = "로그인 후 접근 가능합니다.",
    enabled = true,
  } = options;

  const navigate = useNavigate();
  const { isLogin } = useAuth();

  useEffect(() => {
    if (!enabled) return;

    if (!isLogin) {
      toast.warn(message);
      navigate({ to: redirectTo });
    }
  }, [isLogin, navigate, redirectTo, message, enabled]);
  return { isLogin };
};
