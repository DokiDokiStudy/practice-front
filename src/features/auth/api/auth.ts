import api from "@/shared/api";
import type { AxiosResponse } from "axios";

export interface LoginParams {
  email: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  user: { id: number; nickName: string };
}

export const login = (
  data: LoginParams
): Promise<AxiosResponse<AuthResponse>> => api.post("/auth/login", data);

export const register = (data: {
  email: string;
  password: string;
  nickName: string;
}): Promise<AxiosResponse<AuthResponse>> => api.post("/users", data);
