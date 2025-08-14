export interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  user?: {
    nickName: string;
    id: number;
  };
  createdAt: string;
  updatedAt: string;
  views?: number;
  categoryId?: number;
}

export interface PostsResponse {
  data: Post[];
  meta: {
    total: number;
    page: string;
    limit: string;
    totalPages: number;
  };
}

export interface CreatePostRequest {
  categoryId: number;
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title: string;
  content: string;
}
