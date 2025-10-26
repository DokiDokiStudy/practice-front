import { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  color?: string;
  size?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

const colorClasses = {
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  green: "bg-green-500 text-white hover:bg-green-600",
  gray: "bg-gray-400 text-white hover:bg-gray-500",
  red: "bg-red-500 text-white hover:bg-red-600",
  yellow: "bg-yellow-500 text-white hover:bg-yellow-600",
  purple: "bg-purple-500 text-white hover:bg-purple-600",
  pink: "bg-pink-500 text-white hover:bg-pink-600",
  indigo: "bg-indigo-500 text-white hover:bg-indigo-600",
  teal: "bg-teal-500 text-white hover:bg-teal-600",
  black: "bg-black text-white hover:bg-gray-900",
};

const sizeClasses = {
  xs: "px-2 py-1 text-xs",
  sm: "px-3 py-1 text-sm",
  "sm-md": "px-3.5 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  "md-lg": "px-4.5 py-2.5 text-base",
  lg: "px-5 py-2.5 text-lg",
  xl: "px-6 py-3 text-lg",
  "2xl": "px-7 py-3.5 text-xl",
  "3xl": "px-8 py-4 text-xl",
  "4xl": "px-9 py-5 text-2xl",
};

export function Button({
  children,
  color = "blue",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        ${colorClasses[color] || colorClasses.blue}
        ${sizeClasses[size] || sizeClasses.md}
        rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      )}
      {loading ? "로딩중..." : children}
    </button>
  );
}
