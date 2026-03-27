import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../router/langRoute";
import { ROUTE_PATH } from "../shared/constants/routePath";

export const aboutRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.ABOUT,
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">About</h1>
    </>
  ),
});
