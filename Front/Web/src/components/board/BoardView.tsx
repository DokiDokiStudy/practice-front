// read only 적용 시켜서 본문 게시글 전용으로 사용하는 View 레이아웃
// 하나의 form으로 사용하려니.. 너무 복잡해질 것을 우려하여 분리 관리
function BoardView({ title, author, date, content }) {
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
  
  export default BoardView;
  