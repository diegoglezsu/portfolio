import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../lib/posts";

export default function Post() {
  const { slug, "*": rest } = useParams();
  // Support nested slugs like 2025/my-post
  const fullSlug = rest ? `${slug}/${rest}` : (slug ?? "");

  const post = getPostBySlug(fullSlug);

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
    </div>
  );
}
