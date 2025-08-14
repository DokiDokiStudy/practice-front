import { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

const BaseLayout = ({ children, className = "" }: BaseLayoutProps) => {
  return <div className={`h-full overflow-auto ${className}`}>{children}</div>;
};

export default BaseLayout;
