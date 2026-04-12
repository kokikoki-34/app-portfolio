import { BaseLink } from "./baseLink";

export function NotFoundContent() {
  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4">404</h1>
      <p className="text-foreground-muted mb-8">Page Not Found</p>
      <BaseLink to="/" className="underline">
        Go home
      </BaseLink>
    </div>
  );
}
