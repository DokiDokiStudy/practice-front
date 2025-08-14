import type { Post } from "../model/types";

interface PostDetailProps {
  post: Post;
  className?: string;
}

export function PostDetail({ post, className = "" }: PostDetailProps) {
  return (
    <article className={`prose max-w-none ${className}`}>
      <header className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>작성자: {post.author || post.user?.nickName || "익명"}</span>
          <div className="space-x-4">
            <span>
              작성일: {new Date(post.createdAt).toLocaleDateString("ko-KR")}
            </span>
            {post.views && <span>조회수: {post.views}</span>}
          </div>
        </div>
      </header>

      <div
        className="prose-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
