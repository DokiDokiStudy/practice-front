import { Thread } from "../model";

export const dummyThreads: Thread[] = [
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
    updatedAt: "2025-08-04T00:00:00Z",
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
    updatedAt: "2025-08-03T00:00:00Z",
  },
];
