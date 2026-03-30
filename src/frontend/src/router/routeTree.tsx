import { aboutRoute } from "../pages/about/about";
import { contactRoute } from "../pages/contact/contact";
import { healthRoute } from "../pages/health/health";
import { homeRoute } from "../pages/home/home";
import { worksRoute } from "../pages/works/works";
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
