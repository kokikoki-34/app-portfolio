interface ErrorContentProps {
  error: Error;
  reset: () => void;
}

export function ErrorContent({ error, reset }: ErrorContentProps) {
  return (
    <div className="text-center py-10">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-6">
        <span className="text-2xl">!</span>
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-4">
        Something went wrong
      </h1>

      <p className="text-foreground-muted mb-8 max-w-sm mx-auto">
        An error happened. Try again later.
        <br />
        <span className="text-xs font-mono opacity-50">{error.message}</span>
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-foreground text-white rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95"
      >
        Try Again
      </button>
    </div>
  );
}
