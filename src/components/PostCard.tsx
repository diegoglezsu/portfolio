import { Link } from "react-router-dom";
import type { PostMeta } from "../lib/posts";

interface Props {
  post: PostMeta;
}

export default function PostCard({ post }: Props) {
  const dateLabel = post.date
    ? new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <article className="group py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors rounded-lg px-2 -mx-2">
      <Link to={`/posts/${post.slug}`} className="block">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 leading-snug mb-1 transition-colors">
          {post.title}
        </h2>

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-2">
          <span className="flex items-center gap-1">🗓️ {dateLabel}</span>
          <span>·</span>
          <span className="flex items-center gap-1">⏳ {post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex gap-4 mb-3">
          {post.image && (
            <div className="flex-shrink-0 w-40 h-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes("./")) {
                    target.src = target.src.replace("./", "/");
                  } else {
                    target.style.display = "none";
                  }
                }}
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {post.description && (
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2 line-clamp-2">
                {post.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
