import { Link } from "@tanstack/react-router";

interface BaseLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function BaseLink({ to, children, className = "" }: BaseLinkProps) {
  return (
    <Link
      to={to}
      className={`hover:text-foreground-accent transition-colors duration-200 ${className}`}
      activeProps={{
        className: "text-accent",
      }}
    >
      {children}
    </Link>
  );
}
