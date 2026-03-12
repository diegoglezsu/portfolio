import { Outlet } from "react-router-dom";
import Header from "./Header";
import SocialLinks from "./SocialLinks";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 mt-16">
        <div className="max-w-2xl mx-auto px-4 py-6 text-sm text-gray-500 dark:text-gray-500 flex justify-between items-start">
          <div>
            <div>© {new Date().getFullYear()} Diego</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Blog content:{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                className="text-gray-600 dark:text-gray-300 hover:underline"
              >
                CC BY‑SA 4.0
              </a>
              <br />
              Source code:{" "}
              <a
                href="https://opensource.org/licenses/MIT"
                className="text-gray-600 dark:text-gray-300 hover:underline"
              >
                MIT
              </a>
            </div>
          </div>
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}
