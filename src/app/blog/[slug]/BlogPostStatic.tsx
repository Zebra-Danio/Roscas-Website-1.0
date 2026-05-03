import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import BlogCTA from '@/components/blog-cta';

// Matches the TinaClientData interface from page.tsx
interface StaticPostData {
  post: {
    title: string;
    date: string;
    tags: string[];
    coverImage: string;
    body: TinaMarkdownContent | string; // Will be string in production
    _sys: { filename: string };
    id?: string;
    [key: string]: any;
  };
}

interface BlogPostStaticProps {
  data: StaticPostData;
  // query and variables are not needed for static rendering
}

const BlogPostStatic = ({ data }: BlogPostStaticProps) => {
  if (!data?.post) {
    return (
      <div className="container mx-auto mt-24 px-4">
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-4">Blog post data is not available.</p>
          <Link href="/blog" className="mt-6 inline-block text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const postData = data.post;
  const formattedDate = format(new Date(postData.date), 'MMMM d, yyyy');

  return (
    <article className="container mx-auto px-4 pt-24">
      <Link href="/blog" className="mb-6 mt-8 inline-block text-primary hover:underline">
        ← Back to all posts
      </Link>
      
      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl">
        <Image
          src={postData.coverImage}
          alt={postData.title}
          fill
          priority
          className="object-cover"
        />
      </div>
      
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{postData.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={postData.date}>{formattedDate}</time>
          
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {postData.tags.filter((tag): tag is string => !!tag).map((tag: string) => (
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
      </div>
      
      <div className="prose prose-lg mx-auto max-w-prose dark:prose-invert">
        <ReactMarkdown>{typeof postData.body === 'string' ? postData.body : ''}</ReactMarkdown>
      </div>

      <div className="mx-auto max-w-prose">
        <BlogCTA />
      </div>
    </article>
  );
};

export default BlogPostStatic; 