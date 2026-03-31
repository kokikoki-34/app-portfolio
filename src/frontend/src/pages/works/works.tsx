import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../../router/langRoute";
import { Title } from "../../shared/components/headings";
import { ROUTE_PATH } from "../../shared/constants/routePath";

export const worksRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.WORKS,
  component: () => (
    <>
      <Title>Works</Title>
    </>
  ),
});
