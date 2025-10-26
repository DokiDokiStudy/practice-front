import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

export interface CardButtonProps {
  to?: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function CardButton({
  to,
  title,
  description,
  className,
  children,
}: CardButtonProps) {
  const base =
    "p-6 rounded-xl shadow hover:shadow-lg transition bg-blue-50 hover:bg-blue-100";

  const content = children ?? (
    <>
      <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
      {description && <p className="text-gray-600 text-sm">{description}</p>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        <div className={`${base} ${className ?? ""}`}>{content}</div>
      </Link>
    );
  }

  return <div className={`${base} ${className ?? ""}`}>{content}</div>;
}
