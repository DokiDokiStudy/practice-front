import CommentWrite from "./CommentWrite";
import { Comment } from "@/entities/thread";

type CommentListProps = {
  threadId: number;
  comments?: Comment[]; // Thread에서 받은 댓글 배열
};

const CommentList = ({ threadId, comments = [] }: CommentListProps) => {
  return (
    <div className="space-y-4">
      <CommentWrite threadId={threadId} />

      {comments.length === 0 ? (
        <div className="flex justify-center py-8">
          <div className="text-sm text-gray-500">
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요! 💬
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-900">
                  {comment.user?.nickName || "익명"}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
