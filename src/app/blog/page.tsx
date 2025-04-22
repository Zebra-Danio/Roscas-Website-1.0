'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

// This client will be generated after TinaCMS initialization
// We'll need to handle the case where it might not exist yet
interface TinaClient {
  queries: {
    postConnection: () => Promise<any>;
  }
}

let client: TinaClient | null = null;
try {
  // Using dynamic import to avoid require
  import('../../../tina/__generated__/client')
    .then(module => {
      client = module.default;
    })
    .catch(() => {
      console.warn('Tina client not found. Make sure to run the dev server first.');
    });
} catch (err) {
  console.warn('Tina client not found. Make sure to run the dev server first.');
}

interface Post {
  _sys: {
    filename: string;
  };
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
}

interface PostEdge {
  node?: Post;
}

interface YearGroupedPosts {
  [year: string]: Post[];
}

export default function BlogPage() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [groupedPosts, setGroupedPosts] = React.useState<YearGroupedPosts>({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPosts = async () => {
      if (!client) {
        setError('TinaCMS client not initialized. Please run the dev server.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await client.queries.postConnection();
        const allPosts = result.data.postConnection.edges?.map((edge: PostEdge) => edge?.node) || [];
        
        // Sort posts by date (newest first)
        const sortedPosts = [...allPosts].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setPosts(sortedPosts);
        
        // Group posts by year
        const grouped: YearGroupedPosts = {};
        sortedPosts.forEach(post => {
          const year = new Date(post.date).getFullYear().toString();
          if (!grouped[year]) {
            grouped[year] = [];
          }
          grouped[year].push(post);
        });
        
        // Sort years in descending order
        const sortedGrouped = Object.fromEntries(
          Object.entries(grouped).sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
        );
        
        setGroupedPosts(sortedGrouped);
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (client) {
      fetchPosts();
    } else {
      const timer = setTimeout(() => {
        // Wait for dynamic import to complete
        if (client) {
          fetchPosts();
        } else {
          setError('TinaCMS client not initialized. Please run the dev server.');
          setLoading(false);
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">Our Blog</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Insights, updates, and stories from our team
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      ) : posts.length === 0 ? (
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
                        {posts[0].tags.map(tag => (
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