import { ROUTE_PATH } from "./routePath";

export const NavMenu = [
  { name: "HOME", href: ROUTE_PATH.HOME },
  { name: "ABOUT", href: ROUTE_PATH.ABOUT },
  { name: "WORKS", href: ROUTE_PATH.WORKS },
  { name: "CONTACT", href: ROUTE_PATH.CONTACT },
] as const;
