import api from "@/lib/api";

export interface Thread {
  id: number;
  title: string;
  content: string;
  likes: number;
  dislikes: number;
  categoryId: number;
  categoryName?: string;
  userId: number;
  user?: {
    id: number;
    nickName: string;
    email: string;
  };
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  user?: {
    id: number;
    nickName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ThreadCreateDto {
  title: string;
  content: string;
  categoryId: number;
}

export interface ThreadUpdateDto {
  title?: string;
  content?: string;
  categoryId?: number;
}

// 요청/응답 타입 별칭 (호환성을 위해)
export type CreateThreadRequest = ThreadCreateDto;
export type UpdateThreadRequest = ThreadUpdateDto;

export interface CommentCreateDto {
  content: string;
  postId: number;
}

// 더미 데이터
const dummyThreads: Thread[] = [
  {
    id: 1,
    title: "Docker 설치 가이드",
    content: "Docker 설치하는 방법에 대해 알아보겠습니다...",
    likes: 5,
    dislikes: 0,
    categoryId: 4,
    categoryName: "1.1 Docker 소개",
    userId: 1,
    user: { id: 1, nickName: "Docker초보", email: "docker@test.com" },
    comments: [],
    createdAt: "2025-08-04T00:00:00Z",
    updatedAt: "2025-08-04T00:00:00Z"
  },
  {
    id: 2,
    title: "컨테이너와 가상머신의 차이점",
    content: "컨테이너 기술과 가상머신의 차이점을 설명드리겠습니다...",
    likes: 8,
    dislikes: 1,
    categoryId: 6,
    categoryName: "2.1 컨테이너 기초",
    userId: 2,
    user: { id: 2, nickName: "Container마스터", email: "container@test.com" },
    comments: [],
    createdAt: "2025-08-03T00:00:00Z",
    updatedAt: "2025-08-03T00:00:00Z"
  }
];

// 전체 쓰레드 목록 조회 - 사용케이스 아직 없음
// TODO : Threads 전체 파일 나중에는 더미 데이터 제거
export async function fetchThreads(): Promise<Thread[]> {
  try {
    const res = await api.get('/posts');
    const threads = res.data.posts ?? res.data.data?.posts ?? [];
    
    // 빈 배열이면 더미 데이터 사용
    if (threads.length === 0) {
      return dummyThreads;
    }
    return threads;
  } catch (error) {
    return dummyThreads;
  }
}

// 카테고리별 쓰레드 목록 조회
export async function fetchThreadsByCategory(categoryId: number): Promise<Thread[]> {
  try {
    const res = await api.get(`/posts?categoryId=${categoryId}`);
    const threads = res.data.posts ?? res.data.data?.posts ?? [];
    
    if (threads.length === 0) {
      // 더미 데이터에서 해당 카테고리 필터링
      const filtered = dummyThreads.filter(thread => thread.categoryId === categoryId);
      return filtered;
    }
    
    return threads;
  } catch (error) {
    return dummyThreads.filter(thread => thread.categoryId === categoryId);
  }
}

// 특정 쓰레드 조회
export async function fetchThreadById(id: number): Promise<Thread> {
  try {
    const res = await api.get(`/posts/${id}`);
    const thread = res.data.post ?? res.data.data?.post;
    
    if (!thread) {
      const found = dummyThreads.find(t => t.id === id);
      if (!found) {
        throw new Error('Thread not found');
      }
      return found;
    }
    
    return thread;
  } catch (error) {
    const found = dummyThreads.find(t => t.id === id);
    if (!found) {
      throw new Error('Thread not found');
    }
    return found;
  }
}

// 쓰레드 생성
export async function createThread(data: ThreadCreateDto): Promise<Thread> {
  const res = await api.post('/posts', data);
  return res.data.post ?? res.data.data?.post;
}

// 쓰레드 수정
export async function updateThread(id: number, data: ThreadUpdateDto): Promise<Thread> {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data.post ?? res.data.data?.post;
}

// 쓰레드 삭제
export async function deleteThread(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}

// 댓글 목록 조회 - 임시 비활성화 (백엔드 API 없음)
// Post 기준으로 comments 찾아내야함
export async function fetchCommentsByThreadId(postId: number): Promise<Comment[]> {
  try {
    // 백엔드에 post별 댓글 조회 API가 없어서 임시로 빈 배열 반환
    // const res = await api.get(`/comments/post/${postId}`);
    // return res.data.comments ?? res.data.data?.comments ?? [];
    return [];
  } catch (error) {
    return [];
  }
}

// 댓글 생성
export async function createComment(data: CommentCreateDto): Promise<Comment> {
  // 댓글 등록하고 posts/{post_id} 로 재호출 가게 되는데.. 이 때 서버에러 나네요.. 뭐지
  const res = await api.post('/comments', data);
  return res.data.comment ?? res.data.data?.comment ?? res.data;
}

// 댓글 삭제
export async function deleteComment(id: number): Promise<void> {
  await api.delete(`/comments/${id}`);
}
