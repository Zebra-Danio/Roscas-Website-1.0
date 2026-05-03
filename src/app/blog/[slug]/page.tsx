import { Suspense } from 'react';
import BlogPostClient from './BlogPostClient';
import BlogPostStatic from './BlogPostStatic';
import client from '../../../../tina/__generated__/client';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import type { PostQuery } from '../../../../tina/__generated__/types';
import type { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import { getAllSlugs } from '@/lib/blogUtils';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function readPostFrontmatter(slug: string) {
  const contentDir = path.join(process.cwd(), 'content', 'posts');
  const extensions = ['.md', '.mdx'];
  for (const ext of extensions) {
    const filePath = path.join(contentDir, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      return matter(raw);
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = readPostFrontmatter(slug);
  if (!parsed) return {};

  const { data: fm, content } = parsed;
  const title = (fm.title || slug).trim();
  const description =
    content
      .replace(/---[\s\S]*?---/, '')
      .replace(/[#*\[\]()_`>|]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 155) + '…';

  return {
    title,
    description,
    keywords: fm.tags || [],
    openGraph: {
      type: 'article',
      title,
      description,
      publishedTime: fm.date ? new Date(fm.date).toISOString() : undefined,
      tags: fm.tags,
      images: fm.coverImage
        ? [{ url: fm.coverImage, alt: title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: fm.coverImage ? [fm.coverImage] : [],
    },
  };
}

// Define the expected structure of the data passed to the client
interface TinaClientData {
  post: {
    title: string;
    date: string;
    tags: string[]; // Ensure tags is always string[]
    coverImage: string;
    body: TinaMarkdownContent | string; // Use union type here too
    _sys: { filename: string };
    id?: string; // id might be used by BlogPostClient from Tina's Post
  };
}

interface TinaDataProps {
  data: TinaClientData; 
  query: string;
  variables: { relativePath: string };
}

// Fetch data based on environment
async function fetchTinaData(slug: string): Promise<TinaDataProps | null> {
  if (process.env.NODE_ENV === 'production') {
    try {
      const contentDir = path.join(process.cwd(), 'content', 'posts');
      let filePath = '';
      if (fs.existsSync(path.join(contentDir, `${slug}.md`))) {
        filePath = path.join(contentDir, `${slug}.md`);
      } else if (fs.existsSync(path.join(contentDir, `${slug}.mdx`))) {
        filePath = path.join(contentDir, `${slug}.mdx`);
      } else {
        return null;
      }
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      const postDataForClient: TinaClientData['post'] = {
        title: frontmatter.title || '',
        date: frontmatter.date || '',
        tags: frontmatter.tags || [], // Ensure tags is string[]
        coverImage: frontmatter.coverImage || '',
        body: content, // content is string, matches union type
        _sys: { filename: slug },
      };
      return {
        data: { post: postDataForClient },
        query: '', 
        variables: { relativePath: path.basename(filePath) }
      };
    } catch (err) {
      console.error(`Error reading markdown file for slug: ${slug}`, err);
      return null;
    }
  } else {
    // Development mode: use Tina client
    let tinaQueryResult: PostQuery | null = null;
    let query = '';
    let variables = { relativePath: '' };

    const possibleExtensions = ['.mdx', '.md'];
    for (const ext of possibleExtensions) {
      try {
        variables.relativePath = `${slug}${ext}`;
        const res = await client.queries.post(variables); 
        query = res.query;
        tinaQueryResult = res.data; 
        variables = res.variables;
        break; 
      } catch (err: unknown) { 
        if (err instanceof Error && err.message?.includes('Unable to find record')) {
          // console.log(`[Server] Post not found with extension ${ext}`);
        } else {
          // console.error(`[Server] Error fetching post with extension ${ext}:`, err);
        }
      }
    }

    if (!tinaQueryResult || !tinaQueryResult.post) {
      return null; 
    }

    const tinaPost = tinaQueryResult.post; // This is Tina's Post type
    const postForClient: TinaClientData['post'] = {
      id: tinaPost.id, // Pass id
      title: tinaPost.title,
      date: tinaPost.date,
      tags: tinaPost.tags?.filter(Boolean) as string[] || [], // Handle optional tags and ensure string[]
      coverImage: tinaPost.coverImage,
      body: tinaPost.body, // tinaPost.body is likely TinaMarkdownContent, matches union type
      _sys: { filename: tinaPost._sys.filename }, 
    };

    return {
      data: { post: postForClient },
      query,
      variables,
    };
  }
}

// Generate static paths at build time
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllSlugs();
  return slugs;
}

export default async function BlogPostPage({ params }: Props): Promise<React.ReactElement> {
  const resolvedParams = await params; // Await params before accessing
  const slug = resolvedParams.slug;
  const tinaProps = await fetchTinaData(slug);

  if (!tinaProps) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {process.env.NODE_ENV === 'production' ? (
        <BlogPostStatic data={tinaProps.data} />
      ) : (
        // Pass full props needed by useTina
        <BlogPostClient data={tinaProps.data} query={tinaProps.query} variables={tinaProps.variables} />
      )}
    </Suspense>
  );
} 