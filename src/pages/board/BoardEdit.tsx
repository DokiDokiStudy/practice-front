import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BoardLayout from '@/components/layout/BoardLayout';
import BoardForm from '@/components/board/BoardForm';

import { useAuth } from '@/hooks/useAuth';
import { usePost } from '@/hooks/usePosts';
import { useUpdatePost } from '@/hooks/useMutatePost';

export default function BoardEdit() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();

  const { user, isLoading: authLoading } = useAuth();

  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
    error: postErrorObj,
  } = usePost(postId);

  const {
    mutate: update,
    isPending: isUpdating,
  } = useUpdatePost();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (authLoading || postLoading) return;

    if (!user) {
      toast.warn('로그인 후 접근 가능합니다.');
      return navigate('/login');
    }
    if (postError) {
      toast.error('게시글을 불러올 수 없습니다.');
      return navigate('/board');
    }
    if (post && post.author !== user.nickName) {
      toast.warn('수정 권한이 없습니다.');
      return navigate(`/board/${postId}`);
    }

    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [
    authLoading,
    postLoading,
    user,
    post,
    postError,
    navigate,
    postId,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update(
      { id: postId, payload: { title, content } },
      {
        onSuccess: () => {
          toast.success('게시글이 수정되었습니다!');
          navigate(`/board/${postId}`);
        },
        onError: (err: Error) => {
          toast.error(`수정 실패: ${err.message}`);
        },
      }
    );
  };

  if (authLoading || postLoading) {
    return (
      <>
        <BoardLayout>
          <p className="text-center py-20">로딩 중…</p>
        </BoardLayout>
      </>
    );
  }

  return (
    <>
      <BoardLayout>
        <h2 className="text-2xl font-bold text-center mb-6">
          ✏️ 게시글 수정
        </h2>

        <BoardForm
          titleValue={title}
          contentValue={content}
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          onSubmit={handleSubmit}
          buttonText="수정 완료"
          buttonProps={{
            color: 'green',
            size: 'md',
            loading: isUpdating,
            disabled: isUpdating,
          }}
        />
      </BoardLayout>
    </>
  );
}
