
export type { Comment } from './typing';

export interface Author {
  title: any;
  
  // Core fields
  id: string | number;
  name: string;
  slug: string;
  
  // Media
  image?: string;
  
  // Metadata
  bio?: string;
  email?: string;
  role?: string;
  
  // Social
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  
  // Engagement
  website?: string;
  metaTitle?: string;
  metaDescription?: string;
  postCount?: number;
  joinedAt?: string | Date;
}

export interface Category {
  // Core fields
  id: string | number;      // Unique identifier
  title: string;            // Display name (e.g., "Technology")
  slug: string;             // URL-friendly name (e.g., "technology")
  description?: string;     // Short description of the category
  // Media
  image?: string;           // Optional image/icon URL
  // Metadata
  color?: string;           // Brand color for the category
  metaTitle?: string;       // For SEO
  metaDescription?: string; // For SEO
  // Engagement
  postCount?: number;       // Number of posts in this category
  parentId?: string | null; // For hierarchical categories
  order?: number;           // For manual ordering
  featured?: boolean;       // If this is a featured category
}

export interface Post {
  _id: string;
  _createdAt: string | number | Date;
  comments: any;
  body: string;
  // Core fields
  id: string | number;
  title: string;
  description: string;
  slug: string | {
    _type: string;
    current: string;
    [key: string]: any; // Allow for additional properties
  };
  
  // Content
  content?: string;
  excerpt?: string;
  
  // Media
  mainImage: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
  };
  gallery?: Array<{
    url: string;
    alt?: string;
    caption?: string;
    width?: number;
    height?: number;
  }>;
  videoUrl?: string;
  
  // Metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  
  // Authorship & Publishing
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  status?: 'draft' | 'published' | 'archived';
  
  // Categories & Tags
  categories: Category[];
  tags?: string[];
  
  // Engagement
  views?: number;
  likes?: number;
  commentCount?: number;
  isFeatured?: boolean;
  
  // Technical
  readTime?: number;
  wordCount?: number;
  language?: string;
  
  // Series & Related Content
  series?: {
    id: string | number;
    name: string;
    order: number;
  };
  relatedPosts?: Array<{
    id: string | number;
    title: string;
    slug: string;
  }>;
}

export interface NewsletterResponse {
  // Core response
  success: boolean;
  message: string;
  
  // Error handling
  error?: {
    code?: string | number;  // Specific error code (e.g., 'ALREADY_SUBSCRIBED')
    message: string;         // User-friendly error message
    details?: any;           // Additional error details for debugging
  };
  
  // Success response
  data?: {
    id: string | number;     // Subscription ID
    email: string;           // Subscriber's email
    name?: string;           // Subscriber's name if provided
    isConfirmed?: boolean;   // Whether email is confirmed
    subscribedAt?: string;   // ISO date string
    preferences?: {          // Subscription preferences
      [key: string]: boolean;
    };
  };
  
  // Metadata
  timestamp?: string;        // When the response was generated
  version?: string;          // API version
}

export interface ProfessionalUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'attorney' | 'judge' | 'legal_professional' | 'student' | 'subscriber' | 'corporate';
  plan: 'free' | 'pro' | 'enterprise' | 'corporate';
  region: 'na' | 'eu' | 'asia' | 'africa' | 'sa' | 'oceania';
  language: string;
  firm?: string;
  barNumber?: string;
  jurisdiction?: string[];
  specialties?: string[];
  lastActive: Date;
  notifications: number;
}
