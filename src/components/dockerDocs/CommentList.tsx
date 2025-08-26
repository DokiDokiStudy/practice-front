import { useTheme } from "@/themes/useTheme";
import CommentWrite from "./CommentWrite";
import { Comment } from "@/entities/thread";

type CommentListProps = {
  threadId: number;
  comments?: Comment[]; // Thread에서 받은 댓글 배열
};

const CommentList = ({ threadId, comments = [] }: CommentListProps) => {
  const { classes } = useTheme();

  return (
    <div className="space-y-4">
      <CommentWrite threadId={threadId} />

      {comments.length === 0 ? (
        <div className="flex justify-center py-8">
          <div
            className={`text-sm ${classes.textSecondary}`}
            style={classes.textSecondaryStyle}
          >
            아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요! 💬
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`p-3 rounded-lg ${classes.surface}`}
              style={classes.surfaceBorderStyle}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-sm font-medium ${classes.textPrimary}`}
                  style={classes.textPrimaryStyle}
                >
                  {comment.user?.nickName || "익명"}
                </span>
                <span
                  className={`text-xs ${classes.textSecondary}`}
                  style={classes.textSecondaryStyle}
                >
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p
                className={`text-sm ${classes.textSecondary}`}
                style={classes.textSecondaryStyle}
              >
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
