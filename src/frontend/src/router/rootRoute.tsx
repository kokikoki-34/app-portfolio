import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import "../index.css";

export const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      { title: "YASUI Koki" },
      { name: "description", content: "YASUI Koki's Portfolio" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    links: [{ rel: "icon", href: "/vite.svg" }],
  }),

  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
});
