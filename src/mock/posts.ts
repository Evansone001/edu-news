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
    title: "Digital Learning Revolution: How Technology is Transforming Education",
    description: "Exploring the impact of digital tools and online platforms on modern classroom learning and student engagement",
    slug: "digital-learning-revolution-education",
    mainImage: {
      url: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop&q=60",
      alt: "Digital learning and education technology"
    },
    author: {
      id: '1',
      title: 'Education Technology Specialist',
      name: "Sarah Mitchell",
      slug: 'sarah-mitchell',
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    publishedAt: "2026-01-15T10:00:00Z",
    categories: [
      { 
        id: '1',
        title: "Education Technology",
        slug: 'education-technology'
      },
      { 
        id: '2',
        title: "Digital Learning",
        slug: 'digital-learning'
      }
    ],
    _createdAt: "2026-01-15T10:00:00Z",
    _updatedAt: "2026-01-15T10:00:00Z",
    body: "The education landscape is undergoing a dramatic transformation as digital tools and online platforms become integral to classroom learning. From interactive whiteboards to AI-powered tutoring systems, technology is reshaping how students learn and teachers teach...",
    comments: {},
    excerpt: "Exploring the impact of digital tools and online platforms on modern classroom learning and student engagement",
    tags: ["education-technology", "digital-learning", "edtech", "online-learning"],
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
    title: "Sustainable Education: Green Initiatives in Kenyan Schools",
    description: "How schools across Kenya are implementing eco-friendly practices and environmental awareness programs",
    slug: "sustainable-education-green-initiatives",
    mainImage: {
      url: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&auto=format&fit=crop&q=60",
      alt: "Green initiatives and environmental education"
    },
    author: {
      id: '2',
      title: 'Environmental Education Specialist',
      name: "Michael Chen",
      slug: 'michael-chen',
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Environmental education advocate and curriculum developer",
      website: "https://greenedu.org",
      social: {
        twitter: "michael_greenedu",
        linkedin: "in/michael-chen-edu"
      },
      postCount: 15,
      joinedAt: "2025-02-15T00:00:00Z"
    },
    publishedAt: "2026-01-10T14:30:00Z",
    categories: [
      { 
        id: '3',
        title: "Environmental Education",
        slug: 'environmental-education',
        description: "Sustainability and green learning initiatives",
        postCount: 25,
        featured: true
      },
      { 
        id: '4',
        title: "School Programs",
        slug: 'school-programs',
        description: "Curriculum and extracurricular activities",
        postCount: 18,
        featured: true
      }
    ],
    _createdAt: "2026-01-10T14:30:00Z",
    _updatedAt: "2026-01-10T14:30:00Z",
    body: "Schools across Kenya are embracing sustainable practices, from solar-powered classrooms to organic gardens. These initiatives not only reduce environmental impact but also teach students valuable lessons about conservation and responsibility...",
    comments: {},
    excerpt: "How schools across Kenya are implementing eco-friendly practices and environmental awareness programs",
    tags: ["environmental-education", "sustainability", "green-schools", "kenya-education"],
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
    title: "AI in Education: Transforming How Students Learn",
    description: "Exploring how artificial intelligence is personalizing education and supporting teachers in the classroom",
    slug: "ai-in-education-transforming-learning",
    mainImage: {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60",
      alt: "AI and education technology"
    },
    author: {
      id: '1',
      title: 'EdTech Specialist',
      name: "Sarah Mitchell",
      slug: 'sarah-mitchell',
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Education technology expert and curriculum innovator",
      website: "https://mitchelledu.com",
      social: {
        twitter: "sarahmitchell_edu",
        github: "sarahmitchell"
      },
      postCount: 12,
      joinedAt: "2025-01-01T00:00:00Z"
    },
    publishedAt: "2026-01-05T09:15:00Z",
    categories: [
      { 
        id: '5',
        title: "AI in Education",
        slug: 'ai-in-education',
        description: "Artificial intelligence for learning",
        postCount: 30,
        featured: true
      },
      { 
        id: '6',
        title: "EdTech Trends",
        slug: 'edtech-trends',
        description: "Emerging technologies in education",
        postCount: 22,
        featured: true
      }
    ],
    _createdAt: "2026-01-05T09:15:00Z",
    _updatedAt: "2026-01-05T09:15:00Z",
    body: "Artificial intelligence is revolutionizing education by creating personalized learning experiences for every student. From adaptive learning platforms to AI tutors, technology is helping teachers identify learning gaps and customize instruction...",
    comments: {},
    excerpt: "Exploring how artificial intelligence is personalizing education and supporting teachers in the classroom",
    tags: ["artificial-intelligence", "education", "edtech", "personalized-learning"],
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
    title: "Remote Learning Best Practices: Lessons from the Pandemic",
    description: "How educators are applying lessons learned during remote learning to enhance hybrid and in-person education",
    slug: "remote-learning-best-practices-pandemic",
    mainImage: {
      url: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&auto=format&fit=crop&q=60",
      alt: "Remote learning and online education"
    },
    author: {
      id: '3',
      title: 'Education Policy Researcher',
      name: "Robert Thompson",
      slug: 'robert-thompson',
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "Education researcher and curriculum development expert",
      website: "https://thompsonedu.org",
      social: {
        twitter: "robert_edu",
        linkedin: "in/robert-thompson-edu"
      },
      postCount: 20,
      joinedAt: "2024-06-01T00:00:00Z"
    },
    publishedAt: "2026-01-02T16:45:00Z",
    categories: [
      { 
        id: '7',
        title: "Remote Learning",
        slug: 'remote-learning',
        description: "Online and hybrid education models",
        postCount: 35,
        featured: true
      },
      { 
        id: '8',
        title: "Teaching Methods",
        slug: 'teaching-methods',
        description: "Pedagogical approaches and strategies",
        postCount: 15,
        featured: false
      }
    ],
    _createdAt: "2026-01-02T16:45:00Z",
    _updatedAt: "2026-01-02T16:45:00Z",
    body: "The pandemic forced educators worldwide to adapt to remote learning. Now, those lessons are being applied to create more flexible, resilient education systems that combine the best of in-person and digital learning...",
    comments: {},
    excerpt: "How educators are applying lessons learned during remote learning to enhance hybrid and in-person education",
    tags: ["remote-learning", "hybrid-education", "teaching-strategies", "online-learning"],
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
    title: "International Education Exchange Programs: New Opportunities for Kenyan Students",
    description: "Exploring scholarship programs and partnerships opening doors for Kenyan students to study abroad",
    slug: "international-education-exchange-programs",
    mainImage: {
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=60",
      alt: "International education and student exchange"
    },
    author: {
      id: '4',
      title: 'International Education Advisor',
      name: "Elena Rodriguez",
      slug: 'elena-rodriguez',
      image: "https://randomuser.me/api/portraits/women/38.jpg",
      bio: "International education consultant and scholarship specialist",
      website: "https://rodriguezedu.com",
      social: {
        twitter: "elena_edu_abroad",
        linkedin: "in/elena-rodriguez-edu"
      },
      postCount: 18,
      joinedAt: "2024-09-15T00:00:00Z"
    },
    publishedAt: "2025-12-28T11:20:00Z",
    categories: [
      { 
        id: '9',
        title: "Study Abroad",
        slug: 'study-abroad',
        description: "International education opportunities",
        postCount: 28,
        featured: true
      },
      { 
        id: '10',
        title: "Scholarships",
        slug: 'scholarships',
        description: "Funding opportunities for students",
        postCount: 20,
        featured: true
      }
    ],
    _createdAt: "2025-12-28T11:20:00Z",
    _updatedAt: "2025-12-28T11:20:00Z",
    body: "New international partnerships and scholarship programs are creating unprecedented opportunities for Kenyan students to pursue education abroad. From full scholarships to exchange programs, the landscape of international education is more accessible than ever...",
    comments: {},
    excerpt: "Exploring scholarship programs and partnerships opening doors for Kenyan students to study abroad",
    tags: ["study-abroad", "scholarships", "international-education", "kenya-students"],
    views: 165,
    likes: 29,
    commentCount: 3,
    isFeatured: false,
    readTime: 9,
    wordCount: 1800,
    language: "en"
  }
];
