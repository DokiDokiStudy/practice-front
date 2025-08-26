import { NestedSidebar } from "@/shared/ui";
import { docsData } from "@/data/docsData";
import CommentList from "@/components/dockerDocs/CommentList";
import { useThread, useDeleteThread } from "@/hooks/useThreads";
import { useTheme } from "@/themes/useTheme";
import { useAuth } from "@/hooks/useAuth";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { usePostReaction } from "@/hooks/usePostReaction";
import { useNavigate, useParams } from "@tanstack/react-router";

const ThreadDetail = () => {
  const { id } = useParams({ from: "/thread/$id" });
  const navigate = useNavigate();
  const { classes } = useTheme();
  const { user } = useAuth();

  const threadId = parseInt(id || "0");

  const { data: thread, isLoading, error, isError } = useThread(threadId);

  const {
    userReaction,
    likeCount,
    dislikeCount,
    handleReactionClick,
    updateCounts,
    isLikePending,
    isDislikePending,
  } = usePostReaction(thread?.likes || 0, thread?.dislikes || 0);

  // 삭제 mutation
  const deleteThreadMutation = useDeleteThread();

  // 쓰레드 데이터가 로드되면 초기 좋아요/싫어요 수 설정
  if (thread) {
    updateCounts(thread.likes || 0, thread.dislikes || 0);
  }

  const handleDeleteThread = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteThreadMutation.mutateAsync(threadId);
      alert("쓰레드가 삭제되었습니다.");
      navigate({ to: "/threads" });
    } catch (error) {
      console.error("쓰레드 삭제 실패:", error);
      alert("쓰레드 삭제 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-600">
                쓰레드를 불러오고 있습니다...
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (isError || !thread) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <NestedSidebar data={docsData} />
          <main className="max-w-4xl px-4 py-10 mx-auto w-full">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-600">
                쓰레드를 찾을 수 없습니다: {error?.message}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <NestedSidebar data={docsData} />

        <main className="max-w-4xl px-4 py-10 mx-auto w-full">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate({ to: "/threads" })}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={16} />
              목록으로
            </button>

            {user && (
              <div className="flex gap-2">
                <button
                  onClick={() => navigate({ to: `/thread/edit/${thread.id}` })}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  <Edit size={16} />
                  수정
                </button>
                <button
                  onClick={handleDeleteThread}
                  disabled={deleteThreadMutation.isPending}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  {deleteThreadMutation.isPending ? "삭제 중..." : "삭제"}
                </button>
              </div>
            )}
          </div>

          <article
            className={`rounded-lg shadow-lg p-8 mb-8 ${classes.surface}`}
            style={classes.surfaceBorderStyle}
          >
            <header className="border-b pb-4 mb-6">
              <h1
                className={`text-3xl font-bold mb-4 ${classes.title}`}
                style={classes.titleStyle}
              >
                {thread.title}
              </h1>
              <div className="flex justify-between items-center text-sm">
                <div
                  className={`${classes.textSecondary}`}
                  style={classes.textSecondaryStyle}
                >
                  <span className="font-medium">
                    {thread.user?.nickName || "익명"}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  {thread.categoryName && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {thread.categoryName}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </header>

            <div
              className={`prose max-w-none mb-6 ${classes.textPrimary}`}
              style={classes.textPrimaryStyle}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {thread.content}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t">
              <button
                onClick={() => handleReactionClick(threadId, "like")}
                disabled={isLikePending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  userReaction === "like"
                    ? "bg-blue-100 text-blue-600 border border-blue-300 font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ThumbsUp size={18} />
                <span>좋아요 {likeCount}</span>
              </button>

              <button
                onClick={() => handleReactionClick(threadId, "dislike")}
                disabled={isDislikePending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  userReaction === "dislike"
                    ? "bg-red-100 text-red-600 border border-red-300 font-bold"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ThumbsDown size={18} />
                <span>싫어요 {dislikeCount}</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600">
                <MessageSquare size={18} />
                <span>댓글 {thread.comments?.length || 0}개</span>
              </div>
            </div>
          </article>

          <section
            className={`rounded-lg shadow-lg p-6 ${classes.surface}`}
            style={classes.surfaceBorderStyle}
          >
            <h2
              className={`text-xl font-bold mb-6 ${classes.title}`}
              style={classes.titleStyle}
            >
              💬 댓글
            </h2>
            <CommentList threadId={threadId} comments={thread.comments} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ThreadDetail;
