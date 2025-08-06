import { useEffect, useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentList from "./CommentList";
import api from "@/lib/api";
import { Link } from "@tanstack/react-router";

type ThreadCardProps = {
  threadId: string; // 현재 화면 구조로는 게시글..
  title: string;
  summary: string;
  likes: number;
  dislikes: number;
  comments: string[];
  userId: number; // 이메일로 해야하나
};

const ThreadCard = ({
  threadId,
  title,
  summary,
  likes,
  dislikes,
  comments,
  userId,
}: ThreadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    null
  );
  const [reactionId, setReactionId] = useState<number | null>(null);
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);

  useEffect(() => {
    const fetchUserReaction = async () => {
      try {
        const res = await api.get("/like", {
          params: { userId, postId: threadId },
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
          const reaction = res.data[0];
          setUserReaction(reaction.reactionType);
          setReactionId(reaction.id);
        }
      } catch (err) {
        console.error("실패:", err);
      }
    };
    fetchUserReaction();
  }, [userId, threadId]);

  // 좋아요 / 싫어요 클릭 이벤트
  const handleReactionClick = async (type: "like" | "dislike") => {
    try {
      if (userReaction === null) {
        const res = await api.post("/like", {
          userId,
          postId: threadId,
          reactionType: type,
        });
        // res.data.id 안불러와짐 생성된 id 반환 필요 이거 있어야 다음 액션에 오류 없음
        setReactionId(res.data.id);
        setUserReaction(type);
        type === "like"
          ? setLikeCount((v) => v + 1)
          : setDislikeCount((v) => v + 1);
      } else if (userReaction === type) {
        await api.delete(`/like/${reactionId}`);
        setUserReaction(null);
        setReactionId(null);
        type === "like"
          ? setLikeCount((v) => v - 1)
          : setDislikeCount((v) => v - 1);
      } else {
        await api.patch(`/like/${reactionId}`, { reactionType: type });
        if (type === "like") {
          setLikeCount((v) => v + 1);
          setDislikeCount((v) => v - 1);
        } else {
          setDislikeCount((v) => v + 1);
          setLikeCount((v) => v - 1);
        }
        setUserReaction(type);
      }
    } catch (err) {
      console.error("반응 처리 중 오류:", err);
    }
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
            onClick={() => handleReactionClick("like")}
            className={`flex items-center gap-1 ${
              userReaction === "like" ? "text-blue-600 font-bold" : ""
            }`}
          >
            <ThumbsUp size={14} /> {likeCount}
          </button>
          <button
            onClick={() => handleReactionClick("dislike")}
            className={`flex items-center gap-1 ${
              userReaction === "dislike" ? "text-red-600 font-bold" : ""
            }`}
          >
            <ThumbsDown size={14} /> {dislikeCount}
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700">{summary}</p>

      <button
        className="text-blue-600 text-sm mt-2 flex items-center gap-1"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? "간략히 보기" : "자세히 보기"}
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expand"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2"
          >
            <div className="text-sm text-gray-800 mb-3">
              📄 전체 본문 내용 표시 예시입니다. 이곳에 실제 본문이 들어갈 수
              있어요.
            </div>
            <CommentList comments={comments} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreadCard;
