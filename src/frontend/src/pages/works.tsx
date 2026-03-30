import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../router/langRoute";
import { ROUTE_PATH } from "../shared/constants/routePath";

export const worksRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.WORKS,
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Works</h1>
    </>
  ),
});
