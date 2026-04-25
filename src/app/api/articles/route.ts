import { NextRequest, NextResponse } from 'next/server';
import { getPosts, getSinglePost, GhostPost } from '@/lib/ghost';
import { Post, Author, Category } from '@/types';

// Helper to map Ghost Post to internal Post type
function mapGhostPostToPost(ghostPost: GhostPost): Post {
  const author: Author = {
    id: ghostPost.primary_author?.name || 'default',
    name: ghostPost.primary_author?.name || 'EDU NEWS',
    slug: ghostPost.primary_author?.name ? ghostPost.primary_author.name.toLowerCase().replace(/\s+/g, '-') : 'edunews',
    image: ghostPost.primary_author?.profile_image || '/images/default-author.png',
    title: 'Educator',
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const ghostPost = await getSinglePost(slug);
      if (!ghostPost) {
        return NextResponse.json(
          { success: false, error: 'Article not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: mapGhostPostToPost(ghostPost),
        message: 'Article fetched successfully'
      });
    } else {
      const ghostPosts = await getPosts();
      const mappedPosts = ghostPosts.map(mapGhostPostToPost);

      return NextResponse.json({
        success: true,
        data: {
          results: mappedPosts,
          count: mappedPosts.length
        },
        message: 'Articles fetched successfully'
      });
    }
  } catch (error) {
    console.error('Error fetching articles from Ghost:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch articles from Ghost backend',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
