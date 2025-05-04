import { Suspense } from 'react';
import BlogPostClient from './BlogPostClient';
import client from '../../../../tina/__generated__/client';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Define the expected structure of the fetched Tina data
interface TinaDataProps {
  data: any; // Use a more specific type if available from Tina schema
  query: string;
  variables: { relativePath: string };
}

// Fetch data on the server
async function fetchTinaData(slug: string): Promise<TinaDataProps | null> {
  console.log(`[Server] Fetching data for slug: ${slug}`);
  let data = null;
  let query = '';
  let variables = { relativePath: '' };

  const possibleExtensions = ['.mdx', '.md'];
  for (const ext of possibleExtensions) {
    try {
      variables.relativePath = `${slug}${ext}`;
      console.log(`[Server] Trying path: ${variables.relativePath}`);
      const res = await client.queries.post(variables);
      query = res.query;
      data = res.data;
      variables = res.variables;
      console.log(`[Server] Found post at: ${variables.relativePath}`);
      break; // Found it, exit loop
    } catch (err: any) {
      // If it's a specific "not found" error, log it lightly, otherwise log the full error
      if (err.message?.includes('Unable to find record')) {
        console.log(`[Server] Post not found with extension ${ext}`);
      } else {
        console.error(`[Server] Error fetching post with extension ${ext}:`, err);
        // Optionally re-throw or handle unexpected errors differently
      }
    }
  }

  if (!data) {
    console.log(`[Server] Post not found for slug: ${slug} after trying extensions.`);
    return null; // Indicate not found
  }

  return {
    data,
    query,
    variables,
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  // Explicitly await params resolution before destructuring (though Next.js often handles this implicitly in function calls)
  // const resolvedParams = await params; 
  // const { slug } = resolvedParams; // This is overly verbose and usually not needed

  // Directly access params.slug when calling the async function
  console.log('[Server] Page component received params:', params);
  const slug = params.slug; // Access slug directly
  
  const tinaProps = await fetchTinaData(slug); // Pass the slug to the async fetch function

  if (!tinaProps) {
    notFound(); // Trigger Next.js 404 page
  }

  return (
    // Suspense is less critical here now, but can be kept for client component loading states
    <Suspense fallback={
      <div className="container mx-auto mt-24 px-4">
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      </div>
    }>
      {/* Pass the server-fetched props to the client component */}
      <BlogPostClient {...tinaProps} />
    </Suspense>
  );
}

// Re-enable generateStaticParams if needed for SSG, ensuring it uses the same logic
// export async function generateStaticParams() { ... } 