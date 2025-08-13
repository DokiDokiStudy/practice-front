const BOARD = {
  ROOT: "/board",
  LIST: "/board",
  WRITE: "/board/write",
  DETAIL: {
    PATH: "/board/$id",
    TO: (id: string | number) => `/board/${id}`,
  },
  EDIT: {
    PATH: "/board/$id/edit",
    TO: (id: string | number) => `/board/${id}/edit`,
  },
} as const;

const THREAD = {
  ROOT: "/thread",
  LIST: "/thread",
  WRITE: "/thread/write",
  DETAIL: {
    PATH: "/thread/$threadId",
    TO: (threadId: string | number) => `/thread/${threadId}`,
  },
  EDIT: {
    PATH: "/thread/$threadId/edit",
    TO: (threadId: string | number) => `/thread/${threadId}/edit`,
  },
} as const;

export const ROUTES = {
  HOME: "/",
  MAIN: "/main",
  LOGIN: "/login",
  REGISTER: "/register",
  FIND_USER: "/find-user",
  FIND_PWD: "/find-pwd",

  DOCKER_DOCS: "/docker-docs",
  DOCS_DETAIL: {
    PATH: "/docs/$projectId/$chapterId",
    TO: (projectId: string, chapterId: string) =>
      `/docs/${projectId}/${chapterId}`,
  },

  BOARD,
  THREAD,
} as const;
