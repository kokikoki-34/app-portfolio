import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../router/langRoute";
import { Heading } from "../shared/components/heading";
import { ROUTE_PATH } from "../shared/constants/routePath";

export const contactRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.CONTACT,
  component: () => (
    <>
      <Heading>Contact</Heading>
    </>
  ),
});
