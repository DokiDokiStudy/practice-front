import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Post } from "@/entities/post";

interface DocsContentProps {
  post: Post;
}

export function DocsContent({ post }: DocsContentProps) {
  return (
    <main className="flex-1 relative px-6 py-10 max-w-4xl mx-auto">
      <div className="prose prose-slate max-w-none">
        <h1>{post.title}</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </main>
  );
}
