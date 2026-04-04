import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import "../index.css";

export const rootRoute = createRootRoute({
  head: () => ({
    title: "YASUI Koki | Portfolio",
    meta: [
      { name: "description", content: "YASUI Koki's Portfolio" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },

      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kokiyasui.com/" },
      { property: "og:title", content: "YASUI Koki | Portfolio" },
      {
        property: "og:description",
        content: "YASUI Koki's Portfolio site",
      },
      {
        property: "og:image",
        content: "https://kokiyasui.com/thumbnail.webp",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),

  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
});
