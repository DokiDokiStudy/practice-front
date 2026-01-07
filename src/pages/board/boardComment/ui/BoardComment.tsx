import { Comment, createComment } from "@/entities/comment";
import { useComments } from "../model/useComment";
import { MessageSquare } from "lucide-react";
import { CommentInput } from "./CommentInput";
import { CommentCard } from "./CommentCard";
import { updateComment } from "@/entities/comment/api/commentApi";

export const BoardComment = ({
  postId,
  comments,
}: {
  postId: number;
  comments: Comment[];
}) => {
  const addComment = async (content: string, commentId?: number) => {
    await createComment(postId, content);
  };

  // const { addComment /* updateComment, deleteComment, toggleLike */ } =
  //   useComments();

  return (
    <div className="space-y-4 mt-4 border-t border-gray-200 pt-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Comments
          <span className="ml-2 text-sm font-medium text-muted-foreground">
            ({comments.length})
          </span>
        </h2>
      </div>

      <CommentInput
        onSubmit={(content) => addComment(content)}
        placeholder="Share your thoughts..."
      />

      {/* Comments List */}
      <div className="space-y-4 px-4 pb-4">
        {comments.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground font-medium">
              등록된 댓글이 없습니다.
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              // onReply={(parentId, content, depth) =>
              //   onAddComment(content, parentId, depth)
              // }
              onEdit={updateComment}
              // onDelete={onDeleteComment}
              // onToggleLike={onToggleLike}
            />
          ))
        )}
      </div>
    </div>
  );
};
