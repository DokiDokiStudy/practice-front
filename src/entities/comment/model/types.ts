export interface Comment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  parentId: number | null;
  depth: number;
  likeCount: number;
  updatedAt: string;
}
