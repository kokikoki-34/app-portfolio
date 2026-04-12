import { createRoute, redirect } from "@tanstack/react-router";
import { HealthView } from "../../func/health/healthView";
import { langRoute } from "../../router/langRoute";
import { rootRoute } from "../../router/rootRoute";
import { Title } from "../../shared/components/headings";
import { isValidLanguage, LANGUAGES } from "../../shared/constants/language";
import { ROUTE_PATH } from "../../shared/constants/routePath";

export const healthRoute = createRoute({
  getParentRoute: () => langRoute,
  path: ROUTE_PATH.HEALTH,
  component: () => (
    <>
      <Title>System Monitoring</Title>
      <HealthView />
    </>
  ),
});

export const healthIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/health",
  beforeLoad: () => {
    const detectedLang = navigator.language.split("-")[0];
    const lang = isValidLanguage(detectedLang) ? detectedLang : LANGUAGES.EN;

    throw redirect({
      to: "/$lang/health",
      params: { lang: lang },
    });
  },
});
