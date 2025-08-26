export type ReactionType = "like" | "disLike";

export interface LikeResponse {
  message: string;
  data?: { id: number };
}
