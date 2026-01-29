import { useState } from "react";
import { Send } from "lucide-react";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
  showCancel?: boolean;
  disabled?: boolean;
}

export const CommentInput = ({
  onSubmit,
  placeholder = "댓글을 작성해주세요...",
  autoFocus = false,
  onCancel,
  showCancel = false,
  disabled = false,
}: CommentInputProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="min-h-[80px] p-3 resize-none bg-white border border-gray-200 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors rounded-xl outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <div className="flex justify-end gap-2">
        {showCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            취소
          </button>
        )}
        <button
          onClick={handleSubmit}
          disabled={!content.trim() || disabled}
          className="gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
          {disabled ? "등록 중..." : "댓글"}
        </button>
      </div>
    </div>
  );
};
