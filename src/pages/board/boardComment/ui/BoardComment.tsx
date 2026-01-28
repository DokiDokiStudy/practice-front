import {
  Comment,
  createComment,
  deleteComment,
} from "@/entities/comment";
import { updateComment } from "@/entities/comment/api/commentApi";
import { useQueryClient } from "@tanstack/react-query";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { CommentInput } from "./CommentInput";
import { CommentCard } from "./CommentCard";

export const BoardComment = ({
  postId,
  comments,
}: {
  postId: number;
  comments: Comment[];
}) => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const invalidatePost = () => {
    queryClient.invalidateQueries({
      queryKey: ["postList", "detail", postId],
    });
  };

  const handleAddComment = async (content: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createComment(postId, content);
      invalidatePost();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateComment = async (commentId: number, content: string) => {
    await updateComment(commentId, content);
    invalidatePost();
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    await deleteComment(commentId);
    invalidatePost();
  };

  return (
    <div className="space-y-4 mt-6 border-t border-gray-200 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100">
          <MessageSquare className="w-5 h-5 text-orange-500" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">
          댓글
          <span className="ml-2 text-sm font-medium text-gray-500">
            {comments.length}개
          </span>
        </h2>
      </div>

      {/* Input */}
      <CommentInput
        onSubmit={handleAddComment}
        placeholder="댓글을 작성해주세요..."
        disabled={isSubmitting}
      />

      {/* Comments List */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">
              아직 댓글이 없습니다.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              첫 번째 댓글을 작성해보세요!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onEdit={handleUpdateComment}
              onDelete={handleDeleteComment}
            />
          ))
        )}
      </div>
    </div>
  );
};
