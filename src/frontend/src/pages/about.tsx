import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../router/root";
import { ROUTES } from "../shared/constants/routes";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ABOUT,
  component: () => (
    <>
      <h1 className="text-2xl font-bold mb-6">About</h1>
    </>
  ),
});
