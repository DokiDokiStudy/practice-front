import { api } from "@/shared/api";
import { LoginParams, AuthResponse, RegisterParams } from "../model";

export const login = async (data: LoginParams): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterParams): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/users", data);
  return res.data;
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const res = await api.get("/users/check-email", {
      params: { email },
    });
    return res.data.message !== "사용가능한 이메일입니다.";
  } catch (err) {
    console.error("이메일 중복 확인 실패:", err);
    return false;
  }
};

export const findPassword = async (
  email: string,
  id: string
): Promise<boolean> => {
  try {
    const res = await api.post("/auth/find-password", {
      email,
      name: id,
    });

    return res.status === 201 || res.data?.statusCode === 201;
  } catch (error) {
    throw error;
  }
};
