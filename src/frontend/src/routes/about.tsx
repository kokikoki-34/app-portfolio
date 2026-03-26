import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">About</h1>
    </>
  ),
});
