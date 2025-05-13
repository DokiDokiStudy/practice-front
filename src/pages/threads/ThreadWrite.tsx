import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/common/TopNav';
import BoardLayout from '../../components/layout/BoardLayout';
import BoardForm from '../../components/board/BoardForm';
import { toast } from 'react-toastify';

const ThreadWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('스레드 작성됨:', { title, content });
    toast.success('게시글이 등록되었습니다!');
    navigate('/thread');
  };

  return (
    <>
      <TopNav />
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">✍️ 스레드 작성</h2>
        <BoardForm
          titleValue={title}
          contentValue={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onSubmit={handleSubmit}
          buttonText="작성 완료"
          buttonProps={{ color: 'green', size: 'md', loading: false }}
        />
      </BoardLayout>
    </>
  );
};

export default ThreadWrite;
