import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../router/root";
import { ROUTES } from "../shared/constants/routes";

export const worksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.WORKS,
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Works</h1>
    </>
  ),
});
