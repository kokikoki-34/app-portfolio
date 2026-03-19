import { Link } from "@tanstack/react-router";

export function NotFoundComponent() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-black mb-4">404</h1>
      <p className="text-muted mb-8">Page Not Found</p>
      <Link to="/" className="text-accent font-bold underline">
        Go Home
      </Link>
    </div>
  );
}
