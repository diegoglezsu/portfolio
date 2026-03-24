import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
        Page not found 😵
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        The page you are looking for does not exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <div>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md shadow-sm hover:opacity-90"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
