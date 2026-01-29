import { useState } from "react";
import { Comment } from "@/entities/comment";
import { Edit2, Trash2, X, Check, User } from "lucide-react";

interface CommentCardProps {
  comment: Comment;
  onEdit: (commentId: number, content: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const CommentCard = ({
  comment,
  onEdit,
  onDelete,
}: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async () => {
    if (editContent.trim() && editContent !== comment.content) {
      await onEdit(comment.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await onDelete(comment.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          {/* Author & Time */}
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">
              {comment.author || "익명"}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
              {comment.updatedAt !== comment.createdAt && " (수정됨)"}
            </span>
          </div>
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
              title="수정"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full min-h-[80px] p-3 resize-none bg-gray-50 border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 rounded-lg outline-none transition-colors text-sm"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              취소
            </button>
            <button
              onClick={handleEdit}
              disabled={!editContent.trim() || editContent === comment.content}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              저장
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
      )}
    </div>
  );
};
