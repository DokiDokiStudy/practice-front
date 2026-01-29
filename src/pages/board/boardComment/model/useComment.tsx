import { useState } from "react";
import { Comment } from "@/entities/comment";

export const useComments = () => {
  const addComment = (postId: number, content: string, commentId?: number) => {
    const payload = {
      postId,
      content,
      commentId,
    };
  };

  // const addReplyToComment = (
  //   comments: DummyComment[],
  //   parentId: string,
  //   newReply: DummyComment
  // ): DummyComment[] => {
  //   return comments.map((comment) => {
  //     if (comment.id === parentId) {
  //       return {
  //         ...comment,
  //         replies: [newReply, ...comment.replies],
  //       };
  //     }
  //     if (comment.replies.length > 0) {
  //       return {
  //         ...comment,
  //         replies: addReplyToComment(comment.replies, parentId, newReply),
  //       };
  //     }
  //     return comment;
  //   });
  // };

  // const updateComment = useCallback((commentId: string, newContent: string) => {
  //   const updateInTree = (comments: DummyComment[]): DummyComment[] => {
  //     return comments.map((comment) => {
  //       if (comment.id === commentId) {
  //         return { ...comment, content: newContent };
  //       }
  //       if (comment.replies.length > 0) {
  //         return { ...comment, replies: updateInTree(comment.replies) };
  //       }
  //       return comment;
  //     });
  //   };
  //   setComments((prev) => updateInTree(prev));
  // }, []);

  // const deleteComment = useCallback((commentId: string) => {
  //   const deleteFromTree = (comments: DummyComment[]): DummyComment[] => {
  //     return comments
  //       .filter((comment) => comment.id !== commentId)
  //       .map((comment) => ({
  //         ...comment,
  //         replies: deleteFromTree(comment.replies),
  //       }));
  //   };
  //   setComments((prev) => deleteFromTree(prev));
  // }, []);

  // const toggleLike = useCallback((commentId: string) => {
  //   const toggleInTree = (comments: DummyComment[]): DummyComment[] => {
  //     return comments.map((comment) => {
  //       if (comment.id === commentId) {
  //         return {
  //           ...comment,
  //           isLiked: !comment.isLiked,
  //           likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
  //         };
  //       }
  //       if (comment.replies.length > 0) {
  //         return { ...comment, replies: toggleInTree(comment.replies) };
  //       }
  //       return comment;
  //     });
  //   };
  //   setComments((prev) => toggleInTree(prev));
  // }, []);

  return {
    addComment,
    // updateComment,
    // deleteComment,
    // toggleLike,
  };
};
