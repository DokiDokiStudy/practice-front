export interface User {
  id: number;
  nickName: string;
  email: string;
  role: string;
  token?: string;
}

export interface Category {
  id: number;
  name: string;
  parentId?: number;
  children?: Category[];
}
