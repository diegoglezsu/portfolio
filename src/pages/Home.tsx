import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import SocialLinks from "../components/SocialLinks";
import { HOME_POST_LIMIT, SITE } from "../config";
import { getAllPosts } from "../lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, HOME_POST_LIMIT);

  return (
    <div className="max-w-2xl mx-auto px-4 pt-16 pb-8">
      {/* Hero */}
      <section className="mb-14 flex items-center gap-10">
        <img
          src={`${import.meta.env.BASE_URL}profile.jpg`}
          alt={SITE.name}
          className="w-36 h-40 rounded-full object-cover shrink-0"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Hi, I'm {SITE.handle} 👋.
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
            {SITE.tagline}
          </p>
          <SocialLinks />
        </div>
      </section>

      {/* Recent posts */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          Recent posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No posts yet. Add Markdown files to{" "}
            <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">
              src/posts/
            </code>
            .
          </p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}

        {getAllPosts().length > HOME_POST_LIMIT && (
          <Link
            to="/posts"
            className="inline-block mt-6 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            All posts →
          </Link>
        )}
      </section>
    </div>
  );
}
