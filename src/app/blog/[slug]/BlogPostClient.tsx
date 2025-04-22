'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';

// Interfaces matching the data structure fetched on the server
interface TinaPost {
  title: string;
  date: string;
  tags: string[] | null | undefined;
  coverImage: string;
  body: TinaMarkdownContent;
}

interface TinaData {
  data: {
    post: TinaPost;
  };
  variables: { relativePath: string };
  query: string;
}

// Component props now directly accept the Tina data structure
const BlogPostClient = (props: TinaData) => {
  console.log('[Client] Received props:', props);

  // Directly use the props with useTina
  const { data } = useTina(props);

  // Handle case where data might not be ready or is invalid (though server should handle notFound)
  if (!data?.post) {
    console.log('[Client] Data or data.post is missing');
    // You could show a specific error or loading state here if needed
    // but typically the server component's notFound should handle this.
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

  // Format date after we're sure postData exists
  const formattedDate = format(new Date(postData.date), 'MMMM d, yyyy');

  return (
    <article className="container mx-auto px-4 pt-24">
      <Link href="/blog" className="mb-6 mt-8 inline-block text-primary hover:underline">
        ← Back to all posts
      </Link>
      
      {/* Cover Image */}
      <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl">
        <Image
          src={postData.coverImage}
          alt={postData.title}
          fill
          priority
          className="object-cover"
        />
      </div>
      
      {/* Post Header */}
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">{postData.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={postData.date}>{formattedDate}</time>
          
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {/* Ensure tag is treated as string, filtering out null/undefined if necessary */}
              {postData.tags.filter((tag): tag is string => tag !== null && tag !== undefined).map((tag: string) => (
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
      
      {/* Post Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <TinaMarkdown content={postData.body} />
      </div>
    </article>
  );
};

export default BlogPostClient; 