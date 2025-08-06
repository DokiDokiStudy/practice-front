export interface Post {
  id: number;
  title: string;
  content: string;
  author?: string; // 옵셔널로 변경
  views: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  // 백엔드에서 author 대신 user 정보를 줄 수도 있음
  user?: {
    id: number;
    nickName: string;
  };
}

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
