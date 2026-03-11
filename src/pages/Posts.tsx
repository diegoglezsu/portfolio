import PostCard from "../components/PostCard";
import { getAllPosts } from "../lib/posts";

export default function Posts() {
  const posts = getAllPosts();

  // Group posts by year
  const byYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = post.date ? post.date.slice(0, 4) : "Undated";
    (acc[year] ??= []).push(post);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-2xl mx-auto px-4 pt-14 pb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-10">
        All Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No posts yet. Add Markdown files to{" "}
          <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
            src/posts/
          </code>
          .
        </p>
      ) : (
        years.map((year) => (
          <section key={year} className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
              {year}
            </h2>
            {byYear[year].map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </section>
        ))
      )}
    </div>
  );
}
