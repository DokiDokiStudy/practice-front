export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
  nickName: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    nickName: string;
  };
}

export interface User {
  nickName: string;
  token: string;
}
