export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  name: string;
  password: string;
  nickName: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    email: string;
    nickName: string;
    role: string;
    token: string;
  };
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    nickName: string;
    createdAt: string;
  };
}
