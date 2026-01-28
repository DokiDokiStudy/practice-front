import { useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { usePostReaction } from "@/features/boardForm";
// import { CommentList } from "@/features/docs";
import { useThreadList } from "../model";

// TODO: threadCard docs ui에서 분리 작업 필요

interface ThreadCardProps {
  threadId: string;
  title: string;
  summary: string; // 요약 (앞부분 일부)
  content?: string; // 전체 내용 (있으면 사용, 없으면 API로 가져옴)
  likes: number;
  dislikes: number;
  comments: string[];
  userId?: number;
}

export const ThreadCard = ({
  threadId,
  title,
  summary,
  content,
  likes,
  dislikes,
  comments,
  userId,
}: ThreadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    userReaction,
    likeCount,
    dislikeCount,
    handleReactionClick,
    updateCounts,
    isLikePending,
    isDislikePending,
  } = usePostReaction(likes, dislikes);

  const { data: fullThread, isLoading: isLoadingThread } = useThreadList();

  const getDisplayContent = () => {
    if (!isExpanded) {
      return summary;
    }

    if (content) {
      return content;
    }

    if (isLoadingThread) {
      return "전체 내용을 불러오고 있습니다";
    }

    // if (fullThread?.content) {
    //   return fullThread.content;
    // }

    return "전체 내용을 불러올 수 없습니다.";
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <Link
          to="/thread/$threadId"
          params={{ threadId }}
          className="text-blue-700 font-semibold hover:underline block mb-1"
        >
          {title}
        </Link>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <button
            onClick={() => handleReactionClick(parseInt(threadId), "like")}
            disabled={isLikePending}
            className={`flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${
              userReaction === "like"
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-gray-600"
            }`}
          >
            <ThumbsUp size={14} /> {likeCount}
          </button>
          <button
            onClick={() => handleReactionClick(parseInt(threadId), "dislike")}
            disabled={isDislikePending}
            className={`flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors ${
              userReaction === "dislike"
                ? "text-red-600 font-bold bg-red-50"
                : "text-gray-600"
            }`}
          >
            <ThumbsDown size={14} /> {dislikeCount}
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-700 mb-3">{getDisplayContent()}</div>

      <button
        className="text-blue-600 text-sm mt-2 flex items-center gap-1 hover:text-blue-800 transition-colors"
        onClick={() => setIsExpanded((prev) => !prev)}
        disabled={isLoadingThread}
      >
        {isExpanded ? "📄 간략히 보기" : "📖 자세히 보기"}
        {isLoadingThread ? (
          <span className="animate-spin">⟳</span>
        ) : isExpanded ? (
          <ChevronUp size={14} />
        ) : (
          <ChevronDown size={14} />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expand"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                <MessageSquare size={14} />
                댓글 ({comments.length})
              </h4>
              {/* <CommentList threadId={parseInt(threadId)} /> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
