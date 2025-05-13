type CommentListProps = {
    comments: string[];
  };
  
  const CommentList = ({ comments }: CommentListProps) => {
    return (
      <div className="space-y-2">
        {comments.map((c, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded text-sm">
            {c}
          </div>
        ))}
      </div>
    );
  };
  
  export default CommentList;
  