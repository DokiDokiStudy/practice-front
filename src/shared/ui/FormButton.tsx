interface FormButtonProps {
  type?: "submit" | "button";
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const FormButton = ({
  type = "submit",
  isLoading = false,
  loadingText = "처리 중...",
  children,
  onClick,
  disabled = false,
}: FormButtonProps) => {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className="w-full py-2.5 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition mb-4"
    >
      {isLoading ? loadingText : children}
    </button>
  );
};
