import { Link } from "@tanstack/react-router";
import type { Post } from "../model/types";

interface PostCardProps {
  post: Post;
  linkTo?: string;
  className?: string;
}

export function PostCard({ post, linkTo, className = "" }: PostCardProps) {
  const content = (
    <div
      className={`border border-gray-200 rounded-lg p-4 hover:bg-gray-50 ${className}`}
    >
      <h3 className="font-semibold text-lg mb-2 line-clamp-1">{post.title}</h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{post.author || post.user?.nickName || "익명"}</span>
        <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
