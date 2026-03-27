import { createRoute } from "@tanstack/react-router";
import { HealthView } from "../func/health/healthView";
import { langRoute } from "../router/langRoute";
import { ROUTE_PATH } from "../shared/constants/routePath";

export const healthRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.HEALTH,
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>
      <HealthView />
    </>
  ),
});
