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
