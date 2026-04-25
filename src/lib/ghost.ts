import GhostContentAPI from '@tryghost/content-api';

// Check if Ghost API is configured
const isGhostConfigured = !!(process.env.NEXT_PUBLIC_GHOST_API_URL && process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY);

// Create API instance with site credentials
const api = new GhostContentAPI({
    url: process.env.NEXT_PUBLIC_GHOST_API_URL || 'http://localhost:2368',
    key: process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || '',
    version: "v5.0"
});

export interface GhostPost {
    id?: string;
    uuid?: string;
    title?: string;
    slug?: string;
    html?: string | null;
    excerpt?: string | null;
    feature_image?: string | null;
    featured?: boolean;
    visibility?: string;
    created_at?: string | null;
    updated_at?: string | null;
    published_at?: string | null;
    custom_excerpt?: string | null;
    reading_time?: number | null;
    primary_author?: {
        name?: string;
        profile_image?: string | null;
    } | null;
    tags?: Array<{
        name?: string;
        slug?: string;
    }>;
}

export async function getPosts() {
    console.log('[Ghost] Checking configuration...', { isGhostConfigured });
    if (!isGhostConfigured) {
        console.log('[Ghost] API not configured, skipping fetch');
        return [];
    }
    console.log('[Ghost] Fetching all posts...');
    return await api.posts
        .browse({
            include: ['tags', 'authors'],
            limit: 'all'
        })
        .then(posts => {
            console.log(`[Ghost] Fetched ${posts.length} posts`);
            return posts;
        })
        .catch(err => {
            console.error('[Ghost] Error fetching posts:', err.message);
            return [];
        });
}

export async function getSinglePost(postSlug: string) {
    console.log(`[Ghost] Checking configuration for slug: ${postSlug}...`, { isGhostConfigured });
    if (!isGhostConfigured) {
        console.log('[Ghost] API not configured, skipping fetch');
        return null;
    }
    console.log(`[Ghost] Fetching post: ${postSlug}...`);
    return await api.posts
        .read({
            slug: postSlug
        }, {
            include: ['tags', 'authors']
        })
        .then(post => {
            console.log(`[Ghost] Post found: ${post.title}`);
            return post;
        })
        .catch(err => {
            console.error(`[Ghost] Error fetching post "${postSlug}":`, err.message);
            return null;
        });
}

export default api;
