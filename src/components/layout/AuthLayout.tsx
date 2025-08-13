import { ReactNode } from "react";
import { useTheme } from "@/themes/useTheme";
import BaseLayout from "./BaseLayout";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { classes } = useTheme();

  return (
    <BaseLayout
      className={`flex items-center justify-center ${classes.pageBackground}`}
    >
      <div className="w-full max-w-md">{children}</div>
    </BaseLayout>
  );
};

export default AuthLayout;
