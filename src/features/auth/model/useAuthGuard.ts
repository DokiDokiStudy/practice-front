import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

type UseAuthGuardOptions = {
  redirectTo?: string;
  message?: string;
  enabled?: boolean;
};

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const {
    redirectTo = "/auth/login",
    message = "로그인 후 접근 가능합니다.",
    enabled = true,
  } = options;

  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!enabled || isLoading) return;

    if (!user) {
      toast.warn(message);
      navigate({ to: redirectTo });
    }
  }, [user, isLoading, navigate, redirectTo, message, enabled]);

  return { user, isLoading, isAuthenticated: !!user };
};
