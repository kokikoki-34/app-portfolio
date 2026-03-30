import { createRoute, redirect } from "@tanstack/react-router";
import { isValidLanguage, LANGUAGES } from "../shared/constants/language";
import { rootRoute } from "./rootRoute";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const detectedLang = navigator.language.split("-")[0];
    const lang = isValidLanguage(detectedLang) ? detectedLang : LANGUAGES.EN;

    throw redirect({
      to: "/$lang",
      params: { lang: lang },
    });
  },
});
