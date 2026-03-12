import { useState } from "react";
import PostCard from "../components/PostCard";
import { getAllPosts, type Post } from "../lib/posts";

export default function Search() {
  const [query, setQuery] = useState("");
  const allPosts = getAllPosts();

  const results = query.trim()
    ? allPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  // Group posts by year and then by month
  const groupedPosts = results.reduce<Record<string, Record<string, Post[]>>>(
    (acc, post) => {
      const date = post.date ? new Date(post.date + "T00:00:00") : null;
      const year = date ? date.getFullYear().toString() : "Undated";
      const month = date
        ? date.toLocaleString("en-US", { month: "long" })
        : "Undated";

      if (!acc[year]) acc[year] = {};
      if (!acc[year][month]) acc[year][month] = [];

      acc[year][month].push(post);
      return acc;
    },
    {},
  );

  const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-2xl mx-auto px-4 pt-14 pb-8">
      <header className="mb-10">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 top-3 h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </header>

      {query.trim() === "" ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Start typing to search posts by title.
        </p>
      ) : results.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No posts found matching "{query}".
        </p>
      ) : (
        <>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Found {results.length} post{results.length !== 1 ? "s" : ""}
          </p>

          {years.map((year) => {
            const monthsInYear = Object.keys(groupedPosts[year]);
            // Sort months chronologically reversed
            const sortedMonths = monthsInYear.sort((a, b) => {
              const dateA = new Date(`${a} 1, ${year}`);
              const dateB = new Date(`${b} 1, ${year}`);
              return dateB.getTime() - dateA.getTime();
            });

            return (
              <div key={year} className="mb-10">
                {sortedMonths.map((month) => (
                  <div key={`${year}-${month}`} className="mb-6">
                    <div className="space-y-3">
                      {groupedPosts[year][month].map((post) => (
                        <PostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
