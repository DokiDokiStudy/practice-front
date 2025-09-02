import { useTheme } from "@/app/providers";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { classes } = useTheme();

  return (
    <div
      className={`flex-1 flex items-center justify-center ${classes.pageBackground}`}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
