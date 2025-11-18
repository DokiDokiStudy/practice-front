import { Link } from "@tanstack/react-router";
import type { Post } from "@/entities/post";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <table className="w-full text-left table-fixed border-t border-gray-300 mb-4">
      <thead>
        <tr className="text-gray-600 border-b border-gray-300">
          <th className="w-1/12 py-2 text-center">번호</th>
          <th className="w-6/12 py-2 text-center">제목</th>
          <th className="w-2/12 py-2 text-center">작성자</th>
          <th className="w-3/12 py-2 text-center">작성일</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post) => (
            <tr
              key={post.id}
              className="border-b border-gray-200 hover:bg-white/70"
            >
              <td className="py-3 text-center">{post.id}</td>
              <td className="py-3 text-center">
                <Link
                  to={`/board/${post.id}`}
                  className="text-black-700 hover:underline"
                >
                  {post.title}
                </Link>
              </td>
              <td className="py-3 text-center">
                {post.author || post.user?.nickName || "익명"}
              </td>
              <td className="py-3 text-center">
                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="py-20 text-center text-gray-500">
              등록된 게시글이 없습니다.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
