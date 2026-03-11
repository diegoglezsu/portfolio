import PostCard from "../components/PostCard";
import { getAllPosts, type Post } from "../lib/posts";

export default function Posts() {
  const posts = getAllPosts();

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
      <header className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          All Posts
        </h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No posts yet. Add Markdown files to{" "}
          <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
            src/posts/
          </code>
          .
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

          const totalPostsInYear = Object.values(groupedPosts[year]).flat()
            .length;

          return (
            <section key={year} className="mb-14">
              <div className="flex items-baseline gap-3 border-b border-gray-100 dark:border-gray-800 pb-2 mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {year}
                </h2>
                <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                  {totalPostsInYear}
                </span>
              </div>

              {sortedMonths.map((month) => (
                <div key={month} className="mb-10 last:mb-0">
                  <div className="flex items-baseline gap-2 mb-4">
                    <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200">
                      {month}
                    </h3>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                      {groupedPosts[year][month].length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {groupedPosts[year][month].map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })
      )}
    </div>
  );
}
