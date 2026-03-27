import { createRoute } from "@tanstack/react-router";
import { HealthView } from "../func/health/healthView";
import { Route as rootRoute } from "../router/root";

export const healthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health",
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>
      <HealthView />
    </>
  ),
});
