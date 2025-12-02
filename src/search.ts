import { join } from "@std/path";
import { parse } from "@std/yaml";
import { YamlData } from "./types.ts";

// Define the search result type
export type SearchResult = {
  url: string;
  title: string;
  date: string;
  excerpt: string;
};

// Search through posts for a given query string
export async function searchPosts(
  postsDirectoryAbsolute: string,
  postsUrl: string,
  query: string,
): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return results;
  }

  for await (const item of Deno.readDir(postsDirectoryAbsolute)) {
    if (item.isFile && item.name !== "index.md" && item.name.endsWith(".md")) {
      const postNoExtension = item.name.slice(0, -3);
      const postUrl = `${postsUrl}${postNoExtension}/`;
      const postDate = `${item.name.slice(0, 4)}-${item.name.slice(4, 6)}-${item.name.slice(6, 8)}`;

      const postContent = await Deno.readTextFile(
        join(postsDirectoryAbsolute, item.name),
      );

      let postTitle = "";
      let bodyContent = postContent;

      // Extract frontmatter and body content
      if (postContent.startsWith("---") && postContent.charAt(3) !== "-") {
        const frontmatterEnd = postContent.indexOf("---", 3);
        if (frontmatterEnd !== -1) {
          const frontmatterData = parse(postContent.slice(3, frontmatterEnd)) as
            | YamlData
            | undefined;
          if (frontmatterData && frontmatterData.title) {
            postTitle = frontmatterData.title as string;
          }
          bodyContent = postContent.slice(frontmatterEnd + 3).trim();
        }
      }

      // Check if query matches title or content
      const titleMatch = postTitle.toLowerCase().includes(normalizedQuery);
      const contentMatch = bodyContent.toLowerCase().includes(normalizedQuery);

      if (titleMatch || contentMatch) {
        const excerpt = generateExcerpt(bodyContent, normalizedQuery);
        results.push({
          url: postUrl,
          title: postTitle,
          date: postDate,
          excerpt,
        });
      }
    }
  }

  // Sort results by date (newest first)
  results.sort((a, b) => b.date.localeCompare(a.date));

  return results;
}

// Excerpt configuration constants
const EXCERPT_CONTEXT_BEFORE = 50;
const EXCERPT_CONTEXT_AFTER = 100;
const EXCERPT_MAX_LENGTH = 150;

// Generate an excerpt around the matched query
function generateExcerpt(content: string, query: string): string {
  const normalizedContent = content.toLowerCase();
  const queryIndex = normalizedContent.indexOf(query);

  if (queryIndex === -1) {
    // Query not found in content, return start of content
    return content.slice(0, EXCERPT_MAX_LENGTH).trim() + (content.length > EXCERPT_MAX_LENGTH ? "..." : "");
  }

  // Calculate excerpt window around the match
  const start = Math.max(0, queryIndex - EXCERPT_CONTEXT_BEFORE);
  const end = Math.min(content.length, queryIndex + query.length + EXCERPT_CONTEXT_AFTER);

  let excerpt = content.slice(start, end).trim();

  // Add ellipsis if needed
  if (start > 0) {
    excerpt = "..." + excerpt;
  }
  if (end < content.length) {
    excerpt = excerpt + "...";
  }

  return excerpt;
}
