import { api } from "@/shared/api";
import {
  LoginParams,
  AuthResponse,
  LoginResponse,
  RegisterParams,
} from "../model";

export const login = async (data: LoginParams): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterParams): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/users", data);
  return res.data;
};
