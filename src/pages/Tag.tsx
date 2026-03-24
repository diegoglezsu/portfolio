import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getPostsByTag, type Post } from "../lib/posts";

export default function Tag() {
  const { tag } = useParams();
  const decodedTag = tag ? decodeURIComponent(tag) : "";
  const posts = getPostsByTag(decodedTag);

  // Group posts by year and then by month
  const groupedPosts = posts.reduce<Record<string, Record<string, Post[]>>>(
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
      <Link
        to="/posts"
        className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
      >
        ← Back to all posts
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Posts tagged with <span className="text-blue-500">#{decodedTag}</span>
        </h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No posts found with tag "{decodedTag}".
        </p>
      ) : (
        years.map((year) => {
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
        })
      )}
    </div>
  );
}
