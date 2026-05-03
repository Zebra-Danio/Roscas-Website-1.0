import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog – Community Savings Insights & Tips',
  description:
    'Read the latest articles on managing your Paluwagan, Ajo, Esusu, or Chama savings circle. Tips, stories, and insights from the Roscas community.',
  openGraph: {
    title: 'Blog – Community Savings Insights & Tips | Roscas',
    description:
      'Tips, stories, and insights on running successful community savings circles from the Roscas team.',
  },
};

// Define a type for posts read from the filesystem
interface FileSystemPost {
  _sys: { filename: string };
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
  // body?: string; // If you were to include body from frontmatter
}

// Server component for static site generation
async function getBlogPosts(): Promise<FileSystemPost[]> {
  // For production builds, use filesystem directly
  if (process.env.NODE_ENV === 'production') {
    try {
      const postsDirectory = path.join(process.cwd(), 'content', 'posts');
      const filenames = fs.readdirSync(postsDirectory);
      
      const allPosts: FileSystemPost[] = filenames.map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        // Return formatted data matching the FileSystemPost interface
        return {
          _sys: {
            filename: filename.replace(/\.(md|mdx)$/, '')
          },
          title: data.title || '',
          date: data.date || '',
          tags: data.tags || [],
          coverImage: data.coverImage || '',
        };
      });
      
      // Sort posts by date (newest first)
      return allPosts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (err) {
      console.error('Error reading blog posts:', err);
      return [];
    }
  }
  
  // For development, let the client component fetch from TinaCMS
  return [];
}

// Client component will handle Tina data in development
export default async function BlogPage() {
  const posts: FileSystemPost[] = await getBlogPosts();
  
  // Group posts by year for SSG mode
  const groupedPosts: {[year: string]: FileSystemPost[]} = {};
  
  if (process.env.NODE_ENV === 'production' && posts.length > 0) {
    posts.forEach(post => {
      const year = new Date(post.date).getFullYear().toString();
      if (!groupedPosts[year]) {
        groupedPosts[year] = [];
      }
      groupedPosts[year].push(post);
    });
  }
  
  // For production builds, render the static content
  if (process.env.NODE_ENV === 'production') {
    return (
      <div className="container mx-auto px-4 pt-24">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">Our Blog</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Insights, updates, and stories from our team
          </p>
        </div>
  
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <p>No blog posts found.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Featured latest post */}
            {posts.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-8 text-3xl font-bold">Latest Post</h2>
                <div className="overflow-hidden rounded-xl border shadow-md transition-shadow hover:shadow-lg">
                  <Link href={`/blog/${posts[0]._sys.filename}`}>
                    <div className="relative aspect-video w-full">
                      <Image
                        src={posts[0].coverImage}
                        alt={posts[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-2xl font-bold">{posts[0].title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {format(new Date(posts[0].date), 'MMMM d, yyyy')}
                      </p>
                      {posts[0].tags && posts[0].tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {posts[0].tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-full bg-secondary px-3 py-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            )}
  
            {/* Archive by year */}
            {Object.entries(groupedPosts).map(([year, yearPosts]) => (
              <div key={year} className="mb-12">
                <h2 className="mb-8 text-2xl font-bold">{year}</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {yearPosts.map(post => (
                    <Link
                      key={post._sys.filename}
                      href={`/blog/${post._sys.filename}`}
                      className="group overflow-hidden rounded-lg border p-4 transition-colors hover:bg-secondary/20"
                    >
                      <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(post.date), 'MMMM d, yyyy')}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // For development, use the dynamic client component
  return <BlogPageClient />;
} 