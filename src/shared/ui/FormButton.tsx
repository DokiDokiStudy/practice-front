import { useTheme } from "@/shared/theme";

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
  const { classes } = useTheme();

  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      onClick={onClick}
      className={`w-full py-3 rounded-2xl text-lg mb-4 disabled:opacity-50 ${classes.buttonPrimary}`}
      style={classes.buttonPrimaryStyle}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};
