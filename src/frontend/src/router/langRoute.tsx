import { createRoute, notFound, Outlet } from "@tanstack/react-router";
import { Footer } from "../shared/components/footer";
import { Header } from "../shared/components/header";
import { MainLayout } from "../shared/components/mainLayout";
import { NotFoundContent } from "../shared/components/notFoundContent";
import { RouteErrorContent } from "../shared/components/routeErrorContent";
import { LANGUAGES, type Language } from "../shared/constants/language";
import { rootRoute } from "./rootRoute";

export const langRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$lang",

  beforeLoad: ({ params }) => {
    if (isValidLanguage(params.lang as Language)) {
      return;
    } else {
      throw notFound();
    }
  },

  errorComponent: ({ error, reset }) => (
    <RouteErrorContent error={error} reset={reset} />
  ),

  notFoundComponent: () => <NotFoundContent />,

  component: () => (
    <>
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

function isValidLanguage(value: Language): boolean {
  return Object.values(LANGUAGES).includes(value);
}
