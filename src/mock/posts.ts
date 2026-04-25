export interface Author {
  title: any;
  id: string | number;
  name: string;
  slug: string;
  image?: string;
  bio?: string;
  last?: string;
  imageUrl?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
    instagram?: string;
  };
  website?: string;
  metaTitle?: string;
  metaDescription?: string;
  postCount?: number;
  joinedAt?: string;
}

export interface Category {
  id: string | number;
  title: string;
  slug: string;
  description?: string;
  image?: string;
  color?: string;
  metaTitle?: string;
  metaDescription?: string;
  postCount?: number;
  parentId?: string | null;
  order?: number;
  featured?: boolean;
}

export interface Post {
  id: number | string;
  _id: string;
  title: string;
  description: string;
  slug: string | {
    _type: string;
    current: string;
    [key: string]: any;
  };
  mainImage: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
  };
  author: Author;
  publishedAt: string;
  categories: Category[];
  _createdAt: string | number | Date;
  _updatedAt?: string;
  body: string;
  comments: any;
  excerpt?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  commentCount?: number;
  isFeatured?: boolean;
  readTime?: number;
  wordCount?: number;
  language?: string;
}

export const mockPosts: Post[] = [
  {
    id: 1,
    _id: '1',
    title: "Supreme Court Ruling on Digital Privacy Rights",
    description: "Landmark decision establishes new precedents for digital privacy and data protection in constitutional law",
    slug: "supreme-court-digital-privacy-rights",
    mainImage: {
      url: "https://randomuser.me/api/portraits/women/44.jpg",
      alt: "Supreme Court building and digital privacy concept"
    },
    author: {
      id: '1',
      title: 'Senior Legal Analyst',
      name: "Sarah Mitchell",
      slug: 'sarah-mitchell',
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    publishedAt: "2026-01-15T10:00:00Z",
    categories: [
      { 
        id: '1',
        title: "Constitutional Law",
        slug: 'constitutional-law'
      },
      { 
        id: '2',
        title: "Digital Rights",
        slug: 'digital-rights'
      }
    ],
    _createdAt: "2026-01-15T10:00:00Z",
    _updatedAt: "2026-01-15T10:00:00Z",
    body: "The Supreme Court has issued a groundbreaking ruling that reshapes the landscape of digital privacy rights under constitutional law. This decision establishes critical precedents for how law enforcement can access digital data...",
    comments: {},
    excerpt: "Landmark decision establishes new precedents for digital privacy and data protection in constitutional law",
    tags: ["supreme-court", "privacy", "constitutional-law", "digital-rights"],
    views: 450,
    likes: 85,
    commentCount: 12,
    isFeatured: true,
    readTime: 8,
    wordCount: 1600,
    language: "en"
  },
  {
    id: 2,
    _id: '2',
    title: "Corporate Liability in Environmental Law: Recent Developments",
    description: "Analysis of recent cases establishing enhanced corporate responsibility for environmental violations and climate impact",
    slug: "corporate-liability-environmental-law",
    mainImage: {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60",
      alt: "Environmental law and corporate responsibility"
    },
    author: {
      id: '2',
      title: 'Environmental Law Expert',
      name: "Michael Chen",
      slug: 'michael-chen',
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Environmental law attorney and climate policy specialist",
      website: "https://chenlawoffice.com",
      social: {
        twitter: "michaelchen_esq",
        linkedin: "in/michael-chen-esq"
      },
      postCount: 15,
      joinedAt: "2025-02-15T00:00:00Z"
    },
    publishedAt: "2026-01-10T14:30:00Z",
    categories: [
      { 
        id: '3',
        title: "Environmental Law",
        slug: 'environmental-law',
        description: "Environmental regulations and corporate responsibility",
        postCount: 25,
        featured: true
      },
      { 
        id: '4',
        title: "Corporate Law",
        slug: 'corporate-law',
        description: "Business law and corporate governance",
        postCount: 18,
        featured: true
      }
    ],
    _createdAt: "2026-01-10T14:30:00Z",
    _updatedAt: "2026-01-10T14:30:00Z",
    body: "Recent judicial decisions have significantly expanded corporate liability in environmental law cases. Courts are now holding companies accountable for climate impact and environmental degradation with unprecedented rigor...",
    comments: {},
    excerpt: "Analysis of recent cases establishing enhanced corporate responsibility for environmental violations",
    tags: ["environmental-law", "corporate-law", "climate-change", "sustainability"],
    views: 320,
    likes: 65,
    commentCount: 8,
    isFeatured: true,
    readTime: 12,
    wordCount: 2400,
    language: "en"
  },
  {
    id: 3,
    _id: '3',
    title: "Intellectual Property Rights in the Age of AI: Legal Framework Evolution",
    description: "Examining how intellectual property laws are adapting to challenges posed by artificial intelligence and machine learning",
    slug: "intellectual-property-ai-legal-framework",
    mainImage: {
      url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
      alt: "AI and intellectual property law concept"
    },
    author: {
      id: '1',
      title: 'IP Law Specialist',
      name: "Sarah Mitchell",
      slug: 'sarah-mitchell',
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Intellectual property attorney and technology law expert",
      website: "https://mitchellip.com",
      social: {
        twitter: "sarahmitchell_ip",
        github: "sarahmitchell"
      },
      postCount: 12,
      joinedAt: "2025-01-01T00:00:00Z"
    },
    publishedAt: "2026-01-05T09:15:00Z",
    categories: [
      { 
        id: '5',
        title: "Intellectual Property",
        slug: 'intellectual-property',
        description: "IP law and technology innovations",
        postCount: 30,
        featured: true
      },
      { 
        id: '6',
        title: "Technology Law",
        slug: 'technology-law',
        description: "Legal frameworks for emerging technologies",
        postCount: 22,
        featured: true
      }
    ],
    _createdAt: "2026-01-05T09:15:00Z",
    _updatedAt: "2026-01-05T09:15:00Z",
    body: "The rapid advancement of artificial intelligence presents unprecedented challenges to traditional intellectual property frameworks. Courts and legislatures worldwide are grappling with questions of AI-generated content ownership...",
    comments: {},
    excerpt: "Examining how IP laws are adapting to challenges posed by artificial intelligence and machine learning",
    tags: ["intellectual-property", "artificial-intelligence", "technology-law", "innovation"],
    views: 280,
    likes: 52,
    commentCount: 6,
    isFeatured: true,
    readTime: 10,
    wordCount: 2000,
    language: "en"
  },
  {
    id: 4,
    _id: '4',
    title: "Employment Law Update: Remote Work Regulations Post-Pandemic",
    description: "Comprehensive analysis of new employment regulations addressing remote work, digital workplace rights, and employer obligations",
    slug: "employment-law-remote-work-regulations",
    mainImage: {
      url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&auto=format&fit=crop&q=60",
      alt: "Remote work and employment law"
    },
    author: {
      id: '3',
      title: 'Labor Law Attorney',
      name: "Robert Thompson",
      slug: 'robert-thompson',
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "Employment law specialist and workers' rights advocate",
      website: "https://thompsonlaborlaw.com",
      social: {
        twitter: "robert_esq",
        linkedin: "in/robert-thompson-esq"
      },
      postCount: 20,
      joinedAt: "2024-06-01T00:00:00Z"
    },
    publishedAt: "2026-01-02T16:45:00Z",
    categories: [
      { 
        id: '7',
        title: "Employment Law",
        slug: 'employment-law',
        description: "Workplace regulations and employee rights",
        postCount: 35,
        featured: true
      },
      { 
        id: '8',
        title: "Labor Relations",
        slug: 'labor-relations',
        description: "Union law and collective bargaining",
        postCount: 15,
        featured: false
      }
    ],
    _createdAt: "2026-01-02T16:45:00Z",
    _updatedAt: "2026-01-02T16:45:00Z",
    body: "The post-pandemic workplace has fundamentally transformed employment law landscapes. New regulations address everything from home office stipends to digital surveillance concerns...",
    comments: {},
    excerpt: "Comprehensive analysis of new employment regulations addressing remote work and digital workplace rights",
    tags: ["employment-law", "remote-work", "labor-rights", "workplace-regulations"],
    views: 190,
    likes: 38,
    commentCount: 4,
    isFeatured: false,
    readTime: 7,
    wordCount: 1400,
    language: "en"
  },
  {
    id: 5,
    _id: '5',
    title: "International Trade Law: Navigating New Tariff Structures",
    description: "Expert analysis of recent changes in international trade agreements and their impact on global commerce",
    slug: "international-trade-law-tariff-structures",
    mainImage: {
      url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=60",
      alt: "International trade and commerce"
    },
    author: {
      id: '4',
      title: 'Trade Law Counsel',
      name: "Elena Rodriguez",
      slug: 'elena-rodriguez',
      image: "https://randomuser.me/api/portraits/women/38.jpg",
      bio: "International trade lawyer and policy advisor",
      website: "https://rodrigueztradecounsel.com",
      social: {
        twitter: "elena_trade_esq",
        linkedin: "in/elena-rodriguez-esq"
      },
      postCount: 18,
      joinedAt: "2024-09-15T00:00:00Z"
    },
    publishedAt: "2025-12-28T11:20:00Z",
    categories: [
      { 
        id: '9',
        title: "International Law",
        slug: 'international-law',
        description: "Cross-border legal frameworks and treaties",
        postCount: 28,
        featured: true
      },
      { 
        id: '10',
        title: "Trade Law",
        slug: 'trade-law',
        description: "International commerce and trade regulations",
        postCount: 20,
        featured: true
      }
    ],
    _createdAt: "2025-12-28T11:20:00Z",
    _updatedAt: "2025-12-28T11:20:00Z",
    body: "Recent developments in international trade law have created complex new tariff structures that businesses must navigate. This analysis examines the implications for global supply chains...",
    comments: {},
    excerpt: "Expert analysis of recent changes in international trade agreements and their impact on global commerce",
    tags: ["international-law", "trade-law", "tariffs", "global-commerce"],
    views: 165,
    likes: 29,
    commentCount: 3,
    isFeatured: false,
    readTime: 9,
    wordCount: 1800,
    language: "en"
  }
];
