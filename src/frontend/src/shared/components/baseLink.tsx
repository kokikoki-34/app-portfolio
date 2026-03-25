import { Link } from "@tanstack/react-router";

interface BaseLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BaseLink({
  to,
  children,
  className = "",
  onClick,
}: BaseLinkProps) {
  return (
    <Link
      to={to}
      className={`hover:text-foreground-accent transition-colors duration-200 ${className}`}
      onClick={onClick}
      activeProps={{
        className: "text-foreground-accent",
      }}
    >
      {children}
    </Link>
  );
}
