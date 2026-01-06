import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostDetailProps {
  title: string;
  author: string;
  date: string;
  content: string;
}

export function PostDetail({ title, author, date, content }: PostDetailProps) {
  return (
    <>
      <div>
        <span className="text-gray-500">제목</span>
        <h3 className="text-xl font-semibold mt-1">{title}</h3>
      </div>

      <div className="flex justify-end text-sm text-gray-600 border-b pb-2">
        <span className="mr-2">작성자: {author}</span>
        <span>{date}</span>
      </div>

      <div className="bg-[#fffde7] p-6 rounded-xl text-gray-800 flex-1 min-h-0 overflow-y-auto prose prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </>
  );
}
