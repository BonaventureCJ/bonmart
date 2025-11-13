import Link from 'next/link';
// PLACEHOLDER PAGE
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[var(--background)] p-6">
      <div className="p-8 space-y-4 max-w-lg">
        <h1 className="text-6xl font-bold text-[var(--foreground)] dark:text-[var(--foreground)]">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-[var(--neutral-color)]">
          Page Not Found
        </h2>
        <p className="text-[var(--neutral-color)]">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 mt-4 text-[var(--background)] bg-brand rounded-lg font-medium hover:bg-[var(--neutral-color)] sync-transition focus-ring-dual"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
