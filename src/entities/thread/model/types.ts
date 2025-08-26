export interface Thread {
  id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  categoryId: number;
  categoryName?: string;
  userId: number;
  user?: {
    id: number;
    nickName: string;
    email: string;
  };
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  user?: {
    id: number;
    nickName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ThreadCreateDto {
  title: string;
  content: string;
  categoryId: number;
}

export interface ThreadUpdateDto {
  title?: string;
  content?: string;
  categoryId?: number;
}
