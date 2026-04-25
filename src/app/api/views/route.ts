import { NextRequest, NextResponse } from 'next/server';
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const VIEWS_KEY_PREFIX = "post:views:";

// Get views for a post from Redis
async function getViews(slug?: string, postId?: string) {
  const docId = slug || postId;
  if (!docId) {
    throw new Error('Valid slug or postId is required');
  }

  const key = `${VIEWS_KEY_PREFIX}${docId}`;
  const count = await redis.get(key) as number | null;
  
  return {
    success: true,
    views: count || 0,
    message: count ? 'View count retrieved' : 'No views recorded yet'
  };
}

// Increment views for a post in Redis
async function incrementViews(slug?: string, postId?: string) {
  const docId = slug || postId;
  if (!docId) {
    throw new Error('Valid slug or postId is required');
  }

  const key = `${VIEWS_KEY_PREFIX}${docId}`;
  const newCount = await redis.incr(key);
  
  return {
    success: true,
    views: newCount,
    message: 'View count updated'
  };
}

export async function POST(request: NextRequest) {
  try {
    const { slug, postId } = await request.json();

    if (!slug && !postId) {
      return NextResponse.json(
        { success: false, error: 'Slug or postId is required' },
        { status: 400 }
      );
    }

    const result = await incrementViews(slug, postId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating view count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update view count' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const postId = searchParams.get('postId');

    if (!slug && !postId) {
      return NextResponse.json(
        { success: false, error: 'Slug or postId is required for views fetch' },
        { status: 400 }
      );
    }

    const result = await getViews(slug || undefined, postId || undefined);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
