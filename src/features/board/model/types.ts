import type { Post } from "@/types";

export interface BoardPost extends Post {}

export interface BoardFilters {
  category?: number;
  search?: string;
  sortBy?: "latest" | "oldest" | "popular";
}

export interface BoardPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BoardState {
  posts: BoardPost[];
  currentPost?: BoardPost;
  filters: BoardFilters;
  pagination: BoardPagination;
  isLoading: boolean;
  error?: string | null;
}

export const initialBoardState: BoardState = {
  posts: [],
  currentPost: undefined,
  filters: {
    sortBy: "latest",
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  isLoading: false,
  error: null,
};
