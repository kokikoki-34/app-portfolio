import { createRoute } from "@tanstack/react-router";
import { HealthView } from "../../func/health/healthView";
import { langRoute } from "../../router/langRoute";
import { Heading } from "../../shared/components/heading";
import { ROUTE_PATH } from "../../shared/constants/routePath";

export const healthRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.HEALTH,
  component: () => (
    <>
      <Heading>System Monitoring </Heading>
      <HealthView />
    </>
  ),
});
