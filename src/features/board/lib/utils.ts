export const boardUtils = {
  truncateTitle: (title: string, maxLength = 50): string => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  },

  getPreview: (content: string, maxLength = 100): string => {
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  },

  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("ko-KR");
  },

  getRelativeTime: (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}일 전`;
    return boardUtils.formatDate(dateString);
  },

  validatePost: (title: string, content: string) => {
    const errors: string[] = [];

    if (!title.trim()) {
      errors.push("제목을 입력해주세요.");
    } else if (title.length > 100) {
      errors.push("제목은 100자 이내로 입력해주세요.");
    }

    if (!content.trim()) {
      errors.push("내용을 입력해주세요.");
    } else if (content.length < 10) {
      errors.push("내용은 10자 이상 입력해주세요.");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  sortPosts: (posts: any, sortBy: "latest" | "oldest" | "popular") => {
    return [...posts].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
  },
};
