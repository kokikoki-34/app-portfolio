import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../router/root";

export const worksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/works",
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Works</h1>
    </>
  ),
});
