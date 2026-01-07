import { useState } from "react";
import { Send } from "lucide-react";

interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  onCancel?: () => void;
  showCancel?: boolean;
}

export const CommentInput = ({
  onSubmit,
  placeholder = "Write a comment...",
  autoFocus = false,
  onCancel,
  showCancel = false,
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
        className="min-h-[80px] p-2 resize-none bg-card border-2 border-muted focus:border-primary transition-colors rounded-xl"
      />
      <div className="flex justify-end gap-2">
        {showCancel && <button onClick={onCancel}>Cancel</button>}
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="gap-2 border bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-orange-600 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          댓글
        </button>
      </div>
    </div>
  );
};
