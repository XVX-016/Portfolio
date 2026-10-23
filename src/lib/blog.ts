export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  cover?: string;
  content: string;
  readingTime: string;
  draft?: boolean;
}

// Vite glob import of raw markdown files
const rawPosts = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Lightweight browser-safe frontmatter parser (avoids Node.js Buffer dependency)
function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent };
  }

  const yamlBlock = match[1];
  const markdownBody = match[2];
  const data: Record<string, any> = {};

  yamlBlock.split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;

    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();

    // Remove quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    // Handle booleans
    if (val === "true") {
      data[key] = true;
      return;
    }
    if (val === "false") {
      data[key] = false;
      return;
    }

    // Handle YAML arrays like tags: ["Graphics", "Vulkan"]
    if (val.startsWith("[") && val.endsWith("]")) {
      data[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = val;
    }
  });

  return { data, content: markdownBody };
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in rawPosts) {
    const rawContent = rawPosts[path];
    const { data, content } = parseFrontmatter(rawContent);
    const slug = path.split("/").pop()?.replace(/\.md$/, "") || "";

    const isDraft = data.draft === true;
    if (!includeDrafts && isDraft) {
      continue;
    }

    posts.push({
      slug,
      title: data.title || "Untitled",
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || [],
      cover: data.cover,
      content,
      readingTime: calculateReadingTime(content),
      draft: isDraft,
    });
  }

  // Sort descending by date
  return posts.sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));
}

export function getPostBySlug(slug: string, includeDrafts = true): BlogPost | undefined {
  const all = getAllPosts(includeDrafts);
  return all.find((p) => p.slug === slug);
}
