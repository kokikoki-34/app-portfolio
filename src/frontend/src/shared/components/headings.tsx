import type { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export function Title({ children, className = "" }: HeadingProps) {
  return <h1 className={`text-3xl font-bold mb-6 ${className}`}>{children}</h1>;
}

export function Heading({ children, className = "" }: HeadingProps) {
  return <h2 className={`text-2xl font-bold my-6 ${className}`}>{children}</h2>;
}
