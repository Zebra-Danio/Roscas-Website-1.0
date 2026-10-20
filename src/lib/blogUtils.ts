import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content', 'posts');

// Scheduled publishing: a post whose frontmatter date is still in the future is
// left out of production builds entirely (page, index, sitemap, metadata).
// The daily scheduled deploy picks it up on its date. Dev mode shows everything.
export function isPublished(date: string | Date | undefined) {
  if (process.env.NODE_ENV !== 'production') return true;
  if (!date) return true;
  return new Date(date).getTime() <= Date.now();
}

export interface PostFile {
  slug: string;
  filePath: string;
  data: { [key: string]: unknown };
  content: string;
}

// All posts that are published as of this build
export function getPublishedPostFiles(): PostFile[] {
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return [];
  }
  return fs
    .readdirSync(contentDir)
    .filter((file) => /\.(md|mdx)$/.test(file))
    .map((file) => {
      const filePath = path.join(contentDir, file);
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
      return { slug: file.replace(/\.(md|mdx)$/, ''), filePath, data, content };
    })
    .filter((post) => isPublished(post.data.date as string | undefined));
}

export function getPublishedPostFile(slug: string): PostFile | null {
  return getPublishedPostFiles().find((post) => post.slug === slug) || null;
}

// Utility to get all blog slugs for static generation
export async function getAllSlugs() {
  return getPublishedPostFiles().map(({ slug }) => ({ slug }));
}
