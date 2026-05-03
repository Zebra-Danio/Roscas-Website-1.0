'use client';

import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown, TinaMarkdownContent } from 'tinacms/dist/rich-text';
import BlogCTA from '@/components/blog-cta';

// Interface for the props this component receives from the server component
interface TinaDataProps {
  data: any; // useTina handles the exact shape
  variables: { relativePath: string };
  query: string;
}

const BlogPostClient = (props: TinaDataProps) => {
  // In development, always use useTina to enable live editing
  const { data } = useTina(props);

  // Data structure comes from useTina hook
  const postData = data?.post;

  if (!postData) {
    // Basic loading/error state if needed, though useTina might handle this
    return (
      <div className="container mx-auto mt-24 px-4">
        <div className="py-20 text-center">Loading or post not found...</div>
      </div>
    );
  }

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
              {postData.tags.filter((tag: string | null | undefined): tag is string => !!tag).map((tag: string) => (
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
        <TinaMarkdown content={postData.body as TinaMarkdownContent} />
      </div>

      <div className="mx-auto max-w-prose">
        <BlogCTA />
      </div>
    </article>
  );
};

export default BlogPostClient; 