import fs from 'fs';
import path from 'path';

// Utility to get all blog slugs for static generation
export async function getAllSlugs() {
  const contentDir = path.join(process.cwd(), 'content', 'posts');
  // Add error handling in case directory doesn't exist
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return [];
  }
  const files = fs.readdirSync(contentDir);
  
  return files.map(file => {
    // Filter out potential non-markdown files if necessary
    if (!file.match(/\.(md|mdx)$/)) {
      return null;
    }
    return {
      slug: file.replace(/\.(md|mdx)$/, '')
    };
  }).filter(Boolean) as { slug: string }[]; // Filter out nulls and assert type
}

// You could add other blog-related utility functions here, e.g., getPostBySlug 