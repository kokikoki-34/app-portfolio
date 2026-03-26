// src/main.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";

import { Route as rootRoute } from "./routes/__root";
import { aboutRoute } from "./routes/about";
import { contactRoute } from "./routes/contact";
import { healthRoute } from "./routes/health";
import { homeRoute } from "./routes/home";
import { worksRoute } from "./routes/works";

const routeTree = rootRoute.addChildren([
  healthRoute,
  homeRoute,
  aboutRoute,
  worksRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
