export interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    nickName: string;
  };
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
