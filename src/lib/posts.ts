// Loads all Markdown files from src/posts/ at build time via Vite's import.meta.glob.
// Each file's frontmatter is parsed manually (gray-matter is a Node tool, so we do
// a lightweight regex parse that's safe for the browser).

export interface PostMeta {
  slug: string;
  title: string;
  date: string; // ISO string, e.g. "2025-12-17"
  description: string;
  readingTime: string; // e.g. "4 min read"
  tags: string[];
  draft?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

// Eagerly load every .md file under src/posts/
const modules = import.meta.glob("../posts/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(raw: string): {
  meta: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const meta: Record<string, string> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Strip surrounding quotes
    value = value.replace(/^["']|["']$/g, "");
    meta[key] = value;
  }

  return { meta, content };
}

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  // Support both  tags: [a, b]  and  tags: a, b
  return raw
    .replace(/[\[\]]/g, "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function slugFromPath(path: string): string {
  // ../posts/2025/my-post.md  →  2025/my-post
  return path.replace(/^.*posts\//, "").replace(/\.md$/, "");
}

function buildPost(path: string, raw: string): Post {
  const { meta, content } = parseFrontmatter(raw);
  const slug = slugFromPath(path);
  return {
    slug,
    title: meta.title ?? slug,
    date: meta.date ?? "",
    description: meta.description ?? "",
    readingTime: estimateReadingTime(content),
    tags: parseTags(meta.tags),
    draft: meta.draft === "true",
    content,
  };
}

let _allPosts: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (_allPosts) return _allPosts;

  _allPosts = Object.entries(modules)
    .map(([path, raw]) => buildPost(path, raw as string))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return _allPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  // posts are sorted newest-first, so "previous" = idx + 1, "next" = idx - 1
  const prev = idx + 1 < posts.length ? posts[idx + 1] : null;
  const next = idx - 1 >= 0 ? posts[idx - 1] : null;
  return { prev, next };
}
