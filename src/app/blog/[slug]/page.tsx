import { notFound } from 'next/navigation';
import { getSinglePost, getPosts, GhostPost } from '@/lib/ghost';
import ViewCounter from '@/components/ViewCounter';
import { Post, Author, Category } from '@/types';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import TableOfContents from '@/components/TableOfContents';
import QuickActions from '@/components/QuickActions';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, User, ChevronRight, Calendar, Share2, Bookmark, Lightbulb, ShieldAlert, ArrowUp } from 'lucide-react';

// Force dynamic rendering - fetch fresh data on each request
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Helper to format content: handles paragraphing for raw text and injects IDs for headings
function formatContent(content: string) {
  if (!content) return '';

  let html = content;

  // Heuristic: Check if content has enough HTML structure.
  // We check for common block-level tags like <p>, <div>, <section>, <ul>, <h1-6>
  const hasBlockTags = /<(p|div|section|ul|ol|h[1-6]|blockquote|figure)/i.test(content);

  if (!hasBlockTags) {
    // If no block tags, it's likely raw text or very simple HTML.
    // We replace single newlines that are likely paragraph breaks if no double newlines exist,
    // or just use double newlines as the primary delimiter.

    // Normalize content to ensure double newlines for clear separation if they are missing but single newlines are present
    const normalized = content.includes('\n\n') ? content : content.replace(/\n/g, '\n\n');

    html = normalized
      .split(/\n\s*\n/)
      .map(p => {
        const trimmed = p.trim();
        if (!trimmed) return '';

        // Handle markdown-style headings
        if (trimmed.startsWith('### ')) return `<h3>${trimmed.slice(4)}</h3>`;
        if (trimmed.startsWith('## ')) return `<h2>${trimmed.slice(3)}</h2>`;
        if (trimmed.startsWith('# ')) return `<h1>${trimmed.slice(2)}</h1>`;

        // Wrap everything else in a paragraph
        return `<p>${trimmed}</p>`;
      })
      .join('');
  }

  // Inject IDs into h2 and h3 for Table of Contents
  return html.replace(/<(h[23])>(.*?)<\/h[23]>/g, (match, tag, text) => {
    const plainText = text.replace(/<[^>]*>/g, '');
    const id = plainText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper to map Ghost Post to internal Post type
function mapGhostPostToPost(ghostPost: GhostPost): Post {
  const author: Author = {
    id: ghostPost.primary_author?.name || 'default',
    name: ghostPost.primary_author?.name || 'EDUNEWS Team',
    slug: ghostPost.primary_author?.name ? ghostPost.primary_author.name.toLowerCase().replace(/\s+/g, '-') : 'edunews-team',
    image: ghostPost.primary_author?.profile_image || '/images/default-author.png',
    title: 'Education Writer',
    bio: '',
  };

  const categories: Category[] = (ghostPost.tags || []).map((tag) => ({
    id: tag.slug || 'uncategorized',
    title: tag.name || 'Uncategorized',
    slug: tag.slug || 'uncategorized',
    description: '',
  }));

  return {
    _id: ghostPost.id || 'unknown',
    id: ghostPost.id || 'unknown',
    _createdAt: ghostPost.created_at || new Date().toISOString(),
    title: ghostPost.title || 'Untitled',
    description: ghostPost.custom_excerpt || ghostPost.excerpt || '',
    slug: ghostPost.slug || 'untitled',
    body: ghostPost.html || '',
    content: ghostPost.html || '',
    mainImage: {
      url: ghostPost.feature_image || '',
      alt: ghostPost.title || 'Post Image',
    },
    author,
    publishedAt: ghostPost.published_at || new Date().toISOString(),
    updatedAt: ghostPost.updated_at || new Date().toISOString(),
    categories,
    readTime: ghostPost.reading_time || 5,
    comments: [], // Initialize empty
    status: 'published'
  };
}

// Helper function to extract slug string from union type
function getSlugString(slug: string | { _type: string; current: string;[key: string]: any }): string {
  return typeof slug === 'string' ? slug : slug.current;
}

// Get the specific post data from Ghost only
async function getPost(slug: string): Promise<Post | null> {
  try {
    const ghostPost = await getSinglePost(slug);
    if (ghostPost) {
      return mapGhostPostToPost(ghostPost);
    }
  } catch (error) {
    console.error('Ghost fetch failed for slug:', slug, error);
  }
  return null;
}

// Get all posts from Ghost for related posts
async function getAllPosts(): Promise<Post[]> {
  try {
    const ghostPosts = await getPosts();
    if (ghostPosts && ghostPosts.length > 0) {
      return ghostPosts.map(mapGhostPostToPost);
    }
  } catch (error) {
    console.error('Ghost fetch failed for all posts:', error);
  }
  return [];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  const posts = await getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <ReadingProgressBar />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center text-sm text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Articles</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-gray-900 font-medium truncate">{post.title}</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="mb-12">
          {post.categories && post.categories.length > 0 && (
            <div className="flex gap-2 mb-6">
              {post.categories.map(cat => (
                <span key={cat.id} className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-serif font-black text-gray-900 mb-8 leading-[1.1] tracking-tight decoration-blue-600/10">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100 text-gray-600">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image
                  src={post.author.image || '/images/default-author.png'}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span className="font-semibold text-gray-900">{post.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime || 5} min read</span>
            </div>

            <div className="flex items-center gap-2">
              <ViewCounter 
                slug={getSlugString(post.slug)} 
                initialViews={(post as any).views || 0}
              />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.mainImage?.url && (
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative aspect-video rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src={post.mainImage.url}
                alt={post.mainImage.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              />
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="flex-1 min-w-0">
            {/* Executive Summary / Key Takeaways */}
            {post.excerpt && (
              <div className="mb-14">
                <div className="bg-white border border-blue-100 rounded-2xl p-8 md:p-10 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-blue-900 font-serif font-black uppercase tracking-[0.2em] text-xs">Executive Summary</span>
                    <div className="h-px flex-1 bg-blue-100" />
                  </div>
                  <div className="text-gray-900 leading-relaxed font-serif text-xl italic font-medium">
                    "{post.excerpt}"
                  </div>
                </div>
              </div>
            )}

            <div className="prose prose-lg prose-blue max-w-none 
              prose-headings:font-serif prose-headings:font-black prose-headings:text-gray-900
              prose-p:font-serif prose-p:text-gray-800 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-10
              prose-a:text-blue-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-3xl prose-img:shadow-2xl
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:font-serif prose-blockquote:italic
              font-serif">
              <div
                className="text-gray-800"
                dangerouslySetInnerHTML={{ __html: formatContent(post.body || '') }}
              />

              {/* Newsletter CTA Block */}
              {/* <div className="my-12">
                <NewsletterBlock />
              </div> */}


              {/* Author Footer Card */}
              <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 shadow-lg">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0 border-4 border-blue-100">
                  <Image
                    src={post.author.image || '/images/default-author.png'}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Featured Author</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{post.author.name}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {post.author.bio || "Passionate education writer sharing insights on Kenyan education, teaching strategies, and learning resources. Dedicated to empowering students and educators."}
                  </p>
                </div>
              </div>             
            </div>
          </div>

          {/* Sticky Sidebars - Desktop */}
          <div className="hidden lg:flex flex-col gap-8 sticky top-24 self-start">
            <TableOfContents contentHtml={post.body || ''} />
            <QuickActions variant="sidebar" />
          </div>
        </div>

        {/* Related articles */}
        <div className="mt-24 pt-16 border-t border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">More to Read</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).filter(p => getSlugString(p.slug) !== slug).map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${getSlugString(relatedPost.slug)}`}
                className="group"
              >
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={relatedPost.mainImage.url}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>{relatedPost.readTime || 5} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
