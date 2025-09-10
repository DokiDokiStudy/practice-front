import { useTheme } from "@/shared/theme";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
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
