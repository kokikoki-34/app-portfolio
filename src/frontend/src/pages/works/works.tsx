import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../../router/langRoute";
import { Heading } from "../../shared/components/heading";
import { ROUTE_PATH } from "../../shared/constants/routePath";

export const worksRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.WORKS,
  component: () => (
    <>
      <Heading>Works</Heading>
    </>
  ),
});
