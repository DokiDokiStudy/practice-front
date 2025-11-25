export type {
  Post,
  PostsResponse,
  PostListItem,
  PostListGetResponse,
} from "./model";
export { PostDetail, PostList } from "@/entities/post/ui";
export {
  postKeys,
  getPost,
  getPostList,
  createPost,
  updatePost,
  deletePost,
} from "./api";
