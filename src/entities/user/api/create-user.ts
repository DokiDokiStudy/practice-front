import { api } from "@/shared/api";
import { AuthResponse, RegisterParams } from "../model";

export const createUser = async (
  data: RegisterParams
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/users", data);
  return res.data;
};
