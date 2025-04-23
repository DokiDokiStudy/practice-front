// 게시판의 등록/수정에서 사용
import React from 'react';
import Button from '../common/Button';

function BoardForm({ titleValue, contentValue, onTitleChange, onContentChange, onSubmit, buttonText = "제출", buttonProps = {} }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">제목</label>
        <input
          type="text"
          value={titleValue}
          onChange={onTitleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">내용</label>
        <textarea
          value={contentValue}
          onChange={onContentChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 h-52 resize-none"
          required
        />
      </div>

      <div className="text-center">
        <Button type="submit" {...buttonProps}>
           {buttonText}
        </Button>
      </div>
    </form>
  );
}

export default BoardForm;
