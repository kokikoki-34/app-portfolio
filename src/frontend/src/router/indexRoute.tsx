import { createRoute, redirect } from "@tanstack/react-router";
import { LANGUAGES, type Language } from "../shared/constants/language";
import { rootRoute } from "./rootRoute";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const lang = (navigator.language.split("-")[0] as Language) || LANGUAGES.EN;

    throw redirect({
      to: "/$lang",
      params: { lang: lang },
    });
  },
});
