import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex p-4 items-center justify-center bg-white/70 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-black tracking-tighter text-foreground"
        >
          KOKI<span className="text-accent">.</span>
        </Link>

        <nav className="flex gap-8 text-sm font-bold">
          <MenuLink to="/about">ABOUT</MenuLink>
          <MenuLink to="/works">WORKS</MenuLink>
          <MenuLink to="/contact">BLOG</MenuLink>
          <MenuLink to="/contact">CONTACT</MenuLink>
        </nav>
      </div>
    </header>
  );
}

const MenuLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-muted hover:text-accent transition-colors duration-200"
    activeProps={{
      className: "text-accent",
    }}
  >
    {children}
  </Link>
);
