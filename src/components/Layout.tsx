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
        <div className="max-w-2xl mx-auto px-4 py-6 text-sm text-gray-500 dark:text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} Diego</span>
          <SocialLinks />
        </div>
      </footer>
    </div>
  );
}
