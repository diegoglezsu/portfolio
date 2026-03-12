import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getAdjacentPosts, getPostBySlug } from "../lib/posts";

export default function Post() {
  const { slug, "*": rest } = useParams();
  // Support nested slugs like 2025/my-post
  const fullSlug = rest ? `${slug}/${rest}` : (slug ?? "");

  const post = getPostBySlug(fullSlug);
  const { prev, next } = getAdjacentPosts(fullSlug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Post not found
        </h1>
        <Link to="/posts" className="text-sm text-gray-500 hover:underline">
          ← Back to all posts
        </Link>
      </div>
    );
  }

  const dateLabel = post.date
    ? new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="max-w-2xl mx-auto px-4 pt-12 pb-16">
      {/* Back link */}
      <Link
        to="/posts"
        className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
      >
        ← All posts
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-3">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            {post.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
          {dateLabel && <time dateTime={post.date}>{dateLabel}</time>}
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags.join(", ")}</span>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Back to Top */}
      <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
              clipRule="evenodd"
            />
          </svg>
          Back to Top
        </button>
      </div>

      {/* Navigation, previous and next post */}
      {(prev || next) && (
        <nav className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between gap-8">
          <div className="flex-1">
            {prev && (
              <Link
                to={`/posts/${prev.slug}`}
                className="group flex flex-col gap-1"
              >
                <span className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  <span aria-hidden="true">&#8249;</span> Previous Post
                </span>
                <span className="text-blue-500 group-hover:underline font-medium">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex-1 text-right">
            {next && (
              <Link
                to={`/posts/${next.slug}`}
                className="group flex flex-col gap-1 items-end"
              >
                <span className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  Next Post <span aria-hidden="true">&#8250;</span>
                </span>
                <span className="text-blue-500 group-hover:underline font-medium">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
