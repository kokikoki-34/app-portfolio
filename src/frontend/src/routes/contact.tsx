import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
    </>
  ),
});
