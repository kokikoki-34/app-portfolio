import { createRoute } from "@tanstack/react-router";
import { HealthView } from "../func/health/healthView";
import { rootRoute } from "../router/root";
import { ROUTES } from "../shared/constants/routes";

export const healthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.HEALTH,
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>
      <HealthView />
    </>
  ),
});
