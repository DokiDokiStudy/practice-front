import { useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentList from "./CommentList";
import { Link } from "react-router-dom";

type ThreadCardProps = {
    threadId: string;
    title: string;
    summary: string;
    likes: number;
    dislikes: number;
    comments: string[];
};

const ThreadCard = ({ threadId, title, summary, likes, dislikes, comments } : ThreadCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <Link
            to={`/thread/${threadId}`}
            className="text-blue-700 font-semibold hover:underline block mb-1"
        >
            {title}
        </Link>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <div className="flex items-center gap-1"><ThumbsUp size={14} /> {likes}</div>
          <div className="flex items-center gap-1"><ThumbsDown size={14} /> {dislikes}</div>
        </div>
      </div>

      <p className="text-sm text-gray-700">{summary}</p>

      <button
        className="text-blue-600 text-sm mt-2 flex items-center gap-1"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {isExpanded ? "간략히 닫기" : "간략히 보기"}
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
              📄 전체 본문 내용 표시 예시입니다. 이곳에 실제 본문이 들어갈 수 있어요. 쿠쿠루삥뽕
            </div>
            <CommentList comments={comments} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreadCard;
