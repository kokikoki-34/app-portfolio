import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../../router/langRoute";
import { Heading } from "../../shared/components/heading";
import { ROUTE_PATH } from "../../shared/constants/routePath";

export const aboutRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.ABOUT,
  component: () => (
    <>
      <Heading>About</Heading>
    </>
  ),
});
