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
    <article className="group py-5 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <Link to={`/posts/${post.slug}`} className="block">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:underline leading-snug mb-1">
          {post.title}
        </h2>
        {post.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2 line-clamp-2">
            {post.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          🗓️ {dateLabel && <span>{dateLabel}</span>}
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.length > 0 && (
            <>
              <span>·</span>
              <span>{post.tags.join(", ")}</span>
            </>
          )}
        </div>
      </Link>
    </article>
  );
}
