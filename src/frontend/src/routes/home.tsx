import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <div className="py-10">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
      <p>welcome!</p>
    </div>
  ),
});
