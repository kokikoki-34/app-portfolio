import { createRoute } from "@tanstack/react-router";
import { langRoute } from "../../router/langRoute";
import { Title } from "../../shared/components/headings";
import { ROUTE_PATH } from "../../shared/constants/routePath";

export const contactRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.CONTACT,
  component: () => (
    <>
      <Title>Contact</Title>
    </>
  ),
});
