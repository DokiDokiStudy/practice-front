interface PostDetailProps {
  title: string;
  author: string;
  date: string;
  content: string;
}

export function PostDetail({ title, author, date, content }: PostDetailProps) {
  return (
    <div className="space-y-4">
      <div>
        <span className="text-gray-500">제목</span>
        <h3 className="text-xl font-semibold mt-1">{title}</h3>
      </div>

      <div className="flex justify-end text-sm text-gray-600 border-b pb-2">
        <span className="mr-2">작성자: {author}</span>
        <span>{date}</span>
      </div>

      <div className="bg-[#fffde7] p-6 rounded-xl text-gray-800 max-h-[300px] overflow-y-auto whitespace-pre-line min-h-[200px]">
        {content}
      </div>
    </div>
  );
}
