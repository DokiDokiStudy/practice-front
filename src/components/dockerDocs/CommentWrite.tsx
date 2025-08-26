import { useState, KeyboardEvent, FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Send } from "lucide-react";
import { useCreateComment } from "@/hooks/useComments";

type CommentWriteProps = {
  threadId: number;
};

const CommentWrite = ({ threadId }: CommentWriteProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const createCommentMutation = useCreateComment(threadId);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const result = await createCommentMutation.mutateAsync({
        content: content.trim(),
        postId: threadId,
      });

      setContent("");
    } catch (error) {
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  // 로그인하지 않은 경우 로그인 안내 표시
  if (!user) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <p className="text-gray-600 text-sm">
          댓글을 작성하려면 <span className="font-medium">로그인</span>이
          필요합니다.
        </p>
      </div>
    );
  }

  {
    /* TODO: 버튼 컴포넌트 사용하기 */
  }
  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <div className="flex gap-3">
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 입력하세요..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            maxLength={1000}
            disabled={createCommentMutation.isPending}
          />
        </div>
        <button
          type="submit"
          disabled={createCommentMutation.isPending || !content.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          <Send size={16} />
          {createCommentMutation.isPending ? "작성 중..." : "댓글 작성"}
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500 flex justify-between">
        <span>💡 Shift + Enter로 줄바꿈, Enter로 전송</span>
        <span>{content.length}/1000</span>
      </div>
    </form>
  );
};

export default CommentWrite;
