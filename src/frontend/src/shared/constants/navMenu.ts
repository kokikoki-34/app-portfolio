import { ROUTES } from "./routes";

export const NavMenu = [
  { name: "HOME", href: ROUTES.HOME },
  { name: "ABOUT", href: ROUTES.ABOUT },
  { name: "WORKS", href: ROUTES.WORKS },
  { name: "CONTACT", href: ROUTES.CONTACT },
] as const;
