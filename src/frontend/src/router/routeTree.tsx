import { aboutRoute } from "../pages/about";
import { contactRoute } from "../pages/contact";
import { healthRoute } from "../pages/health";
import { homeRoute } from "../pages/home";
import { worksRoute } from "../pages/works";
import { indexRoute } from "./indexRoute";
import { langRoute } from "./langRoute";
import { rootRoute } from "./rootRoute";

export const RouteTree = rootRoute.addChildren([
  indexRoute,
  langRoute.addChildren([
    healthRoute,
    homeRoute,
    aboutRoute,
    worksRoute,
    contactRoute,
  ]),
]);
