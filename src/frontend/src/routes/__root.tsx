import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import "../index.css";
import { Footer } from "../shared/components/footer";
import { Header } from "../shared/components/header";

export const Route = createRootRoute({
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

      {/* 1. サイト全体の背景色を指定 */}
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />

        <main className="flex py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
                <div className="bg-white rounded-lg p-8 md:p-12 shadow-none border-none">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
