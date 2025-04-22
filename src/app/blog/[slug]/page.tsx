'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';

// This client will be generated after TinaCMS initialization
// We'll need to handle the case where it might not exist yet
let client: any;
try {
  client = require('../../../../tina/__generated__/client').default;
} catch (error) {
  console.warn('Tina client not found. Make sure to run the dev server first.');
}

interface PostPageProps {
  params: {
    slug: string;
  };
}

interface PostEdge {
  node?: {
    _sys: {
      filename: string;
    };
  };
}

export default function BlogPostPage({ params }: PostPageProps) {
  const { slug } = params;
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      if (!client) {
        setError('TinaCMS client not initialized. Please run the dev server.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const tinaData = await client.queries.post({ relativePath: `${slug}.mdx` });
        setPost(tinaData);
        setError(null);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load the blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto mt-24 px-4">
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto mt-24 px-4">
        <div className="py-20 text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-4">{error || 'Blog post not found'}</p>
          <Link href="/blog" className="mt-6 inline-block text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { data } = useTina({
    query: post.query,
    variables: post.variables,
    data: post.data,
  });

  const postData = data.post;
  const formattedDate = format(new Date(postData.date), 'MMMM d, yyyy');

  return (
    <article className="container mx-auto mt-24 px-4">
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
              {postData.tags.map((tag: string) => (
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
}

export async function generateStaticParams() {
  // This function is called at build time to pre-render paths
  if (!client) return [];
  
  try {
    const postsConnection = await client.queries.postConnection();
    return postsConnection.data.postConnection.edges?.map((edge: PostEdge) => ({
      slug: edge?.node?._sys.filename,
    })) || [];
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
} 