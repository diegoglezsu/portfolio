import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { SITE } from "../config";

function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {dark ? (
        // Sun icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m8.66-9H21M3 12H2m15.07-6.07l-.71.71M7.64 17.36l-.7.7M18.36 17.36l-.7-.7M6.34 6.93l-.7-.71M12 5a7 7 0 100 14A7 7 0 0012 5z"
          />
        </svg>
      ) : (
        // Moon icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${
    isActive
      ? "text-gray-900 dark:text-gray-100"
      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-semibold text-gray-900 dark:text-gray-100 hover:opacity-75 transition-opacity"
          >
            {SITE.name}
          </Link>
          <nav className="flex items-center gap-6">
            <NavLink to="/posts" className={navLinkClass}>
              Posts
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 mt-16">
        <div className="max-w-2xl mx-auto px-4 py-6 text-sm text-gray-500 dark:text-gray-500 flex justify-between">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <a
            href={SITE.url}
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {SITE.url.replace(/^https?:\/\//, "")}
          </a>
        </div>
      </footer>
    </div>
  );
}
