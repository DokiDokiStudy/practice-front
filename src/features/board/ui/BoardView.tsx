import type { BoardPost } from "../model";

interface BoardViewProps {
  post: BoardPost;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function BoardView({
  post,
  showActions = false,
  onEdit,
  onDelete,
}: BoardViewProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">제목</span>
        <h3 className="text-xl font-semibold mt-1">{post.title}</h3>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 border-b pb-2">
        <div className="flex gap-4">
          <span>작성자: {post.author || post.user?.nickName || "익명"}</span>
          <span>조회수: {post.views || 0}</span>
        </div>
        <div className="flex gap-2">
          <span>
            작성일: {new Date(post.createdAt).toLocaleDateString("ko-KR")}
          </span>
          {post.updatedAt !== post.createdAt && (
            <span>
              (수정됨: {new Date(post.updatedAt).toLocaleDateString("ko-KR")})
            </span>
          )}
        </div>
      </div>

      <div className="bg-[#fffde7] p-6 rounded-xl text-gray-800 max-h-[400px] overflow-y-auto whitespace-pre-line min-h-[200px]">
        {post.content}
      </div>

      {showActions && (
        <div className="flex justify-end gap-2 pt-4">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              수정
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              삭제
            </button>
          )}
        </div>
      )}
    </div>
  );
}
