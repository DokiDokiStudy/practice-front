import { api } from "@/shared/api";
import { LoginParams, LoginResponse } from "../model";

export const loginUser = async (data: LoginParams): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
