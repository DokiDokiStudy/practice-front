export type {
  Post,
  PostsResponse,
  PostListItem,
  PostListGetResponse,
} from "./model";
export {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from "./api/postApi";
