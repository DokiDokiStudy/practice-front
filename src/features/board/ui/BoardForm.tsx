import React from "react";
import Button, { ButtonProps } from "@/components/common/Button";

interface BoardFormProps {
  titleValue: string;
  contentValue: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonText?: string;
  buttonProps?: Partial<Omit<ButtonProps, "children">>;
  errors?: string[];
}

export function BoardForm({
  titleValue,
  contentValue,
  onTitleChange,
  onContentChange,
  onSubmit,
  buttonText = "제출",
  buttonProps = {},
  errors = [],
}: BoardFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <ul className="text-red-700 text-sm space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          제목 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={titleValue}
          onChange={onTitleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="제목을 입력해주세요 (100자 이내)"
          maxLength={100}
          required
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {titleValue.length}/100
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">
          내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          value={contentValue}
          onChange={onContentChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 h-52 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="내용을 입력해주세요 (10자 이상)"
          required
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {contentValue.length}자
        </div>
      </div>

      <div className="text-center">
        <Button type="submit" {...buttonProps}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
