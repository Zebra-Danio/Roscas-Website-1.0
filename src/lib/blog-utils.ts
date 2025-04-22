import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { execSync } from 'child_process';

// Types
export interface PostFrontMatter {
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
}

export interface PostMetadata extends PostFrontMatter {
  slug: string;
  content: string;
  lastUpdated?: string;
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/posts');

// Get all post slugs
export function getPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(POSTS_DIRECTORY);
    return fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(fileName => fileName.replace(/\.mdx?$/, ''));
  } catch (error) {
    console.error('Error reading post directory:', error);
    return [];
  }
}

// Get post content by slug
export function getPostBySlug(slug: string): PostMetadata | null {
  try {
    const fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    
    // If file doesn't exist with .mdx extension, try .md
    if (!fs.existsSync(fullPath)) {
      const mdPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
    }
    
    // Get file path that exists
    const filePath = fs.existsSync(fullPath) 
      ? fullPath 
      : path.join(POSTS_DIRECTORY, `${slug}.md`);
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Get the last updated date from git
    let lastUpdated: string | undefined;
    try {
      const gitOutput = execSync(
        `git log -1 --pretty=format:%cd --date=iso ${filePath}`
      ).toString();
      lastUpdated = format(new Date(gitOutput), 'MMMM d, yyyy');
    } catch (error) {
      console.warn(`Could not get git history for ${slug}:`, error);
    }
    
    return {
      slug,
      content,
      lastUpdated,
      ...(data as PostFrontMatter)
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all posts metadata sorted by date
export function getAllPosts(): PostMetadata[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is PostMetadata => post !== null)
    .sort((post1, post2) => 
      new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );
  
  return posts;
}

// Group posts by year for archive
export function getPostsByYear(): Record<string, PostMetadata[]> {
  const posts = getAllPosts();
  const groupedPosts: Record<string, PostMetadata[]> = {};
  
  posts.forEach(post => {
    const year = new Date(post.date).getFullYear().toString();
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }
    groupedPosts[year].push(post);
  });
  
  // Sort years in descending order
  return Object.entries(groupedPosts)
    .sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
    .reduce((acc, [year, posts]) => ({
      ...acc,
      [year]: posts
    }), {});
} 