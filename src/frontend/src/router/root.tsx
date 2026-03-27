import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import "../index.css";
import { Footer } from "../shared/components/footer";
import { Header } from "../shared/components/header";
import { MainLayout } from "../shared/components/mainLayout";
import { NotFoundContent } from "../shared/components/notFoundContent";
import { RouteErrorContent } from "../shared/components/routeErrorContent";

export const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      { title: "YASUI Koki" },
      { name: "description", content: "YASUI Koki's Portfolio" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    links: [{ rel: "icon", href: "/vite.svg" }],
  }),

  errorComponent: ({ error, reset }) => (
    <RouteErrorContent error={error} reset={reset} />
  ),

  notFoundComponent: () => <NotFoundContent />,

  component: () => (
    <>
      <HeadContent />

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <MainLayout>
          <Outlet />
        </MainLayout>
        <Footer />
      </div>

      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
