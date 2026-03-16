import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="p-4 flex gap-4 bg-slate-100 border-b">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/health" className="[&.active]:font-bold">
          Health
        </Link>
      </nav>
      <hr />

      <main className="p-4">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  ),
});
