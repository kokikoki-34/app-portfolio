import { Link } from "@tanstack/react-router";
import { BaseLink } from "./baseLink";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex p-4 items-center justify-center bg-white/70 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-black tracking-tighter text-foreground"
        >
          KOKI
        </Link>

        <nav className="flex">
          <MenuLink to="/about">ABOUT</MenuLink>
          <MenuLink to="/works">WORKS</MenuLink>
          <MenuLink to="/contact">BLOG</MenuLink>
          <MenuLink to="/contact">CONTACT</MenuLink>
        </nav>
      </div>
    </header>
  );
}

function MenuLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <BaseLink to={to} className="p-4 font-bold">
      {children}
    </BaseLink>
  );
}
